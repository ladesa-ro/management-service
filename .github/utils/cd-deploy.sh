#!/usr/bin/env bash

set -xe;

echo "${HELM_RELEASE_VALUES}" | helm upgrade -i ${HELM_RELEASE_NAME} \
  https://stakater.github.io/stakater-charts/application \
  --namespace="${K8S_NAMESPACE}" \
  ${HELM_RELEASE_EXTRA_OPTIONS} \
  -f - \
;

kubectl rollout restart \
  deployment.apps/${K8S_DEPLOYMENT} \
  --namespace ${K8S_NAMESPACE} \
;
