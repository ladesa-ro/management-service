#!/usr/bin/env bash
set -euo pipefail

# Apply Kubernetes manifests
kubectl apply -f ./deployments/api.yaml
kubectl apply -f ./ingress/api.yaml
kubectl apply -f ./services/api.yaml

# Restart deployment
kubectl rollout restart \
  deployment.apps/api \
  --namespace ladesa

# Wait for rollout to complete
kubectl rollout status \
  deployment.apps/api \
  --namespace ladesa \
  --timeout=300s
