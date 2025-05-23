# github-action-ovh-mks-scaling

Scale up or down a OVH MKS nodepool

You need first to :

- create an application in OVH api at : https://www.ovh.com/auth/api/createApp
- export env vars `OVH_APPLICATION_KEY` and `OVH_APPLICATION_SECRET`
- and to run the script `scripts/create-ovh-creds.sh`
- note the consumer key
- click on the link for credentials validation
