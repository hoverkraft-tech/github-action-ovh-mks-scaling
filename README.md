<!-- markdownlint-disable-next-line first-line-heading -->
<div align="center" width="100%">
<!-- start branding -->

<img src=".github/ghadocs/branding.svg" width="15%" align="center" alt="branding<icon:align-left color:blue>" />

<!-- end branding -->
<!-- start title -->

# <img src=".github/ghadocs/branding.svg" width="60px" align="center" alt="branding<icon:align-left color:blue>" /> GitHub Action: OVH MKS Scaling

<!-- end title -->
<!-- markdownlint-disable MD013 -->
<!-- start badges -->

<a href="https%3A%2F%2Fgithub.com%2Fhoverkraft-tech%2Fgithub-action-ovh-mks-scaling%2Freleases%2Flatest"><img src="https://img.shields.io/github/v/release/hoverkraft-tech/github-action-ovh-mks-scaling?display_name=tag&sort=semver&logo=github&style=flat-square" alt="Release%20by%20tag" /></a><a href="https%3A%2F%2Fgithub.com%2Fhoverkraft-tech%2Fgithub-action-ovh-mks-scaling%2Freleases%2Flatest"><img src="https://img.shields.io/github/release-date/hoverkraft-tech/github-action-ovh-mks-scaling?display_name=tag&sort=semver&logo=github&style=flat-square" alt="Release%20by%20date" /></a><img src="https://img.shields.io/github/last-commit/hoverkraft-tech/github-action-ovh-mks-scaling?logo=github&style=flat-square" alt="Commit" /><a href="https%3A%2F%2Fgithub.com%2Fhoverkraft-tech%2Fgithub-action-ovh-mks-scaling%2Fissues"><img src="https://img.shields.io/github/issues/hoverkraft-tech/github-action-ovh-mks-scaling?logo=github&style=flat-square" alt="Open%20Issues" /></a><img src="https://img.shields.io/github/downloads/hoverkraft-tech/github-action-ovh-mks-scaling/total?logo=github&style=flat-square" alt="Downloads" />

<!-- end badges -->

## <!-- markdownlint-enable MD013 -->

</div>
<!-- start description -->

Scale up or down your OVH MKS nodepool.
Rely on the OVH API through the [OVH NodeJS SDK](https://github.com/ovh/node-ovh) to manage your Kubernetes clusters.
It allows you to scale the number of nodes in a specific nodepool of an OVH Managed Kubernetes Service (MKS) cluster.
This action supports both Application Key/Application Secret and OAuth2 authentication methods.

<!-- end description -->
<!-- start contents -->
<!-- end contents -->

## Usage

You need first to :

- create an application in OVH API at : <https://www.ovh.com/auth/api/createApp>
- export env vars `OVH_APPLICATION_KEY` and `OVH_APPLICATION_SECRET`
- and to run the script `scripts/create-ovh-creds.sh`
- note the consumer key
- click on the link for credentials validation

<!-- start usage -->

```yaml
- uses: hoverkraft-tech/github-action-ovh-mks-scaling@v0.0.0
  with:
    # Description: The OVH endpoint to use. See the
    # [available endpoints](https://github.com/ovh/node-ovh/blob/master/lib/endpoints.js)
    # list.
    #
    endpoint: ""

    # Description: The OVH application key
    #
    application-key: ""

    # Description: The OVH application secret
    #
    application-secret: ""

    # Description: The OVH consumer key
    #
    consumer-key: ""

    # Description: The OAuth2 client ID
    #
    client-id: ""

    # Description: The OAuth2 client secret
    #
    client-secret: ""

    # Description: The project ID of the OVH MKS project
    #
    project-id: ""

    # Description: The ID of the OVH MKS cluster
    #
    cluster-id: ""

    # Description: The ID of the OVH MKS nodepool
    #
    nodepool-id: ""

    # Description: The number of nodes to scale to
    #
    # Default: 1
    number-of-nodes: ""
```

<!-- end usage -->

## Inputs

<!-- start inputs -->

| **Input**                       | **Description**                                                                                                                 | **Default**    | **Required** |
| ------------------------------- | ------------------------------------------------------------------------------------------------------------------------------- | -------------- | ------------ |
| <code>endpoint</code>           | The OVH endpoint to use.<br />See the [available endpoints](https://github.com/ovh/node-ovh/blob/master/lib/endpoints.js) list. |                | **false**    |
| <code>application-key</code>    | The OVH application key                                                                                                         |                | **false**    |
| <code>application-secret</code> | The OVH application secret                                                                                                      |                | **false**    |
| <code>consumer-key</code>       | The OVH consumer key                                                                                                            |                | **false**    |
| <code>client-id</code>          | The OAuth2 client ID                                                                                                            |                | **false**    |
| <code>client-secret</code>      | The OAuth2 client secret                                                                                                        |                | **false**    |
| <code>project-id</code>         | The project ID of the OVH MKS project                                                                                           |                | **true**     |
| <code>cluster-id</code>         | The ID of the OVH MKS cluster                                                                                                   |                | **true**     |
| <code>nodepool-id</code>        | The ID of the OVH MKS nodepool                                                                                                  |                | **true**     |
| <code>number-of-nodes</code>    | The number of nodes to scale to                                                                                                 | <code>1</code> | **true**     |

<!-- end inputs -->
<!-- start outputs -->

| **Output**            | **Description**            |
| --------------------- | -------------------------- |
| <code>response</code> | The response of the server |

<!-- end outputs -->
<!-- start [.github/ghadocs/examples/] -->
<!-- end [.github/ghadocs/examples/] -->
