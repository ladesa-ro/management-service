#!/usr/bin/env bash

kubectl apply -f ./secrets/api.yaml;
kubectl apply -f ./deployments/api.yaml;
kubectl apply -f ./ingress/api.yaml;
kubectl apply -f ./services/api.yaml;

kubectl rollout restart \
  deployment.apps/ladesa-ro-api \
  --namespace ladesa-ro-development \
;
