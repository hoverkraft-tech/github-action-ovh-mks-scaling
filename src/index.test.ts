import * as core from "@actions/core";
import type { NodepoolUpdateResponse } from "./services/ovh.service.js";
import { OvhService } from "./services/ovh.service.js";
import { InputService } from "./services/input.service.js";
import { LoggerService } from "./services/logger.service.js";

let setFailedMock: jest.SpiedFunction<typeof core.setFailed>;
let getInputsMock: jest.SpiedFunction<typeof InputService.prototype.getInputs>;
let debugMock: jest.SpiedFunction<typeof LoggerService.prototype.debug>;
let infoMock: jest.SpiedFunction<typeof LoggerService.prototype.info>;
let scaleNodepoolMock: jest.SpiedFunction<typeof OvhService.prototype.scaleNodepool>;

describe("index", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    setFailedMock = jest.spyOn(core, "setFailed").mockImplementation();
    infoMock = jest.spyOn(LoggerService.prototype, "info").mockImplementation();
    debugMock = jest.spyOn(LoggerService.prototype, "debug").mockImplementation();
    getInputsMock = jest.spyOn(InputService.prototype, "getInputs");
    scaleNodepoolMock = jest.spyOn(OvhService.prototype, "scaleNodepool");
  });

  it("calls run when imported", async () => {
    getInputsMock.mockImplementation(() => ({
      endpoint: "ovh-eu",
      appKey: "app-key",
      appSecret: "app-secret",
      consumerKey: "consumer-key",
      clientId: null,
      clientSecret: null,
      projectId: "project-id",
      clusterId: "cluster-id",
      nodepoolId: "nodepool-id",
      numberOfNodes: 3,
      autoscale: true,
      minNodes: null,
      maxNodes: null,
    }));

    scaleNodepoolMock.mockResolvedValueOnce({} as NodepoolUpdateResponse);

    await import("./index.js");
    await new Promise((resolve) => setTimeout(resolve, 0));

    // Verify that all of the functions were called correctly
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'inputs: {"endpoint":"ovh-eu","appKey":"app-key","appSecret":"app-secret","consumerKey":"consumer-key","clientId":null,"clientSecret":null,"projectId":"project-id","clusterId":"cluster-id","nodepoolId":"nodepool-id","numberOfNodes":3,"autoscale":true,"minNodes":null,"maxNodes":null}'
    );

    expect(infoMock).toHaveBeenNthCalledWith(
      1,
      "Scaling nodepool to 3 nodes for project project-id in cluster cluster-id and nodepool nodepool-id"
    );

    expect(scaleNodepoolMock).toHaveBeenCalledWith({
      projectId: "project-id",
      clusterId: "cluster-id",
      nodepoolId: "nodepool-id",
      numberOfNodes: 3,
      autoscale: true,
      minNodes: null,
      maxNodes: null,
    });

    expect(setFailedMock).not.toHaveBeenCalled();

    expect(infoMock).toHaveBeenNthCalledWith(2, "Nodepool scaling completed successfully.");
  });
});
