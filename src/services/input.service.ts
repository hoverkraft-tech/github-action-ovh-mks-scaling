import { getInput } from "@actions/core";

export type Inputs = {
  endpoint: string | null;
  // Authentication - Application Key/ApplicationSecret
  appKey: string | null;
  appSecret: string | null;
  consumerKey: string | null;

  // Authentication - OAuth2
  clientId: string | null;
  clientSecret: string | null;

  // Scaling parameters
  projectId: string;
  clusterId: string;
  nodepoolId: string;
  numberOfNodes: number;
};

export enum InputNames {
  Endpoint = "endpoint",

  // Authentication - Application Key/ApplicationSecret
  AppKey = "app-key",
  AppSecret = "app-secret",
  ConsumerKey = "consumer-key",

  // Authentication - OAuth2
  ClientId = "client-id",
  ClientSecret = "client-secret",

  // Scaling parameters
  ProjectId = "project-id",
  ClusterId = "cluster-id",
  NodepoolId = "nodepool-id",
  NumberOfNodes = "number-of-nodes",
}

export class InputService {
  getInputs(): Inputs {
    return {
      endpoint: this.getEndpoint(),
      // Authentication - Application Key/ApplicationSecret
      appKey: this.getAppKey(),
      appSecret: this.getAppSecret(),
      consumerKey: this.getConsumerKey(),
      // Authentication - OAuth2
      clientId: this.getClientId(),
      clientSecret: this.getClientSecret(),
      // Scaling parameters
      projectId: this.getProjectId(),
      clusterId: this.getClusterId(),
      nodepoolId: this.getNodepoolId(),
      numberOfNodes: this.getNumberOfNodes(),
    };
  }

  private getEndpoint(): string | null {
    return getInput(InputNames.Endpoint, { required: false }) || null;
  }

  private getAppKey(): string | null {
    return getInput(InputNames.AppKey, { required: false }) || null;
  }

  private getAppSecret(): string | null {
    return getInput(InputNames.AppSecret, { required: false }) || null;
  }

  private getConsumerKey(): string | null {
    return getInput(InputNames.ConsumerKey, { required: false }) || null;
  }

  private getClientId(): string | null {
    return getInput(InputNames.ClientId, { required: false }) || null;
  }

  private getClientSecret(): string | null {
    return getInput(InputNames.ClientSecret, { required: false }) || null;
  }

  private getProjectId(): string {
    return getInput(InputNames.ProjectId, { required: true });
  }

  private getClusterId(): string {
    return getInput(InputNames.ClusterId, { required: true });
  }

  private getNodepoolId(): string {
    return getInput(InputNames.NodepoolId, { required: true });
  }

  private getNumberOfNodes(): number {
    return parseInt(getInput(InputNames.NumberOfNodes, { required: true }), 10);
  }
}
