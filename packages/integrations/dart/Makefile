generated:
	rm -rf packages/generated;
	
	docker run --rm \
		-u 1000 \
		-v $${PWD}:/local openapitools/openapi-generator-cli generate \
		-i https://dev.ladesa.com.br/api/doc-api-json \
		-g dart-dio \
		-c /local/config.yml \
		-o /local/packages/generated