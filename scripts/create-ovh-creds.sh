#!/bin/bash

set -euo pipefail

set -x

if [ -z "${OVH_APPLICATION_KEY}" ]; then
  echo "OVH_APPLICATION_KEY is not set"
  exit 1
fi

curl -XPOST -H "X-Ovh-Application: ${OVH_APPLICATION_KEY}" -H "Content-type: application/json" https://eu.api.ovh.com/1.0/auth/credential -d '{
  "accessRules": [
    {
      "method": "PUT",
      "path": "/cloud/project/*/kube/*/nodepool/*"
    }
  ],
  "redirection": "https://hoverkraft.cloud"
}' | jq
