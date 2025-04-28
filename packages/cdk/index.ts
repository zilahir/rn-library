import "source-map-support/register";
import { App } from "aws-cdk-lib";
import {
  PikkuKirjastoEnvironment,
  PikkuKirjastoStack,
  PIKKURKIRJASTO,
} from "./stacks/stack";
import { StaticStack } from "./stacks/static";

const staticApp = new App();

type PikkurKirjastoAppConfig = {
  [key in PikkuKirjastoEnvironment]: {
    name: string;
  };
};

const appConfig: PikkurKirjastoAppConfig = {
  dev: {
    name: `${PIKKURKIRJASTO}-Dev`,
  },
  prod: {
    name: `${PIKKURKIRJASTO}-Prod`,
  },
};

new PikkuKirjastoStack(staticApp, appConfig["dev"].name, "dev", {
  stackName: appConfig["dev"].name,
  env: {
    region: "eu-west-1",
  },
});

new StaticStack(staticApp, "backend-codecov-static", ["backendcov"], {
  stackName: "backend-codecov-static",
  env: {
    account: "211516352043",
    region: "eu-west-1",
  },
});

new StaticStack(staticApp, "app-codecov-static", ["appcov"], {
  stackName: "app-codecov-static",
  env: {
    account: "211516352043",
    region: "eu-west-1",
  },
});

new StaticStack(staticApp, "backend-docs-static", ["docs"], {
  stackName: "backend-docs-static",
  env: {
    account: "211516352043",
    region: "eu-west-1",
  },
});

new StaticStack(staticApp, "app-jsdocs-static", ["jsdocs"], {
  stackName: "app-jsdocs-static",
  env: {
    account: "211516352043",
    region: "eu-west-1",
  },
});
