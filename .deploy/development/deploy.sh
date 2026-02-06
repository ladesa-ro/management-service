#!/usr/bin/env bash
set -euo pipefail

# Apply Kubernetes manifests
kubectl apply -f ./deployments/api.yaml
kubectl apply -f ./ingress/api.yaml
kubectl apply -f ./services/api.yaml

# Restart deployment
kubectl rollout restart \
  deployment.apps/ladesa-ro-api \
  --namespace ladesa-ro-development \
;

# Wait for rollout to complete
kubectl rollout status \
  deployment.apps/ladesa-ro-api \
  --namespace ladesa-ro-development \
  --timeout=300s
