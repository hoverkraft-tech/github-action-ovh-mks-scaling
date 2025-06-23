import * as core from "@actions/core";
import { InputService } from "./services/input.service";
import { LoggerService } from "./services/logger.service";
import * as indexRunner from "./index-runner";

import { NodepoolUpdateResponse, OvhService } from "./services/ovh.service";

describe("run", () => {
  // Mock the external libraries and services used by the action
  let infoMock: jest.SpiedFunction<typeof LoggerService.prototype.info>;
  let debugMock: jest.SpiedFunction<typeof LoggerService.prototype.debug>;
  let setFailedMock: jest.SpiedFunction<typeof core.setFailed>;
  let getInputsMock: jest.SpiedFunction<typeof InputService.prototype.getInputs>;
  let scaleNodepoolMock: jest.SpiedFunction<typeof OvhService.prototype.scaleNodepool>;

  beforeEach(() => {
    jest.clearAllMocks();

    infoMock = jest.spyOn(LoggerService.prototype, "info").mockImplementation();
    debugMock = jest.spyOn(LoggerService.prototype, "debug").mockImplementation();
    setFailedMock = jest.spyOn(core, "setFailed").mockImplementation();
    getInputsMock = jest.spyOn(InputService.prototype, "getInputs");
    scaleNodepoolMock = jest.spyOn(OvhService.prototype, "scaleNodepool");
  });

  it("should scale the nodepool", async () => {
    // Arrange
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
    }));

    scaleNodepoolMock.mockResolvedValueOnce({} as NodepoolUpdateResponse);

    // Act
    await indexRunner.run();

    // Assert
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'inputs: {"endpoint":"ovh-eu","appKey":"app-key","appSecret":"app-secret","consumerKey":"consumer-key","clientId":null,"clientSecret":null,"projectId":"project-id","clusterId":"cluster-id","nodepoolId":"nodepool-id","numberOfNodes":3}'
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
    });

    expect(setFailedMock).not.toHaveBeenCalled();

    expect(infoMock).toHaveBeenNthCalledWith(2, "Nodepool scaling completed successfully.");
  });

  it("should handle errors and call setFailed", async () => {
    // Arrange
    const error = new Error("Test error");
    scaleNodepoolMock.mockRejectedValue(error);

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
    }));

    // Act
    await indexRunner.run();

    // Assert
    expect(setFailedMock).toHaveBeenCalledWith("Error: Test error");
  });

  it("should handle unknown errors and call setFailed", async () => {
    // Arrange
    const error = "Test error";
    scaleNodepoolMock.mockRejectedValue(error);

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
    }));

    // Act
    await indexRunner.run();

    // Assert
    expect(setFailedMock).toHaveBeenCalledWith('"Test error"');
  });
});
