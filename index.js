import { getInput, setOutput, setFailed } from "@actions/core";
import ovh from "ovh";

const ovhEndpoint = getInput("endpoint");
const ovhProjectId = getInput("project_id");
const ovhClusterId = getInput("cluster_id");
const ovhNodepoolId = getInput("nodepool_id");
const nodesNumber = getInput("number_of_nodes");

// setup OVH api client
const client = ovh({
  endpoint: ovhEndpoint,
  appKey: process.env.OVH_APPLICATION_KEY,
  appSecret: process.env.OVH_APPLICATION_SECRET,
  consumerKey: process.env.OVH_CONSUMER_KEY,
});

// Call the OVH API to scale the nodepool
// see https://eu.api.ovh.com/console/?section=%2Fcloud&branch=v1#put-/cloud/project/-serviceName-/kube/-kubeId-/nodepool/-nodePoolId-
// curl -X PUT "https://eu.api.ovh.com/v1/cloud/project//kube//nodepool/" \
//   -H "content-type: application/json" \
//   -d '{"autoscale":false,"autoscaling":{"scaleDownUnneededTimeSeconds":0,"scaleDownUnreadyTimeSeconds":0,"scaleDownUtilizationThreshold":0},"desiredNodes":0,"maxNodes":0,"minNodes":0,"nodesToRemove":["string"],"template":{"metadata":{"annotations":{"any-key":"string"},"finalizers":["string"],"labels":{"any-key":"string"}},"spec":{"taints":[{"effect":"NoExecute","key":"string","value":"string"}],"unschedulable":false}}}' \

console.log("Scaling nodepool with the following parameters:", {
  endpoint: ovhEndpoint,
  projectId: ovhProjectId,
  clusterId: ovhClusterId,
  nodepoolId: ovhNodepoolId,
  desiredNodes: parseInt(nodesNumber),
  url: `/cloud/project/${ovhProjectId}/kube/${ovhClusterId}/nodepool/${ovhNodepoolId}`,
  method: "PUT",
  body: {
    autoscale: false,
    autoscaling: {},
    minNodes: parseInt(nodesNumber),
    maxNodes: parseInt(nodesNumber),
    desiredNodes: parseInt(nodesNumber),
  },
});

let response;
try {
  response = await client.requestPromised(
    "PUT",
    `/cloud/project/${ovhProjectId}/kube/${ovhClusterId}/nodepool/${ovhNodepoolId}`,
    {
      autoscale: false,
      autoscaling: {},
      minNodes: parseInt(nodesNumber),
      maxNodes: parseInt(nodesNumber),
      desiredNodes: parseInt(nodesNumber),
    }
  );

  console.log("OVH API response:", response.code);
  setOutput("response", response);
} catch (err) {
  // Handle OVH API 204 No Content as success
  if (err && err.error === 204) {
    console.log("OVH API returned 204 No Content (success)");
    setOutput("response", { code: 204, message: "No Content (success)" });
  } else {
    setFailed(`Action error: ${err && err.message ? err.message : JSON.stringify(err)}`);
  }
}
