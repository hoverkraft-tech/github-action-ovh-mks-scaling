import * as core from "@actions/core";
import { InputService, InputNames } from "./input.service";

describe("InputService", () => {
  let service: InputService;
  let getInputMock: jest.SpiedFunction<typeof core.getInput>;

  beforeEach(() => {
    jest.clearAllMocks();
    getInputMock = jest.spyOn(core, "getInput").mockImplementation();
    service = new InputService();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe("getInputs", () => {
    describe("endpoint", () => {
      it("should return given endpoint input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.Endpoint:
              return "ovh-eu";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.endpoint).toEqual("ovh-eu");
      });

      it("should return null when no endpoint input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.Endpoint:
              return "";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.endpoint).toBeNull();
      });
    });

    describe("app-key", () => {
      it("should return given app-key input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.AppKey:
              return "test-app-key";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.appKey).toEqual("test-app-key");
      });

      it("should return null when no app-key input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.AppKey:
              return "";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.appKey).toBeNull();
      });
    });

    describe("app-secret", () => {
      it("should return given app-secret input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.AppSecret:
              return "test-app-secret";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.appSecret).toEqual("test-app-secret");
      });

      it("should return null when no app-secret input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.AppSecret:
              return "";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.appSecret).toBeNull();
      });
    });

    describe("consumer-key", () => {
      it("should return given consumer-key input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ConsumerKey:
              return "test-consumer-key";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.consumerKey).toEqual("test-consumer-key");
      });

      it("should return null when no consumer-key input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ConsumerKey:
              return "";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.consumerKey).toBeNull();
      });
    });

    describe("client-id", () => {
      it("should return given client-id input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ClientId:
              return "test-client-id";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.clientId).toEqual("test-client-id");
      });

      it("should return null when no client-id input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ClientId:
              return "";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.clientId).toBeNull();
      });
    });

    describe("client-secret", () => {
      it("should return given client-secret input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ClientSecret:
              return "test-client-secret";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.clientSecret).toEqual("test-client-secret");
      });

      it("should return null when no client-secret input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ClientSecret:
              return "";
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.clientSecret).toBeNull();
      });
    });

    describe("project-id", () => {
      it("should return given project-id input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.projectId).toEqual("project-123");
      });

      it("should throw an error when no project-id input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              throw new Error("Input required and not supplied: project-id");
            default:
              return "";
          }
        });

        expect(() => service.getInputs()).toThrow("Input required and not supplied: project-id");
      });
    });

    describe("cluster-id", () => {
      it("should return given cluster-id input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.clusterId).toEqual("cluster-123");
      });

      it("should throw an error when no cluster-id input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              throw new Error("Input required and not supplied: cluster-id");
            default:
              return "";
          }
        });

        expect(() => service.getInputs()).toThrow("Input required and not supplied: cluster-id");
      });
    });

    describe("nodepool-id", () => {
      it("should return given nodepool-id input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.nodepoolId).toEqual("nodepool-456");
      });

      it("should throw an error when no nodepool-id input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              throw new Error("Input required and not supplied: nodepool-id");
            default:
              return "";
          }
        });

        expect(() => service.getInputs()).toThrow("Input required and not supplied: nodepool-id");
      });
    });

    describe("number-of-nodes", () => {
      it("should return given number-of-nodes input as number", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "3";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.numberOfNodes).toEqual(3);
      });

      it("should throw an error when no number-of-nodes input", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              throw new Error("Input required and not supplied: number-of-nodes");
            default:
              return "";
          }
        });

        expect(() => service.getInputs()).toThrow(
          "Input required and not supplied: number-of-nodes"
        );
      });

      it("should return NaN when number-of-nodes is not a valid number", () => {
        getInputMock.mockImplementation((inputName) => {
          switch (inputName) {
            case InputNames.ProjectId:
              return "project-123";
            case InputNames.ClusterId:
              return "cluster-123";
            case InputNames.NodepoolId:
              return "nodepool-456";
            case InputNames.NumberOfNodes:
              return "invalid-number";
            default:
              return "";
          }
        });

        const inputs = service.getInputs();

        expect(inputs.numberOfNodes).toBeNaN();
      });
    });
  });
});
