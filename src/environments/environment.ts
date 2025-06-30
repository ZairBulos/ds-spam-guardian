import { env } from "node:process";
import type { Environment } from "./types";

const NODE_ENV = env.NODE_ENV ?? "development";
let environment: Environment;

if (NODE_ENV === "production") {
  environment = require("./environment.prod").default;
} else {
  environment = require("./environment.dev").default;
}

export default environment;
