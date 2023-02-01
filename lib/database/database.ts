import { AttributeType, ProjectionType, Table } from "aws-cdk-lib/aws-dynamodb";
import { Construct } from "constructs";

export class Database extends Construct {
  readonly invertedIndexArn: string;

  readonly invertedIndexName: string;

  readonly tableArn: string;

  readonly tableName: string;

  constructor(scope: Construct, id: string) {
    super(scope, id);

    const table = new Table(this, `${id}-table`, {
      partitionKey: { name: "PK", type: AttributeType.STRING },
      sortKey: { name: "SK", type: AttributeType.STRING },
    });

    this.invertedIndexName = `${id}-inverted-index`;

    table.addGlobalSecondaryIndex({
      indexName: this.invertedIndexName,
      partitionKey: { name: "SK", type: AttributeType.STRING },
      sortKey: { name: "PK", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    table.addGlobalSecondaryIndex({
      indexName: `${id}-key-index`,
      partitionKey: { name: "key", type: AttributeType.STRING },
      projectionType: ProjectionType.ALL,
    });

    this.tableArn = table.tableArn;

    this.invertedIndexArn = `${this.tableArn}/index/${this.invertedIndexName}`;

    this.tableName = table.tableName;
  }
}
