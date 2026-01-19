generated:
	rm -rf packages/generated;
	
	bun x @openapitools/openapi-generator-cli generate \
		-i https://dev.ladesa.com.br/api/v1/docs/openapi.v3.json \
		-g dart-dio \
		-c /local/config.yml \
		-o /local/packages/generated
