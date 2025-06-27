import { Inputs } from "./input.service";
import { LoggerService } from "./logger.service";

type Client = {
  requestPromised: (method: string, url: string, data?: unknown) => Promise<NodepoolUpdateResponse>;
};

// https://eu.api.ovh.com/console/?section=%2Fcloud&branch=v1#put-/cloud/project/-serviceName-/kube/-kubeId-/nodepool/-nodePoolId-
export type NodepoolUpdateResponse = {
  autoscale: boolean | null;
  autoscaling: {
    scaleDownUnneededTimeSeconds?: number;
    scaleDownUnreadyTimeSeconds?: number;
    scaleDownUtilizationThreshold?: number;
  };
  desiredNodes: number;
  maxNodes: number;
  minNodes: number;
  nodesToRemove?: string[];
  template: {
    metadata: {
      annotations?: Record<string, string>;
      finalizers?: string[];
      labels?: Record<string, string>;
    };
    spec: {
      taints?: Array<{
        effect: "NoExecute" | "NoSchedule" | "PreferNoSchedule";
        key: string;
        value: string;
      }>;
      unschedulable?: boolean;
    };
  };
};

type AppAuthenticationParameters = {
  appKey: string;
  appSecret: string;
  consumerKey?: string;
};

type OAuth2AuthenticationParameters = {
  clientID: string;
  clientSecret: string;
};

type ClientParameters = {
  endpoint?: string;
  debug: (message: string) => void;
} & (AppAuthenticationParameters | OAuth2AuthenticationParameters);

export class OvhService {
  private readonly client: Client;

  constructor(
    private readonly loggerService: LoggerService,
    endpoint: Inputs["endpoint"],
    appKey: Inputs["appKey"],
    appSecret: Inputs["appSecret"],
    consumerKey: Inputs["consumerKey"],
    clientId: Inputs["clientId"],
    clientSecret: Inputs["clientSecret"]
  ) {
    let authParameters: AppAuthenticationParameters | OAuth2AuthenticationParameters;
    switch (true) {
      case Boolean(appKey || appSecret || consumerKey):
        authParameters = this.authenticateClientWithAppCredentials(appKey, appSecret, consumerKey);
        this.loggerService.debug(
          `Using App credentials for authentication: appKey=${appKey}, consumerKey=${consumerKey}`
        );
        break;
      case Boolean(clientId || clientSecret):
        authParameters = this.authenticateClientWithOAuth2(clientId, clientSecret);
        this.loggerService.debug(
          `Using OAuth2 credentials for authentication: clientId=${clientId}`
        );
        break;
      default:
        throw new Error(
          "No valid authentication method provided. Please provide either App credentials or OAuth2 credentials."
        );
    }

    const parameters: ClientParameters = {
      debug: (message: string, ...context: unknown[]) =>
        this.loggerService.debug(`${message}\n${JSON.stringify(context, null, 2)}`),
      endpoint: endpoint || undefined,
      ...authParameters,
    };

    // eslint-disable-next-line @typescript-eslint/no-var-requires
    this.client = require("@ovhcloud/node-ovh")(parameters);
  }

  private authenticateClientWithAppCredentials(
    appKey: Inputs["appKey"],
    appSecret: Inputs["appSecret"],
    consumerKey: Inputs["consumerKey"]
  ): AppAuthenticationParameters {
    if (!appKey) {
      throw new Error("OVH appKey is required for authentication.");
    }

    if (!appSecret) {
      throw new Error("OVH appSecret is required for authentication.");
    }

    const authParameters: AppAuthenticationParameters = {
      appKey,
      appSecret,
    };

    if (consumerKey) {
      authParameters.consumerKey = consumerKey;
    }

    return authParameters;
  }

  private authenticateClientWithOAuth2(
    clientId: Inputs["clientId"],
    clientSecret: Inputs["clientSecret"]
  ): OAuth2AuthenticationParameters {
    if (!clientId) {
      throw new Error("OVH clientId is required for authentication.");
    }

    if (!clientSecret) {
      throw new Error("OVH clientSecret is required for authentication.");
    }

    const authParameters: OAuth2AuthenticationParameters = {
      clientID: clientId,
      clientSecret,
    };

    return authParameters;
  }

  /**
   * Call the OVH API to scale the nodepool
   * see https://eu.api.ovh.com/console/?section=%2Fcloud&branch=v1#put-/cloud/project/-serviceName-/kube/-kubeId-/nodepool/-nodePoolId-
   * curl -X PUT "https://eu.api.ovh.com/v1/cloud/project//kube//nodepool/" \
   *   -H "content-type: application/json" \
   *   -d '{"autoscale":false,"autoscaling":{"scaleDownUnneededTimeSeconds":0,"scaleDownUnreadyTimeSeconds":0,"scaleDownUtilizationThreshold":0},"desiredNodes":0,"maxNodes":0,"minNodes":0,"nodesToRemove":["string"],"template":{"metadata":{"annotations":{"any-key":"string"},"finalizers":["string"],"labels":{"any-key":"string"}},"spec":{"taints":[{"effect":"NoExecute","key":"string","value":"string"}],"unschedulable":false}}}' \
   **/
  public scaleNodepool({
    projectId,
    clusterId,
    nodepoolId,
    numberOfNodes,
  }: {
    projectId: Inputs["projectId"];
    clusterId: Inputs["clusterId"];
    nodepoolId: Inputs["nodepoolId"];
    numberOfNodes: Inputs["numberOfNodes"];
  }) {
    return this.client.requestPromised(
      "PUT",
      `/cloud/project/${projectId}/kube/${clusterId}/nodepool/${nodepoolId}`,
      {
        autoscale: false,
        autoscaling: {},
        minNodes: numberOfNodes,
        maxNodes: numberOfNodes,
        desiredNodes: numberOfNodes,
      }
    );
  }
}
