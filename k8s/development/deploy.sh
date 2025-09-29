#!/usr/bin/env bash

set -xe;

CHART_REPO=https://stakater.github.io/stakater-charts
CHART_VERSION=6.5.0
CHART_NAME=application

helm upgrade -i "ladesa-ro-api" \
  application \
  --repo https://stakater.github.io/stakater-charts \
  --version 6.5.0 \
  --namespace "ladesa-ro-development" \
  -f ./deployments/management-service.values.yaml \
;

kubectl rollout restart \
  deployment.apps/ladesa-ro-api \
  --namespace ladesa-ro-development \
;
