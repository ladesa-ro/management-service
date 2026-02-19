#!/usr/bin/env bash

set -xe;

K8S_NAMESPACE=ladesa-ro-development
K8S_DEPLOYMENT=ladesa-ro-api

helm upgrade -i ${K8S_DEPLOYMENT} \
  --repo https://stakater.github.io/stakater-charts \
  application \
  --version 6.0.2 \
  --namespace=${K8S_NAMESPACE} \
  -f ./values.yml \
;

kubectl \
  rollout restart \
  --namespace ${K8S_NAMESPACE} \
  deployment.apps/${K8S_DEPLOYMENT};

kubectl rollout status \
  deployment.apps/${K8S_DEPLOYMENT} \
  --namespace ${K8S_NAMESPACE} \
  --timeout=720s;
