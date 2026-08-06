import * as core from "@actions/core";
import { type MockInstance, vi } from "vitest";
import * as indexRunner from "./index-runner.js";
import { InputService } from "./services/input.service.js";
import { LoggerService } from "./services/logger.service.js";

import type { NodepoolUpdateResponse } from "./services/ovh.service.js";
import { OvhService } from "./services/ovh.service.js";

vi.mock("@actions/core", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@actions/core")>();

  return {
    ...actual,
    setFailed: vi.fn(),
  };
});

describe("run", () => {
  // Mock the external libraries and services used by the action
  let infoMock: MockInstance<typeof LoggerService.prototype.info>;
  let debugMock: MockInstance<typeof LoggerService.prototype.debug>;
  let setFailedMock: MockInstance<typeof core.setFailed>;
  let getInputsMock: MockInstance<typeof InputService.prototype.getInputs>;
  let scaleNodepoolMock: MockInstance<
    typeof OvhService.prototype.scaleNodepool
  >;

  beforeEach(() => {
    vi.clearAllMocks();

    infoMock = vi
      .spyOn(LoggerService.prototype, "info")
      .mockImplementation(() => undefined);
    debugMock = vi
      .spyOn(LoggerService.prototype, "debug")
      .mockImplementation(() => undefined);
    setFailedMock = vi.mocked(core.setFailed);
    setFailedMock.mockImplementation(() => undefined);
    getInputsMock = vi.spyOn(InputService.prototype, "getInputs");
    scaleNodepoolMock = vi.spyOn(OvhService.prototype, "scaleNodepool");
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
      autoscale: true,
      minNodes: null,
      maxNodes: null,
    }));

    scaleNodepoolMock.mockResolvedValueOnce({} as NodepoolUpdateResponse);

    // Act
    await indexRunner.run();

    // Assert
    expect(debugMock).toHaveBeenNthCalledWith(
      1,
      'inputs: {"endpoint":"ovh-eu","appKey":"app-key","appSecret":"app-secret","consumerKey":"consumer-key","clientId":null,"clientSecret":null,"projectId":"project-id","clusterId":"cluster-id","nodepoolId":"nodepool-id","numberOfNodes":3,"autoscale":true,"minNodes":null,"maxNodes":null}',
    );

    expect(infoMock).toHaveBeenNthCalledWith(
      1,
      "Scaling nodepool to 3 nodes for project project-id in cluster cluster-id and nodepool nodepool-id",
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

    expect(infoMock).toHaveBeenNthCalledWith(
      2,
      "Nodepool scaling completed successfully.",
    );
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
      autoscale: true,
      minNodes: null,
      maxNodes: null,
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
      autoscale: true,
      minNodes: null,
      maxNodes: null,
    }));

    // Act
    await indexRunner.run();

    // Assert
    expect(setFailedMock).toHaveBeenCalledWith('"Test error"');
  });
});
