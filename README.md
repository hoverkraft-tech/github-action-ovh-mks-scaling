<!-- header:start -->

# ![Icon](data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0IiBmaWxsPSJub25lIiBzdHJva2U9ImN1cnJlbnRDb2xvciIgc3Ryb2tlLXdpZHRoPSIyIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiIGNsYXNzPSJmZWF0aGVyIGZlYXRoZXItYWxpZ24tbGVmdCIgY29sb3I9ImJsdWUiPjxsaW5lIHgxPSIxNyIgeTE9IjEwIiB4Mj0iMyIgeTI9IjEwIj48L2xpbmU+PGxpbmUgeDE9IjIxIiB5MT0iNiIgeDI9IjMiIHkyPSI2Ij48L2xpbmU+PGxpbmUgeDE9IjIxIiB5MT0iMTQiIHgyPSIzIiB5Mj0iMTQiPjwvbGluZT48bGluZSB4MT0iMTciIHkxPSIxOCIgeDI9IjMiIHkyPSIxOCI+PC9saW5lPjwvc3ZnPg==) GitHub Action: OVH MKS Scaling

<div align="center">
  <img src=".github/logo.svg" width="60px" align="center" alt="OVH MKS Scaling" />
</div>

---

<!-- header:end -->
<!-- badges:start -->

[![Marketplace](https://img.shields.io/badge/Marketplace-ovh--mks--scaling-blue?logo=github-actions)](https://github.com/marketplace/actions/ovh-mks-scaling)
[![Release](https://img.shields.io/github/v/release/hoverkraft-tech/github-action-ovh-mks-scaling)](https://github.com/hoverkraft-tech/github-action-ovh-mks-scaling/releases)
[![License](https://img.shields.io/github/license/hoverkraft-tech/github-action-ovh-mks-scaling)](http://choosealicense.com/licenses/mit/)
[![Stars](https://img.shields.io/github/stars/hoverkraft-tech/github-action-ovh-mks-scaling?style=social)](https://img.shields.io/github/stars/hoverkraft-tech/github-action-ovh-mks-scaling?style=social)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/hoverkraft-tech/github-action-ovh-mks-scaling/blob/main/CONTRIBUTING.md)
[![codecov](https://codecov.io/gh/hoverkraft-tech/compose-action/graph/badge.svg?token=90JXB7EIMA)](https://codecov.io/gh/hoverkraft-tech/compose-action)

<!-- badges:end -->
<!-- overview:start -->

## Overview

Scale up or down your OVH MKS nodepool.
Rely on the OVH API through the [OVH Node.js SDK](https://github.com/ovh/node-ovh) to manage your Kubernetes clusters.
It allows you to scale the number of nodes in a specific nodepool of an OVH Managed Kubernetes Service (MKS) cluster.
This action supports both Application Key/Application Secret and OAuth2 authentication methods.

<!-- overview:end -->
<!-- usage:start -->

## Usage

```yaml
- uses: hoverkraft-tech/github-action-ovh-mks-scaling@8193c116beecbb2c52f26f465e9f6b93db6b27eb # 0.2.0
  with:
    # The OVH endpoint to use.
    # See the [available endpoints](https://github.com/ovh/node-ovh/blob/master/lib/endpoints.js) list.
    endpoint: ""

    # The OVH application key
    application-key: ""

    # The OVH application secret
    application-secret: ""

    # The OVH consumer key
    consumer-key: ""

    # The OAuth2 client ID
    client-id: ""

    # The OAuth2 client secret
    client-secret: ""

    # The project ID of the OVH MKS project
    # This input is required.
    project-id: ""

    # The ID of the OVH MKS cluster
    # This input is required.
    cluster-id: ""

    # The ID of the OVH MKS nodepool
    # This input is required.
    nodepool-id: ""

    # The number of nodes to scale to
    # This input is required.
    # Default: `1`
    number-of-nodes: "1"
```

<!-- usage:end -->

### Prerequisites

You need first to :

- Create an application in OVH API at : <https://www.ovh.com/auth/api/createApp>
- Export env vars `OVH_APPLICATION_KEY` and `OVH_APPLICATION_SECRET`
- And to run the script `scripts/create-ovh-creds.sh`
- note the consumer key
- click on the link for credentials validation

```sh
export OVH_APPLICATION_KEY="your_application_key"
export OVH_APPLICATION_SECRET="your_application_secret"

bash scripts/create-ovh-creds.sh
```

<!-- inputs:start -->

## Inputs

| **Input**                | **Description**                                                                                   | **Required** | **Default** |
| ------------------------ | ------------------------------------------------------------------------------------------------- | ------------ | ----------- |
| **`endpoint`**           | The OVH endpoint to use.                                                                          | **false**    | -           |
|                          | See the [available endpoints](https://github.com/ovh/node-ovh/blob/master/lib/endpoints.js) list. |              |             |
| **`application-key`**    | The OVH application key                                                                           | **false**    | -           |
| **`application-secret`** | The OVH application secret                                                                        | **false**    | -           |
| **`consumer-key`**       | The OVH consumer key                                                                              | **false**    | -           |
| **`client-id`**          | The OAuth2 client ID                                                                              | **false**    | -           |
| **`client-secret`**      | The OAuth2 client secret                                                                          | **false**    | -           |
| **`project-id`**         | The project ID of the OVH MKS project                                                             | **true**     | -           |
| **`cluster-id`**         | The ID of the OVH MKS cluster                                                                     | **true**     | -           |
| **`nodepool-id`**        | The ID of the OVH MKS nodepool                                                                    | **true**     | -           |
| **`number-of-nodes`**    | The number of nodes to scale to                                                                   | **true**     | `1`         |

<!-- inputs:end -->
<!-- secrets:start -->
<!-- secrets:end -->
<!-- outputs:start -->

## Outputs

| **Output**     | **Description**            |
| -------------- | -------------------------- |
| **`response`** | The response of the server |

<!-- outputs:end -->
<!-- examples:start -->
<!-- examples:end -->
<!-- contributing:start -->

## Contributing

Contributions are welcome! Please see the [contributing guidelines](https://github.com/hoverkraft-tech/github-action-ovh-mks-scaling/blob/main/CONTRIBUTING.md) for more details.

<!-- contributing:end -->
<!-- security:start -->
<!-- security:end -->
<!-- license:start -->

## License

This project is licensed under the MIT License.

SPDX-License-Identifier: MIT

Copyright © 2025 hoverkraft

For more details, see the [license](http://choosealicense.com/licenses/mit/).

<!-- license:end -->
<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->
