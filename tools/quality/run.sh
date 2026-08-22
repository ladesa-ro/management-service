#!/usr/bin/env bash
set -euo pipefail

script_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
repo_root="$(cd "$script_dir/../.." && pwd)"
containerfile="$script_dir/Containerfile"

hash="$(sha256sum "$containerfile" | cut -d' ' -f1 | cut -c1-12)"
image="management-service-quality-tools:$hash"

if ! docker image inspect "$image" >/dev/null 2>&1; then
  docker build -t "$image" -f "$containerfile" "$script_dir" >&2
fi

exec docker run --rm -v "$repo_root:/repo" -w /repo "$image" "$@"
