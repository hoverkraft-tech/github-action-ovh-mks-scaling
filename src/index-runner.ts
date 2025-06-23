import { setFailed, setOutput } from "@actions/core";
import { InputService } from "./services/input.service";
import { LoggerService } from "./services/logger.service";
import { OvhService } from "./services/ovh.service";

/**
 * The run function for the action.
 * @returns {Promise<void>} Resolves when the action is complete.
 */
export async function run(): Promise<void> {
  try {
    const loggerService = new LoggerService();
    const inputService = new InputService();
    const inputs = inputService.getInputs();
    loggerService.debug(`inputs: ${JSON.stringify(inputs)}`);

    const ovhService = new OvhService(
      loggerService,
      inputs.endpoint,
      inputs.appKey,
      inputs.appSecret,
      inputs.consumerKey,
      inputs.clientId,
      inputs.clientSecret
    );

    loggerService.info(
      `Scaling nodepool to ${inputs.numberOfNodes} nodes for project ${inputs.projectId} in cluster ${inputs.clusterId} and nodepool ${inputs.nodepoolId}`
    );
    const result = await ovhService.scaleNodepool({
      projectId: inputs.projectId,
      clusterId: inputs.clusterId,
      nodepoolId: inputs.nodepoolId,
      numberOfNodes: inputs.numberOfNodes,
    });
    loggerService.info("Nodepool scaling completed successfully.");
    setOutput("result", JSON.stringify(result));
  } catch (error) {
    setFailed(`${error instanceof Error ? error : JSON.stringify(error)}`);
  }
}
