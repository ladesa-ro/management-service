#!/usr/bin/env bash
# =============================================================================
# detect-drift.sh
#
# Parseia os blocos <!-- Source of Trust --> do README.md, verifica se algum
# arquivo listado em source_patterns mudou desde o commit_hash registrado,
# e gera um relatório JSON de drift.
#
# Saída: drift-report.json com as seções que precisam de atualização.
# Exit code: 0 se há drift, 1 se está tudo em dia.
# =============================================================================

set -euo pipefail

README="${1:-README.md}"
REPORT="drift-report.json"

if [[ ! -f "$README" ]]; then
  echo "❌ README não encontrado: $README"
  exit 2
fi

# ---------------------------------------------------------------------------
# 1. Extrair blocos Source of Trust do README
# ---------------------------------------------------------------------------
# Cada bloco tem: commit_hash, source_patterns (lista), confidence_scope

extract_source_of_trust_blocks() {
  awk '
    /<!-- *Source of Trust/     { in_block=1; block=""; next }
    /-->/                       { if (in_block) { print block; in_block=0 }; next }
    in_block                    { block = block $0 "\n" }
  ' "$README"
}

# ---------------------------------------------------------------------------
# 2. Para cada bloco, verificar se os source_patterns mudaram
# ---------------------------------------------------------------------------

declare -a DRIFTED_SECTIONS=()

check_block() {
  local block="$1"
  local block_index="$2"

  # Extrair commit_hash
  local commit_hash
  commit_hash=$(echo "$block" | grep -oP 'commit_hash:\s*\K\S+' || echo "")

  if [[ -z "$commit_hash" ]]; then
    echo "⚠️  Bloco $block_index: sem commit_hash, pulando"
    return
  fi

  # Verificar se o commit existe no repo
  if ! git cat-file -e "$commit_hash" 2>/dev/null; then
    echo "⚠️  Bloco $block_index: commit $commit_hash não encontrado no histórico"
    # Tratar como drift — o commit pode ter sido squashado
    commit_hash="HEAD~1"
  fi

  # Extrair source_patterns (linhas com "  - " dentro do bloco)
  local patterns
  patterns=$(echo "$block" | grep -oP '^\s*-\s*\K\S+' || echo "")

  if [[ -z "$patterns" ]]; then
    echo "⚠️  Bloco $block_index: sem source_patterns, pulando"
    return
  fi

  # Extrair confidence_scope para o relatório
  local scope
  scope=$(echo "$block" | grep -oP 'confidence_scope:\s*\K.*' || echo "desconhecido")

  # Verificar se algum pattern tem diff desde o commit_hash
  local has_changes=false
  local changed_files=""

  while IFS= read -r pattern; do
    [[ -z "$pattern" ]] && continue

    # git diff com glob pattern
    local diff_output
    diff_output=$(git diff --name-only "$commit_hash"..HEAD -- "$pattern" 2>/dev/null || echo "")

    if [[ -n "$diff_output" ]]; then
      has_changes=true
      changed_files="${changed_files}${diff_output}"$'\n'
    fi
  done <<< "$patterns"

  if $has_changes; then
    # Encontrar a seção do README mais próxima acima do bloco Source of Trust
    local section_title
    section_title=$(find_section_for_block "$block_index")

    echo "🔴 Drift detectado — seção: $section_title"
    echo "   Escopo: $scope"
    echo "   Arquivos alterados:"
    echo "$changed_files" | sed 's/^/     /'

    # Montar entrada JSON para o relatório
    local changed_json
    changed_json=$(echo "$changed_files" | grep -v '^$' | jq -R . | jq -s .)

    DRIFTED_SECTIONS+=("$(jq -n \
      --arg section "$section_title" \
      --arg scope "$scope" \
      --arg old_commit "$commit_hash" \
      --arg current_commit "$(git rev-parse HEAD)" \
      --argjson changed_files "$changed_json" \
      '{
        section: $section,
        confidence_scope: $scope,
        old_commit: $old_commit,
        current_commit: $current_commit,
        changed_files: $changed_files
      }'
    )")
  else
    echo "✅ Bloco $block_index: em dia ($scope)"
  fi
}

# Encontrar o heading markdown mais próximo antes de um bloco Source of Trust
find_section_for_block() {
  local block_index="$1"

  # Encontrar a linha do N-ésimo bloco Source of Trust
  local block_line
  block_line=$(grep -n '<!-- *Source of Trust' "$README" | sed -n "${block_index}p" | cut -d: -f1)

  if [[ -z "$block_line" ]]; then
    echo "seção desconhecida"
    return
  fi

  # Procurar o heading ## ou ### mais próximo acima dessa linha
  head -n "$block_line" "$README" | grep -n '^##' | tail -1 | sed 's/^[0-9]*:\s*#*\s*//'
}

# ---------------------------------------------------------------------------
# 3. Verificações determinísticas extras (sem depender de Source of Trust)
# ---------------------------------------------------------------------------

check_deterministic() {
  local extra_drifts=()

  # Contagem de migrações
  local migration_count
  migration_count=$(find src/infrastructure.database/migrations -name '*.ts' 2>/dev/null | wc -l || echo "0")
  local readme_count
  readme_count=$(grep -oP '\*\*(\d+) migrações\*\*|possui \*\*(\d+) migrações\*\*|\*\*(\d+)\*\* migrações' "$README" | grep -oP '\d+' | head -1 || echo "0")

  if [[ "$migration_count" -ne "$readme_count" && "$readme_count" -ne "0" ]]; then
    echo "🔴 Drift: contagem de migrações (README: $readme_count, real: $migration_count)"
    extra_drifts+=("$(jq -n \
      --arg type "migration_count" \
      --arg readme_value "$readme_count" \
      --arg actual_value "$migration_count" \
      '{type: $type, readme_value: $readme_value, actual_value: $actual_value}'
    )")
  fi

  # Contagem de módulos
  local module_count
  module_count=$(find src/modules -mindepth 2 -maxdepth 2 -type d -name 'domain' 2>/dev/null | wc -l || echo "0")
  local readme_module_count
  readme_module_count=$(grep -oP '\((\d+) módulos' "$README" | grep -oP '\d+' | head -1 || echo "0")

  if [[ "$module_count" -ne "$readme_module_count" && "$readme_module_count" -ne "0" ]]; then
    echo "🔴 Drift: contagem de módulos (README: $readme_module_count, real: $module_count)"
    extra_drifts+=("$(jq -n \
      --arg type "module_count" \
      --arg readme_value "$readme_module_count" \
      --arg actual_value "$module_count" \
      '{type: $type, readme_value: $readme_value, actual_value: $actual_value}'
    )")
  fi

  # Versões de dependências principais (package.json)
  if [[ -f "src/package.json" ]]; then
    local deps_to_check=("@nestjs/core" "typeorm" "zod" "@apollo/server" "vitest")
    for dep in "${deps_to_check[@]}"; do
      local actual_ver
      actual_ver=$(jq -r --arg d "$dep" '(.dependencies[$d] // .devDependencies[$d]) // empty' src/package.json 2>/dev/null | sed 's/[\^~]//')

      if [[ -n "$actual_ver" ]]; then
        # Verificar se essa versão aparece no README
        local clean_ver="${actual_ver%%.*}"  # major version
        # Não checar se é mencionada — só registrar para o relatório
      fi
    done
  fi

  # Exportar extra drifts
  if [[ ${#extra_drifts[@]} -gt 0 ]]; then
    printf '%s\n' "${extra_drifts[@]}"
  fi
}

# ---------------------------------------------------------------------------
# 4. Execução principal
# ---------------------------------------------------------------------------

echo "📋 Verificando drift do README..."
echo "   Arquivo: $README"
echo "   HEAD: $(git rev-parse --short HEAD)"
echo ""

# Parsear e verificar cada bloco Source of Trust
block_index=0
while IFS= read -r block; do
  [[ -z "$block" ]] && continue
  ((block_index++))
  check_block "$block" "$block_index"
done < <(extract_source_of_trust_blocks)

echo ""
echo "--- Verificações determinísticas ---"
EXTRA_DRIFTS=$(check_deterministic)

# ---------------------------------------------------------------------------
# 5. Gerar relatório JSON
# ---------------------------------------------------------------------------

if [[ ${#DRIFTED_SECTIONS[@]} -eq 0 && -z "$EXTRA_DRIFTS" ]]; then
  echo ""
  echo "✅ README está em dia com o código-fonte."
  jq -n '{drift: false, sections: [], deterministic: []}' > "$REPORT"
  exit 1  # Exit 1 = sem drift (para uso em CI: drift = 0 = "sucesso, há trabalho a fazer")
fi

# Montar JSON final
sections_json="["
for i in "${!DRIFTED_SECTIONS[@]}"; do
  [[ $i -gt 0 ]] && sections_json+=","
  sections_json+="${DRIFTED_SECTIONS[$i]}"
done
sections_json+="]"

extra_json="[]"
if [[ -n "$EXTRA_DRIFTS" ]]; then
  extra_json=$(echo "$EXTRA_DRIFTS" | jq -s '.')
fi

jq -n \
  --argjson sections "$sections_json" \
  --argjson deterministic "$extra_json" \
  --arg checked_at "$(date -u +%Y-%m-%dT%H:%M:%SZ)" \
  --arg head_commit "$(git rev-parse HEAD)" \
  '{
    drift: true,
    checked_at: $checked_at,
    head_commit: $head_commit,
    sections: $sections,
    deterministic: $deterministic
  }' > "$REPORT"

echo ""
echo "📝 Relatório salvo em $REPORT"
echo "   Seções com drift: ${#DRIFTED_SECTIONS[@]}"
cat "$REPORT" | jq .
exit 0
