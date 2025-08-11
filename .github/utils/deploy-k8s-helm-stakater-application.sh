#!/usr/bin/env bash

set -xe;

CHART_REPO=https://stakater.github.io/stakater-charts
CHART_VERSION=6.5.0
CHART_NAME=application

echo "${HELM_RELEASE_VALUES}" | helm upgrade -i "${HELM_RELEASE_NAME}" \
  ${CHART_NAME} \
  --repo ${CHART_REPO} \
  --version ${CHART_VERSION} \
  --namespace "${K8S_NAMESPACE}" \
  ${HELM_RELEASE_EXTRA_OPTIONS} \
  -f - \
;

kubectl rollout restart \
  deployment.apps/${K8S_DEPLOYMENT} \
  --namespace ${K8S_NAMESPACE} \
;
