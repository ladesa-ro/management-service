#!/usr/bin/env bash

set -xe;

echo "${HELM_RELEASE_VALUES}" | helm upgrade -i "${HELM_RELEASE_NAME}" \
  application \
  --repo https://stakater.github.io/stakater-charts \
  --version 6.5.0 \
  --namespace "${K8S_NAMESPACE}" \
  ${HELM_RELEASE_EXTRA_OPTIONS} \
  -f - \
;

kubectl rollout restart \
  deployment.apps/${K8S_DEPLOYMENT} \
  --namespace ${K8S_NAMESPACE} \
;
