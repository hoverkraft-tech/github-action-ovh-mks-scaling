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
![GitHub Verified Creator](https://img.shields.io/badge/GitHub-Verified%20Creator-4493F8?logo=data:image/svg%2bxml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAxNiIgd2lkdGg9IjE2IiBoZWlnaHQ9IjE2IiBmaWxsPSJyZ2IoNjgsIDE0NywgMjQ4KSI+CiAgPHBhdGggZD0ibTkuNTg1LjUyLjkyOS42OGMuMTUzLjExMi4zMzEuMTg2LjUxOC4yMTVsMS4xMzguMTc1YTIuNjc4IDIuNjc4IDAgMCAxIDIuMjQgMi4yNGwuMTc0IDEuMTM5Yy4wMjkuMTg3LjEwMy4zNjUuMjE1LjUxOGwuNjguOTI4YTIuNjc3IDIuNjc3IDAgMCAxIDAgMy4xN2wtLjY4LjkyOGExLjE3NCAxLjE3NCAwIDAgMC0uMjE1LjUxOGwtLjE3NSAxLjEzOGEyLjY3OCAyLjY3OCAwIDAgMS0yLjI0MSAyLjI0MWwtMS4xMzguMTc1YTEuMTcgMS4xNyAwIDAgMC0uNTE4LjIxNWwtLjkyOC42OGEyLjY3NyAyLjY3NyAwIDAgMS0zLjE3IDBsLS45MjgtLjY4YTEuMTc0IDEuMTc0IDAgMCAwLS41MTgtLjIxNUwzLjgzIDE0LjQxYTIuNjc4IDIuNjc4IDAgMCAxLTIuMjQtMi4yNGwtLjE3NS0xLjEzOGExLjE3IDEuMTcgMCAwIDAtLjIxNS0uNTE4bC0uNjgtLjkyOGEyLjY3NyAyLjY3NyAwIDAgMSAwLTMuMTdsLjY4LS45MjhjLjExMi0uMTUzLjE4Ni0uMzMxLjIxNS0uNTE4bC4xNzUtMS4xNGEyLjY3OCAyLjY3OCAwIDAgMSAyLjI0LTIuMjRsMS4xMzktLjE3NWMuMTg3LS4wMjkuMzY1LS4xMDMuNTE4LS4yMTVsLjkyOC0uNjhhMi42NzcgMi42NzcgMCAwIDEgMy4xNyAwWk03LjMwMyAxLjcyOGwtLjkyNy42OGEyLjY3IDIuNjcgMCAwIDEtMS4xOC40ODlsLTEuMTM3LjE3NGExLjE3OSAxLjE3OSAwIDAgMC0uOTg3Ljk4N2wtLjE3NCAxLjEzNmEyLjY3NyAyLjY3NyAwIDAgMS0uNDg5IDEuMThsLS42OC45MjhhMS4xOCAxLjE4IDAgMCAwIDAgMS4zOTRsLjY4LjkyN2MuMjU2LjM0OC40MjQuNzUzLjQ4OSAxLjE4bC4xNzQgMS4xMzdjLjA3OC41MDkuNDc4LjkwOS45ODcuOTg3bDEuMTM2LjE3NGEyLjY3IDIuNjcgMCAwIDEgMS4xOC40ODlsLjkyOC42OGMuNDE0LjMwNS45NzkuMzA1IDEuMzk0IDBsLjkyNy0uNjhhMi42NyAyLjY3IDAgMCAxIDEuMTgtLjQ4OWwxLjEzNy0uMTc0YTEuMTggMS4xOCAwIDAgMCAuOTg3LS45ODdsLjE3NC0xLjEzNmEyLjY3IDIuNjcgMCAwIDEgLjQ4OS0xLjE4bC42OC0uOTI4YTEuMTc2IDEuMTc2IDAgMCAwIDAtMS4zOTRsLS42OC0uOTI3YTIuNjg2IDIuNjg2IDAgMCAxLS40ODktMS4xOGwtLjE3NC0xLjEzN2ExLjE3OSAxLjE3OSAwIDAgMC0uOTg3LS45ODdsLTEuMTM2LS4xNzRhMi42NzcgMi42NzcgMCAwIDEtMS4xOC0uNDg5bC0uOTI4LS42OGExLjE3NiAxLjE3NiAwIDAgMC0xLjM5NCAwWk0xMS4yOCA2Ljc4bC0zLjc1IDMuNzVhLjc1Ljc1IDAgMCAxLTEuMDYgMEw0LjcyIDguNzhhLjc1MS43NTEgMCAwIDEgLjAxOC0xLjA0Mi43NTEuNzUxIDAgMCAxIDEuMDQyLS4wMThMNyA4Ljk0bDMuMjItMy4yMmEuNzUxLjc1MSAwIDAgMSAxLjA0Mi4wMTguNzUxLjc1MSAwIDAgMSAuMDE4IDEuMDQyWiI+PC9wYXRoPgo8L3N2Zz4K)
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
- uses: hoverkraft-tech/github-action-ovh-mks-scaling@d9f205d85554633240217794cd535ecd0f84854c # 0.3.0
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

    # Whether to enable autoscaling for the nodepool
    # Default: `true`
    autoscale: "true"

    # The desired number of nodes to scale to.
    # This value sets the `desiredNodes` property on the OVH API.
    # It is also used as the default for `min-nodes` and `max-nodes` when they are not provided.
    # The effective `desiredNodes` sent to the API is clamped between `min-nodes` and `max-nodes`
    # (i.e. `max(number-of-nodes, min-nodes)` then `min(result, max-nodes)`).
    #
    # This input is required.
    # Default: `1`
    number-of-nodes: "1"

    # The minimum number of nodes for autoscaling (sets `minNodes` on the OVH API).
    # Defaults to `number-of-nodes` if not provided.
    # When autoscaling is enabled, the cluster will never scale below this value.
    min-nodes: ""

    # The maximum number of nodes for autoscaling (sets `maxNodes` on the OVH API).
    # Defaults to `number-of-nodes` if not provided.
    # When autoscaling is enabled, the cluster will never scale above this value.
    max-nodes: ""
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
| **`autoscale`**          | Whether to enable autoscaling for the nodepool                                                    | **false**    | `true`      |
| **`number-of-nodes`**    | The desired number of nodes to scale to.                                                          | **true**     | `1`         |
|                          | This value sets the `desiredNodes` property on the OVH API.                                       |              |             |
|                          | It is also used as the default for `min-nodes` and `max-nodes` when they are not provided.        |              |             |
|                          | The effective `desiredNodes` sent to the API is clamped between `min-nodes` and `max-nodes`       |              |             |
|                          | (i.e. `max(number-of-nodes, min-nodes)` then `min(result, max-nodes)`).                           |              |             |
| **`min-nodes`**          | The minimum number of nodes for autoscaling (sets `minNodes` on the OVH API).                     | **false**    | -           |
|                          | Defaults to `number-of-nodes` if not provided.                                                    |              |             |
|                          | When autoscaling is enabled, the cluster will never scale below this value.                       |              |             |
| **`max-nodes`**          | The maximum number of nodes for autoscaling (sets `maxNodes` on the OVH API).                     | **false**    | -           |
|                          | Defaults to `number-of-nodes` if not provided.                                                    |              |             |
|                          | When autoscaling is enabled, the cluster will never scale above this value.                       |              |             |

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

Copyright © 2026 hoverkraft

For more details, see the [license](http://choosealicense.com/licenses/mit/).

<!-- license:end -->
<!-- generated:start -->

---

This documentation was automatically generated by [CI Dokumentor](https://github.com/hoverkraft-tech/ci-dokumentor).

<!-- generated:end -->
