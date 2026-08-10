#!/usr/bin/env bash

set -xe;

K8S_NAMESPACE=ladesa-ro-development
K8S_DEPLOYMENT=ladesa-ro-api
K8S_DEPLOYMENT_WAHA=ladesa-ro-waha

# Criar PersistentVolumeClaim do WAHA
kubectl apply -f ./pvc-waha-sessions.yml --namespace=${K8S_NAMESPACE};

# Deploy do WAHA (WhatsApp HTTP API)
helm upgrade -i ${K8S_DEPLOYMENT_WAHA} \
  --repo https://stakater.github.io/stakater-charts \
  application \
  --version 6.0.2 \
  --namespace=${K8S_NAMESPACE} \
  -f ./values-waha.yml \
;

kubectl rollout status \
  deployment.apps/${K8S_DEPLOYMENT_WAHA} \
  --namespace ${K8S_NAMESPACE} \
  --timeout=720s;

# Deploy da API
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
