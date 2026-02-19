```mermaid
erDiagram
    ambiente {
        integer capacidade 
        text codigo "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        text descricao 
        uuid id PK "{NOT_NULL}"
        uuid id_bloco_fk FK "{NOT_NULL}"
        uuid id_imagem_capa_fk FK 
        text nome "{NOT_NULL}"
        text tipo 
    }

    app_migration_db {
        integer id PK "{NOT_NULL}"
        character_varying name "{NOT_NULL}"
        bigint timestamp "{NOT_NULL}"
    }

    arquivo {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        text mime_type 
        text name 
        integer size_bytes 
        text storage_type 
    }

    aula {
        date data 
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_ambiente_fk FK 
        uuid id_diario_fk FK "{NOT_NULL}"
        uuid id_intervalo_de_tempo_fk FK 
        text modalidade 
    }

    base_cidade {
        integer id PK "{NOT_NULL}"
        integer id_estado_fk FK 
        text nome "{NOT_NULL}"
    }

    base_estado {
        integer id PK "{NOT_NULL}"
        text nome "{NOT_NULL}"
        text sigla "{NOT_NULL}"
    }

    bloco {
        text codigo "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_campus_fk FK "{NOT_NULL}"
        uuid id_imagem_capa_fk FK 
        text nome "{NOT_NULL}"
    }

    calendario_letivo {
        integer ano_letivo "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_campus_fk FK "{NOT_NULL}"
        uuid id_oferta_formacao_fk FK "{NOT_NULL}"
        text nome "{NOT_NULL}"
    }

    campus {
        text apelido "{NOT_NULL}"
        text cnpj "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_endereco_fk FK "{NOT_NULL}"
        text nome_fantasia "{NOT_NULL}"
        text razao_social "{NOT_NULL}"
    }

    curso {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_campus_fk FK "{NOT_NULL}"
        uuid id_imagem_capa_fk FK 
        uuid id_oferta_formacao_fk FK "{NOT_NULL}"
        text nome "{NOT_NULL}"
        text nome_abreviado "{NOT_NULL}"
    }

    dia_calendario {
        date data "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        boolean dia_letivo "{NOT_NULL}"
        boolean feriado "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_calendario_letivo_fk FK "{NOT_NULL}"
    }

    diario {
        boolean ativo "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_ambiente_padrao_fk FK 
        uuid id_calendario_letivo_fk FK "{NOT_NULL}"
        uuid id_disciplina_fk FK "{NOT_NULL}"
        uuid id_imagem_capa_fk FK 
        uuid id_turma_fk FK "{NOT_NULL}"
    }

    diario_preferencia_agrupamento {
        integer aulas_seguidas "{NOT_NULL}"
        timestamp_with_time_zone data_fim 
        timestamp_with_time_zone data_inicio "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        integer dia_semana_iso "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_diario_fk FK "{NOT_NULL}"
        uuid id_intervalo_de_tempo_fk FK 
    }

    diario_professor {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_diario_fk FK "{NOT_NULL}"
        uuid id_perfil_fk FK "{NOT_NULL}"
        boolean situacao "{NOT_NULL}"
    }

    disciplina {
        integer carga_horaria "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_imagem_capa_fk FK 
        text nome "{NOT_NULL}"
        text nome_abreviado "{NOT_NULL}"
    }

    disponibilidade {
        date data_fim 
        date data_inicio "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
    }

    disponibilidade_dia {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_disponibilidade_fk FK "{NOT_NULL}"
        uuid id_intervalo_de_tempo_fk FK "{NOT_NULL}"
        integer rrule "{NOT_NULL}"
    }

    empresa {
        character_varying cnpj "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        text email "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_endereco_fk FK "{NOT_NULL}"
        text nome_fantasia "{NOT_NULL}"
        text razao_social "{NOT_NULL}"
        character_varying telefone "{NOT_NULL}"
    }

    endereco {
        text bairro "{NOT_NULL}"
        text cep "{NOT_NULL}"
        text complemento 
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        integer id_cidade_fk FK "{NOT_NULL}"
        text logradouro "{NOT_NULL}"
        integer numero "{NOT_NULL}"
        text ponto_referencia 
    }

    estagiario {
        date data_nascimento "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_curso_fk FK "{NOT_NULL}"
        uuid id_perfil_fk FK "{NOT_NULL}"
        uuid id_turma_fk FK "{NOT_NULL}"
        character_varying telefone "{NOT_NULL}"
    }

    estagio {
        integer carga_horaria "{NOT_NULL}"
        date data_fim 
        date data_inicio 
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_empresa_fk FK "{NOT_NULL}"
        uuid id_estagiario_fk FK 
        estagio_status_enum status "{NOT_NULL}"
    }

    etapa {
        text cor "{NOT_NULL}"
        timestamp_with_time_zone data_inicio "{NOT_NULL}"
        timestamp_with_time_zone data_termino "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_calendario_letivo_fk FK "{NOT_NULL}"
        integer numero "{NOT_NULL}"
    }

    evento {
        text cor 
        timestamp_with_time_zone data_fim 
        timestamp_with_time_zone data_inicio 
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_ambiente_fk FK 
        uuid id_calendario_letivo_fk FK "{NOT_NULL}"
        text nome "{NOT_NULL}"
        timestamp_with_time_zone rrule "{NOT_NULL}"
    }

    grade_horario_oferta_formacao {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_campus_fk FK "{NOT_NULL}"
        uuid id_oferta_formacao_fk FK "{NOT_NULL}"
    }

    grade_horario_oferta_formacao_intervalo_de_tempo {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_grade_horario_oferta_formacao_fk FK "{NOT_NULL}"
        uuid id_intervalo_de_tempo_fk FK "{NOT_NULL}"
    }

    horario_estagio {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        integer dia_semana "{NOT_NULL}"
        time_without_time_zone hora_fim "{NOT_NULL}"
        time_without_time_zone hora_inicio "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_estagio_fk FK "{NOT_NULL}"
    }

    horario_gerado {
        timestamp_with_time_zone data_geracao "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_calendario_letivo_fk FK "{NOT_NULL}"
        text status 
        text tipo 
        timestamp_with_time_zone vigencia_fim 
        timestamp_with_time_zone vigencia_inicio 
    }

    horario_gerado_aula {
        date data "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_diario_professor_fk FK 
        uuid id_horario_gerado_fk FK 
        uuid id_intervalo_de_tempo_fk FK "{NOT_NULL}"
    }

    imagem {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        text descricao 
        uuid id PK "{NOT_NULL}"
    }

    imagem_arquivo {
        integer altura "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        text formato "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_arquivo_fk FK "{NOT_NULL}"
        uuid id_imagem_fk FK "{NOT_NULL}"
        integer largura "{NOT_NULL}"
        text mime_type "{NOT_NULL}"
    }

    indisponibilidade_professor {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_perfil_fk FK "{NOT_NULL}"
        timestamp_with_time_zone indisponibilidade_inicio "{NOT_NULL}"
        timestamp_with_time_zone indisponibilidade_termino "{NOT_NULL}"
        character_varying motivo "{NOT_NULL}"
    }

    intervalo_de_tempo {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        time_without_time_zone perido_fim "{NOT_NULL}"
        time_without_time_zone perido_inicio "{NOT_NULL}"
    }

    modalidade {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        text nome "{NOT_NULL}"
        text slug "{NOT_NULL}"
    }

    nivel_formacao {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        text slug "{NOT_NULL}"
    }

    oferta_formacao {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_modalidade_fk FK "{NOT_NULL}"
        text nome "{NOT_NULL}"
        text slug "{NOT_NULL}"
    }

    oferta_formacao_nivel_formacao {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_nivel_formacao_fk FK "{NOT_NULL}"
        uuid id_oferta_formacao_fk FK "{NOT_NULL}"
    }

    perfil {
        boolean ativo "{NOT_NULL}"
        text cargo "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_campus_fk FK "{NOT_NULL}"
        uuid id_usuario_fk FK "{NOT_NULL}"
    }

    reserva {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_ambiente_fk FK "{NOT_NULL}"
        uuid id_usuario_fk FK "{NOT_NULL}"
        text motivo 
        text rrule "{NOT_NULL}"
        text situacao "{NOT_NULL}"
        text tipo 
    }

    responsavel_empresa {
        text cargo "{NOT_NULL}"
        character_varying cpf "{NOT_NULL}"
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        text email "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_empresa_fk FK "{NOT_NULL}"
        character_varying nome_responsavel "{NOT_NULL}"
        character_varying telefone "{NOT_NULL}"
    }

    turma {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_ambiente_padrao_aula_fk FK 
        uuid id_curso_fk FK "{NOT_NULL}"
        uuid id_imagem_capa_fk FK 
        text periodo "{NOT_NULL}"
    }

    turma_disponibilidade {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        uuid id PK "{NOT_NULL}"
        uuid id_disponibilidade_fk FK "{NOT_NULL}"
        uuid id_turma_fk FK "{NOT_NULL}"
    }

    usuario {
        timestamp_with_time_zone date_created "{NOT_NULL}"
        timestamp_with_time_zone date_deleted 
        timestamp_with_time_zone date_updated "{NOT_NULL}"
        text email 
        uuid id PK "{NOT_NULL}"
        uuid id_imagem_capa_fk FK 
        uuid id_imagem_perfil_fk FK 
        boolean is_super_user "{NOT_NULL}"
        text matricula_siape 
        text nome 
    }

    ambiente }o--|| bloco : "id_bloco_fk"
    ambiente }o--|| imagem : "id_imagem_capa_fk"
    aula }o--|| ambiente : "id_ambiente_fk"
    diario }o--|| ambiente : "id_ambiente_padrao_fk"
    evento }o--|| ambiente : "id_ambiente_fk"
    reserva }o--|| ambiente : "id_ambiente_fk"
    turma }o--|| ambiente : "id_ambiente_padrao_aula_fk"
    imagem_arquivo }o--|| arquivo : "id_arquivo_fk"
    aula }o--|| diario : "id_diario_fk"
    aula }o--|| intervalo_de_tempo : "id_intervalo_de_tempo_fk"
    base_cidade }o--|| base_estado : "id_estado_fk"
    endereco }o--|| base_cidade : "id_cidade_fk"
    bloco }o--|| campus : "id_campus_fk"
    bloco }o--|| imagem : "id_imagem_capa_fk"
    calendario_letivo }o--|| campus : "id_campus_fk"
    calendario_letivo }o--|| oferta_formacao : "id_oferta_formacao_fk"
    dia_calendario }o--|| calendario_letivo : "id_calendario_letivo_fk"
    diario }o--|| calendario_letivo : "id_calendario_letivo_fk"
    etapa }o--|| calendario_letivo : "id_calendario_letivo_fk"
    evento }o--|| calendario_letivo : "id_calendario_letivo_fk"
    horario_gerado }o--|| calendario_letivo : "id_calendario_letivo_fk"
    campus }o--|| endereco : "id_endereco_fk"
    curso }o--|| campus : "id_campus_fk"
    grade_horario_oferta_formacao }o--|| campus : "id_campus_fk"
    perfil }o--|| campus : "id_campus_fk"
    curso }o--|| imagem : "id_imagem_capa_fk"
    curso }o--|| oferta_formacao : "id_oferta_formacao_fk"
    estagiario }o--|| curso : "id_curso_fk"
    turma }o--|| curso : "id_curso_fk"
    diario }o--|| disciplina : "id_disciplina_fk"
    diario }o--|| imagem : "id_imagem_capa_fk"
    diario }o--|| turma : "id_turma_fk"
    diario_preferencia_agrupamento }o--|| diario : "id_diario_fk"
    diario_professor }o--|| diario : "id_diario_fk"
    diario_preferencia_agrupamento }o--|| intervalo_de_tempo : "id_intervalo_de_tempo_fk"
    diario_professor }o--|| perfil : "id_perfil_fk"
    horario_gerado_aula }o--|| diario_professor : "id_diario_professor_fk"
    disciplina }o--|| imagem : "id_imagem_capa_fk"
    disponibilidade_dia }o--|| disponibilidade : "id_disponibilidade_fk"
    turma_disponibilidade }o--|| disponibilidade : "id_disponibilidade_fk"
    disponibilidade_dia }o--|| intervalo_de_tempo : "id_intervalo_de_tempo_fk"
    empresa }o--|| endereco : "id_endereco_fk"
    estagio }o--|| empresa : "id_empresa_fk"
    responsavel_empresa }o--|| empresa : "id_empresa_fk"
    estagiario }o--|| perfil : "id_perfil_fk"
    estagiario }o--|| turma : "id_turma_fk"
    estagio }o--|| estagiario : "id_estagiario_fk"
    horario_estagio }o--|| estagio : "id_estagio_fk"
    grade_horario_oferta_formacao }o--|| oferta_formacao : "id_oferta_formacao_fk"
    grade_horario_oferta_formacao_intervalo_de_tempo }o--|| grade_horario_oferta_formacao : "id_grade_horario_oferta_formacao_fk"
    grade_horario_oferta_formacao_intervalo_de_tempo }o--|| intervalo_de_tempo : "id_intervalo_de_tempo_fk"
    horario_gerado_aula }o--|| horario_gerado : "id_horario_gerado_fk"
    horario_gerado_aula }o--|| intervalo_de_tempo : "id_intervalo_de_tempo_fk"
    imagem_arquivo }o--|| imagem : "id_imagem_fk"
    turma }o--|| imagem : "id_imagem_capa_fk"
    usuario }o--|| imagem : "id_imagem_capa_fk"
    usuario }o--|| imagem : "id_imagem_perfil_fk"
    indisponibilidade_professor }o--|| perfil : "id_perfil_fk"
    oferta_formacao }o--|| modalidade : "id_modalidade_fk"
    oferta_formacao_nivel_formacao }o--|| nivel_formacao : "id_nivel_formacao_fk"
    oferta_formacao_nivel_formacao }o--|| oferta_formacao : "id_oferta_formacao_fk"
    perfil }o--|| usuario : "id_usuario_fk"
    reserva }o--|| usuario : "id_usuario_fk"
    turma_disponibilidade }o--|| turma : "id_turma_fk"
```