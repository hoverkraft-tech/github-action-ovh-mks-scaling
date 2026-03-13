declare module "@ovhcloud/node-ovh" {
  type OvhClient = {
    requestPromised: (method: string, url: string, data?: unknown) => Promise<unknown>;
  };

  export default function ovh(parameters: Record<string, unknown>): OvhClient;
}
