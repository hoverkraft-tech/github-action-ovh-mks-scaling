import { LoggerService } from "./logger.service";
import { OvhService, NodepoolUpdateResponse } from "./ovh.service";

// Mock the @ovhcloud/node-ovh module
const mockRequestPromised = jest.fn();
const mockOvhClient = jest.fn().mockReturnValue({
  requestPromised: mockRequestPromised,
});

jest.mock("@ovhcloud/node-ovh", () => mockOvhClient);

describe("OvhService", () => {
  let loggerService: LoggerService;
  let loggerDebugSpy: jest.SpyInstance;

  beforeEach(() => {
    jest.clearAllMocks();
    loggerService = new LoggerService();
    loggerDebugSpy = jest.spyOn(loggerService, "debug").mockImplementation();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("constructor", () => {
    describe("with App credentials", () => {
      it("should initialize with App credentials when appKey and appSecret are provided", () => {
        new OvhService(
          loggerService,
          "ovh-eu",
          "<TEST_APP_KEY>",
          "<TEST_APP_SECRET>",
          "<TEST_CONSUMER_KEY>",
          null,
          null
        );

        expect(mockOvhClient).toHaveBeenCalledWith({
          debug: expect.any(Function),
          endpoint: "ovh-eu",
          appKey: "<TEST_APP_KEY>",
          appSecret: "<TEST_APP_SECRET>",
          consumerKey: "<TEST_CONSUMER_KEY>",
        });

        expect(loggerDebugSpy).toHaveBeenCalledWith(
          "Using App credentials for authentication: appKey=<TEST_APP_KEY>, consumerKey=<TEST_CONSUMER_KEY>"
        );
      });

      it("should initialize with App credentials without consumerKey", () => {
        new OvhService(
          loggerService,
          "ovh-eu",
          "<TEST-APP_KEY>",
          "<TEST_APP_SECRET>",
          null,
          null,
          null
        );

        expect(mockOvhClient).toHaveBeenCalledWith({
          debug: expect.any(Function),
          endpoint: "ovh-eu",
          appKey: "<TEST-APP_KEY>",
          appSecret: "<TEST_APP_SECRET>",
        });
      });

      it("should use undefined endpoint when not provided", () => {
        new OvhService(
          loggerService,
          null,
          "<TEST-APP_KEY>",
          "<TEST_APP_SECRET>",
          null,
          null,
          null
        );

        expect(mockOvhClient).toHaveBeenCalledWith({
          debug: expect.any(Function),
          endpoint: undefined,
          appKey: "<TEST-APP_KEY>",
          appSecret: "<TEST_APP_SECRET>",
        });
      });

      it("should throw error when appKey is missing", () => {
        expect(() => {
          new OvhService(loggerService, "ovh-eu", null, "<TEST_APP_SECRET>", null, null, null);
        }).toThrow("OVH appKey is required for authentication.");
      });

      it("should throw error when appSecret is missing", () => {
        expect(() => {
          new OvhService(loggerService, "ovh-eu", "<TEST-APP_KEY>", null, null, null, null);
        }).toThrow("OVH appSecret is required for authentication.");
      });
    });

    describe("with OAuth2 credentials", () => {
      it("should initialize with OAuth2 credentials when clientId and clientSecret are provided", () => {
        new OvhService(
          loggerService,
          "ovh-eu",
          null,
          null,
          null,
          "test-client-id",
          "test-client-secret"
        );

        expect(mockOvhClient).toHaveBeenCalledWith({
          debug: expect.any(Function),
          endpoint: "ovh-eu",
          clientID: "test-client-id",
          clientSecret: "test-client-secret",
        });

        expect(loggerDebugSpy).toHaveBeenCalledWith(
          "Using OAuth2 credentials for authentication: clientId=test-client-id"
        );
      });

      it("should throw error when clientId is missing", () => {
        expect(() => {
          new OvhService(loggerService, "ovh-eu", null, null, null, null, "test-client-secret");
        }).toThrow("OVH clientId is required for authentication.");
      });

      it("should throw error when clientSecret is missing", () => {
        expect(() => {
          new OvhService(loggerService, "ovh-eu", null, null, null, "test-client-id", null);
        }).toThrow("OVH clientSecret is required for authentication.");
      });
    });

    describe("with no valid credentials", () => {
      it("should throw error when no authentication method is provided", () => {
        expect(() => {
          new OvhService(loggerService, "ovh-eu", null, null, null, null, null);
        }).toThrow(
          "No valid authentication method provided. Please provide either App credentials or OAuth2 credentials."
        );
      });
    });

    describe("debug function", () => {
      it("should configure debug function that calls logger with formatted message", () => {
        new OvhService(
          loggerService,
          "ovh-eu",
          "<TEST-APP_KEY>",
          "<TEST_APP_SECRET>",
          null,
          null,
          null
        );

        const debugFunction = mockOvhClient.mock.calls[0][0].debug;
        const testMessage = "Test debug message";
        const testContext = { key: "value" };

        debugFunction(testMessage, testContext);

        expect(loggerDebugSpy).toHaveBeenCalledWith(
          `${testMessage}\n${JSON.stringify([testContext], null, 2)}`
        );
      });
    });
  });

  describe("scaleNodepool", () => {
    let service: OvhService;

    beforeEach(() => {
      service = new OvhService(
        loggerService,
        "ovh-eu",
        "<TEST-APP_KEY>",
        "<TEST_APP_SECRET>",
        null,
        null,
        null
      );
    });

    it("should call OVH API with correct parameters", async () => {
      const mockResponse: NodepoolUpdateResponse = {
        autoscale: false,
        autoscaling: {},
        desiredNodes: 5,
        maxNodes: 5,
        minNodes: 5,
        template: {
          metadata: {
            annotations: {},
            labels: {},
          },
          spec: {
            unschedulable: false,
          },
        },
      };

      mockRequestPromised.mockResolvedValue(mockResponse);

      const result = await service.scaleNodepool({
        projectId: "test-project-id",
        clusterId: "test-cluster-id",
        nodepoolId: "test-nodepool-id",
        numberOfNodes: 5,
      });

      expect(mockRequestPromised).toHaveBeenCalledWith(
        "PUT",
        "/cloud/project/test-project-id/kube/test-cluster-id/nodepool/test-nodepool-id",
        {
          autoscale: false,
          autoscaling: {},
          minNodes: 5,
          maxNodes: 5,
          desiredNodes: 5,
        }
      );

      expect(result).toEqual(mockResponse);
    });

    it("should handle API errors", async () => {
      const mockError = new Error("API Error");
      mockRequestPromised.mockRejectedValue(mockError);

      await expect(
        service.scaleNodepool({
          projectId: "test-project-id",
          clusterId: "test-cluster-id",
          nodepoolId: "test-nodepool-id",
          numberOfNodes: 3,
        })
      ).rejects.toThrow("API Error");

      expect(mockRequestPromised).toHaveBeenCalledWith(
        "PUT",
        "/cloud/project/test-project-id/kube/test-cluster-id/nodepool/test-nodepool-id",
        {
          autoscale: false,
          autoscaling: {},
          minNodes: 3,
          maxNodes: 3,
          desiredNodes: 3,
        }
      );
    });

    it("should work with different node counts", async () => {
      const mockResponse: NodepoolUpdateResponse = {
        autoscale: false,
        autoscaling: {},
        desiredNodes: 10,
        maxNodes: 10,
        minNodes: 10,
        template: {
          metadata: {},
          spec: {},
        },
      };

      mockRequestPromised.mockResolvedValue(mockResponse);

      await service.scaleNodepool({
        projectId: "project-123",
        clusterId: "cluster-456",
        nodepoolId: "nodepool-789",
        numberOfNodes: 10,
      });

      expect(mockRequestPromised).toHaveBeenCalledWith(
        "PUT",
        "/cloud/project/project-123/kube/cluster-456/nodepool/nodepool-789",
        {
          autoscale: false,
          autoscaling: {},
          minNodes: 10,
          maxNodes: 10,
          desiredNodes: 10,
        }
      );
    });
  });
});
