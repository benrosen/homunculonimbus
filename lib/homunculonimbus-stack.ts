import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { Api } from "./api";
import { Database } from "./database";

export class HomunculonimbusStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const database = new Database(this, `${id}-database`);

    const api = new Api(this, `${id}-api`, database);
  }
}
