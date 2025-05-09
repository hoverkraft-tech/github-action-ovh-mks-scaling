import { getInput, setOutput, setFailed } from '@actions/core';
import { readFile } from 'node:fs/promises';
import ovh from 'ovh';

try {
  const ovhEndpoint = getInput('endpoint');
  const ovhRegion = getInput('region');
  const ovhProjectId = getInput('project_id');
  const ovhClusterId = getInput('cluster_id');
  const ovhNodepoolId = getInput('nodepool_id');
  const nodesNumber = getInput('number_of_nodes');

  // setup OVH api client
	const client = ovh({
    endpoint: ovhEndpoint,
		appKey: process.env.OVH_APP_KEY,
		appSecret: process.env.OVH_APP_SECRET,
		consumerKey: process.env.OVH_CONSUMER_KEY,
	});

  // Call the OVH API to scale the nodepool
  // see https://eu.api.ovh.com/console/?section=%2Fcloud&branch=v1#put-/cloud/project/-serviceName-/kube/-kubeId-/nodepool/-nodePoolId-
  // curl -X PUT "https://eu.api.ovh.com/v1/cloud/project//kube//nodepool/" \
 //   -H "content-type: application/json" \
 //   -d '{"autoscale":false,"autoscaling":{"scaleDownUnneededTimeSeconds":0,"scaleDownUnreadyTimeSeconds":0,"scaleDownUtilizationThreshold":0},"desiredNodes":0,"maxNodes":0,"minNodes":0,"nodesToRemove":["string"],"template":{"metadata":{"annotations":{"any-key":"string"},"finalizers":["string"],"labels":{"any-key":"string"}},"spec":{"taints":[{"effect":"NoExecute","key":"string","value":"string"}],"unschedulable":false}}}' \

  const response = await client.requestPromised('PUT', `/v1/cloud/project/${ovhProjectId}/kube/${ovhClusterId}/nodepool/${ovhNodepoolId}`, {
    "desiredNodes": nodesNumber,
  });
	setOutput("response", response)
} catch (err) {
	setFailed(err.message)
}
