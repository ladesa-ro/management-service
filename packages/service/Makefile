MAKEFLAGS += --silent

all:
	@make -C .. $@
%:
	@make -C .. $@

INSIDE_PATH?=./api-service

shell:
	@make -C .. INSIDE_PATH=$(INSIDE_PATH) $@

shell-root::
	@make -C .. INSIDE_PATH=$(INSIDE_PATH) $@