/**
 * Don't edit this file manually.
 * Instead, regenerate it using the 'codegen' script in package.json.
 * For more information, see https://the-guild.dev/graphql/codegen/docs/getting-started
 */

export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type BooleanInstanceMatcher = {
  equals?: InputMaybe<Scalars['Boolean']>;
};

export type BooleanReducer = {
  mostCommon?: Maybe<Scalars['Boolean']>;
};

export type Count = {
  total?: Maybe<Scalars['Int']>;
  unique?: Maybe<Scalars['Int']>;
};

export type CreateEdgeCollectionRequest = {
  from?: InputMaybe<Array<InputMaybe<CreateEdgeInstance>>>;
};

export type CreateEdgeInstance = {
  features?: InputMaybe<CreateFeatureCollectionRequest>;
  nodes?: InputMaybe<CreateEdgeNodeInstance>;
};

export type CreateEdgeNodeInstance = {
  destination?: InputMaybe<CreateNodeInstance>;
  origin?: InputMaybe<CreateNodeInstance>;
};

export type CreateFeatureCollectionRequest = {
  from?: InputMaybe<Array<InputMaybe<CreateFeatureInstance>>>;
};

export type CreateFeatureInstance = {
  edges?: InputMaybe<CreateEdgeCollectionRequest>;
  key?: InputMaybe<Scalars['String']>;
  nodes?: InputMaybe<CreateNodeCollectionRequest>;
  value?: InputMaybe<Scalars['String']>;
};

export type CreateNodeCollectionRequest = {
  from?: InputMaybe<Array<InputMaybe<CreateNodeInstance>>>;
};

export type CreateNodeEdgeInstance = {
  inbound?: InputMaybe<CreateEdgeCollectionRequest>;
  outbound?: InputMaybe<CreateEdgeCollectionRequest>;
};

export type CreateNodeInstance = {
  edges?: InputMaybe<CreateNodeEdgeInstance>;
  features?: InputMaybe<CreateFeatureCollectionRequest>;
};

export type CreateResponse = {
  created: MutationResponse;
};

export type DeleteResponse = {
  deleted?: Maybe<MutationResponse>;
};

export type Edge = {
  features: FeaturesResponse;
  id: Scalars['ID'];
  nodes?: Maybe<EdgeNodes>;
};


export type EdgeFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesRequest>;
};

export type EdgeCollectionMatcher = {
  any?: InputMaybe<EdgeInstanceMatcher>;
  every?: InputMaybe<EdgeInstanceMatcher>;
  none?: InputMaybe<EdgeInstanceMatcher>;
};

export type EdgeCollectionSorter = {
  count?: InputMaybe<FloatSortingOrder>;
  features?: InputMaybe<FeatureCollectionSorter>;
  id?: InputMaybe<StringInstanceSorter>;
  nodes?: InputMaybe<EdgeNodeInstanceSorter>;
};

export type EdgeInstanceMatcher = {
  and?: InputMaybe<Array<InputMaybe<EdgeInstanceMatcher>>>;
  features?: InputMaybe<FeatureCollectionMatcher>;
  id?: InputMaybe<StringInstanceMatcher>;
  nodes?: InputMaybe<EdgeNodeInstanceMatcher>;
  not?: InputMaybe<Array<InputMaybe<EdgeInstanceMatcher>>>;
  or?: InputMaybe<Array<InputMaybe<EdgeInstanceMatcher>>>;
};

export type EdgeInstanceSorter = {
  features?: InputMaybe<FeatureCollectionSorter>;
  id?: InputMaybe<StringInstanceSorter>;
  nodes?: InputMaybe<EdgeNodeInstanceSorter>;
};

export type EdgeNodeInstanceMatcher = {
  destination?: InputMaybe<NodeInstanceMatcher>;
  origin?: InputMaybe<NodeInstanceMatcher>;
};

export type EdgeNodeInstanceSorter = {
  destination?: InputMaybe<NodeInstanceSorter>;
  origin?: InputMaybe<NodeInstanceSorter>;
};

export type EdgeNodes = {
  destination: Node;
  origin: Node;
};

export type EdgeNodesResponseReducer = {
  destination?: Maybe<NodesResponseReducer>;
  origin?: Maybe<NodesResponseReducer>;
};


export type EdgeNodesResponseReducerDestinationArgs = {
  select?: InputMaybe<SelectNodesRequest>;
};


export type EdgeNodesResponseReducerOriginArgs = {
  select?: InputMaybe<SelectNodesRequest>;
};

export type EdgesResponse = {
  calculate?: Maybe<EdgesResponseReducer>;
  enumerate?: Maybe<Array<Maybe<Edge>>>;
};

export type EdgesResponseReducer = {
  count?: Maybe<Count>;
  features?: Maybe<FeaturesResponseReducer>;
  nodes?: Maybe<EdgeNodesResponseReducer>;
};


export type EdgesResponseReducerFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesRequest>;
};

export type Feature = {
  edges?: Maybe<EdgesResponse>;
  id: Scalars['String'];
  key: Scalars['String'];
  nodes: NodesResponse;
  value: Scalars['String'];
};


export type FeatureEdgesArgs = {
  select?: InputMaybe<SelectEdgesRequest>;
};


export type FeatureNodesArgs = {
  select?: InputMaybe<SelectNodesRequest>;
};

export type FeatureCollectionMatcher = {
  any?: InputMaybe<FeatureInstanceMatcher>;
  every?: InputMaybe<FeatureInstanceMatcher>;
  none?: InputMaybe<FeatureInstanceMatcher>;
};

export type FeatureCollectionSorter = {
  count?: InputMaybe<FloatSortingOrder>;
  edges?: InputMaybe<EdgeCollectionSorter>;
  id?: InputMaybe<StringInstanceSorter>;
  key?: InputMaybe<StringInstanceSorter>;
  nodes?: InputMaybe<NodeCollectionSorter>;
  value?: InputMaybe<FeatureValueInstanceSorter>;
};

export type FeatureInstanceMatcher = {
  and?: InputMaybe<Array<InputMaybe<FeatureInstanceMatcher>>>;
  edges?: InputMaybe<EdgeCollectionMatcher>;
  id?: InputMaybe<StringInstanceMatcher>;
  key?: InputMaybe<StringInstanceMatcher>;
  nodes?: InputMaybe<NodeCollectionMatcher>;
  not?: InputMaybe<Array<InputMaybe<FeatureInstanceMatcher>>>;
  or?: InputMaybe<Array<InputMaybe<FeatureInstanceMatcher>>>;
  value?: InputMaybe<FeatureValueInstanceMatcher>;
};

export type FeatureInstanceSorter = {
  edges?: InputMaybe<EdgeCollectionSorter>;
  id?: InputMaybe<StringInstanceSorter>;
  key?: InputMaybe<StringInstanceSorter>;
  nodes?: InputMaybe<NodeCollectionSorter>;
  value?: InputMaybe<FeatureValueInstanceSorter>;
};

export type FeatureKeyReducer = {
  mostCommon?: Maybe<Scalars['String']>;
};

export type FeatureValueInstanceMatcher = {
  asBoolean?: InputMaybe<BooleanInstanceMatcher>;
  asFloat?: InputMaybe<FloatInstanceMatcher>;
  asString?: InputMaybe<StringInstanceMatcher>;
  asTimestamp?: InputMaybe<TimestampInstanceMatcher>;
};

export type FeatureValueInstanceSorter = {
  asFloat?: InputMaybe<FloatSortingOrder>;
  asString?: InputMaybe<StringInstanceSorter>;
  asTimestamp?: InputMaybe<TimestampSortingOrder>;
};

export type FeatureValueReducer = {
  asBoolean?: Maybe<BooleanReducer>;
  asFloat?: Maybe<FloatReducer>;
  asString?: Maybe<StringReducer>;
  asTimestamp?: Maybe<TimestampReducer>;
};

export type FeaturesResponse = {
  calculate?: Maybe<FeaturesResponseReducer>;
  enumerate?: Maybe<Array<Maybe<Feature>>>;
};

export type FeaturesResponseReducer = {
  count?: Maybe<Count>;
  edges?: Maybe<EdgesResponseReducer>;
  key?: Maybe<FeatureKeyReducer>;
  nodes?: Maybe<NodesResponseReducer>;
  value?: Maybe<FeatureValueReducer>;
};


export type FeaturesResponseReducerEdgesArgs = {
  select?: InputMaybe<SelectEdgesRequest>;
};


export type FeaturesResponseReducerNodesArgs = {
  select?: InputMaybe<SelectNodesRequest>;
};

export type FloatInstanceMatcher = {
  equals?: InputMaybe<Scalars['Float']>;
  isGreaterThan?: InputMaybe<Scalars['Float']>;
  isGreaterThanOrEqualTo?: InputMaybe<Scalars['Float']>;
  isLessThan?: InputMaybe<Scalars['Float']>;
  isLessThanOrEqualTo?: InputMaybe<Scalars['Float']>;
};

export type FloatReducer = {
  maximum?: Maybe<Scalars['Float']>;
  mean?: Maybe<Scalars['Float']>;
  median?: Maybe<Scalars['Float']>;
  minimum?: Maybe<Scalars['Float']>;
  mode?: Maybe<Scalars['Float']>;
  total?: Maybe<Scalars['Float']>;
};

export enum FloatSortingOrder {
  LargestToSmallest = 'largestToSmallest',
  SmallestToLargest = 'smallestToLargest'
}

export type Mutation = {
  __typename?: 'Mutation';
  create: CreateResponse;
  delete: DeleteResponse;
};


export type MutationCreateArgs = {
  edges?: InputMaybe<CreateEdgeCollectionRequest>;
  features?: InputMaybe<CreateFeatureCollectionRequest>;
  nodes?: InputMaybe<CreateNodeCollectionRequest>;
};


export type MutationDeleteArgs = {
  edges?: InputMaybe<SelectEdgesRequest>;
  features?: InputMaybe<SelectFeaturesRequest>;
  nodes?: InputMaybe<SelectNodesRequest>;
};

export type MutationResponse = {
  edges: EdgesResponse;
  features: FeaturesResponse;
  nodes: NodesResponse;
};


export type MutationResponseEdgesArgs = {
  select?: InputMaybe<SelectEdgesRequest>;
};


export type MutationResponseFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesRequest>;
};


export type MutationResponseNodesArgs = {
  select?: InputMaybe<SelectNodesRequest>;
};

export type Node = {
  edges: NodeEdges;
  features: FeaturesResponse;
  id: Scalars['ID'];
};


export type NodeFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesRequest>;
};

export type NodeCollectionMatcher = {
  any?: InputMaybe<NodeInstanceMatcher>;
  every?: InputMaybe<NodeInstanceMatcher>;
  none?: InputMaybe<NodeInstanceMatcher>;
};

export type NodeCollectionSorter = {
  count?: InputMaybe<FloatSortingOrder>;
  edges?: InputMaybe<NodeEdgeInstanceSorter>;
  features?: InputMaybe<FeatureCollectionSorter>;
  id?: InputMaybe<StringInstanceSorter>;
};

export type NodeEdgeCollectionMatcher = {
  inbound?: InputMaybe<EdgeCollectionMatcher>;
  outbound?: InputMaybe<EdgeCollectionMatcher>;
};

export type NodeEdgeInstanceSorter = {
  inbound?: InputMaybe<EdgeCollectionSorter>;
  outbound?: InputMaybe<EdgeCollectionSorter>;
};

export type NodeEdges = {
  inbound?: Maybe<EdgesResponse>;
  outbound?: Maybe<EdgesResponse>;
};


export type NodeEdgesInboundArgs = {
  select?: InputMaybe<SelectEdgesRequest>;
};


export type NodeEdgesOutboundArgs = {
  select?: InputMaybe<SelectEdgesRequest>;
};

export type NodeEdgesResponseReducer = {
  inbound?: Maybe<EdgesResponseReducer>;
  outbound?: Maybe<EdgesResponseReducer>;
};


export type NodeEdgesResponseReducerInboundArgs = {
  select?: InputMaybe<SelectEdgesRequest>;
};


export type NodeEdgesResponseReducerOutboundArgs = {
  select?: InputMaybe<SelectEdgesRequest>;
};

export type NodeInstanceMatcher = {
  and?: InputMaybe<Array<InputMaybe<NodeInstanceMatcher>>>;
  edges?: InputMaybe<NodeEdgeCollectionMatcher>;
  features?: InputMaybe<FeatureCollectionMatcher>;
  id?: InputMaybe<StringInstanceMatcher>;
  not?: InputMaybe<Array<InputMaybe<NodeInstanceMatcher>>>;
  or?: InputMaybe<Array<InputMaybe<NodeInstanceMatcher>>>;
};

export type NodeInstanceSorter = {
  edges?: InputMaybe<NodeEdgeInstanceSorter>;
  features?: InputMaybe<FeatureCollectionSorter>;
  id?: InputMaybe<StringInstanceSorter>;
};

export type NodesResponse = {
  calculate?: Maybe<NodesResponseReducer>;
  enumerate?: Maybe<Array<Maybe<Node>>>;
};

export type NodesResponseReducer = {
  count?: Maybe<Count>;
  edges?: Maybe<NodeEdgesResponseReducer>;
  features?: Maybe<FeaturesResponseReducer>;
};


export type NodesResponseReducerFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesRequest>;
};

export type Query = {
  __typename?: 'Query';
  edges: EdgesResponse;
  features: FeaturesResponse;
  nodes: NodesResponse;
};


export type QueryEdgesArgs = {
  select?: InputMaybe<SelectEdgesRequest>;
};


export type QueryFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesRequest>;
};


export type QueryNodesArgs = {
  select?: InputMaybe<SelectNodesRequest>;
};

export type SelectEdgesRequest = {
  by?: InputMaybe<EdgeInstanceSorter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<EdgeInstanceMatcher>;
};

export type SelectFeaturesRequest = {
  by?: InputMaybe<FeatureInstanceSorter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<FeatureInstanceMatcher>;
};

export type SelectNodesRequest = {
  by?: InputMaybe<NodeInstanceSorter>;
  limit?: InputMaybe<Scalars['Int']>;
  offset?: InputMaybe<Scalars['Int']>;
  where?: InputMaybe<NodeInstanceMatcher>;
};

export type StringInstanceMatcher = {
  contains?: InputMaybe<Scalars['String']>;
  endsWith?: InputMaybe<Scalars['String']>;
  equals?: InputMaybe<Scalars['String']>;
  startsWith?: InputMaybe<Scalars['String']>;
};

export type StringInstanceSorter = {
  alphabetical?: InputMaybe<StringSortingOrder>;
  length?: InputMaybe<FloatSortingOrder>;
};

export type StringReducer = {
  longest?: Maybe<Scalars['String']>;
  mostCommon?: Maybe<Scalars['String']>;
  shortest?: Maybe<Scalars['String']>;
};

export enum StringSortingOrder {
  AToZ = 'aToZ',
  ZToA = 'zToA'
}

export type TimestampInstanceMatcher = {
  equals?: InputMaybe<Scalars['Int']>;
  isGreaterThan?: InputMaybe<Scalars['Int']>;
  isGreaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  isLessThan?: InputMaybe<Scalars['Int']>;
  isLessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
};

export type TimestampReducer = {
  maximum?: Maybe<Scalars['Int']>;
  mean?: Maybe<Scalars['Int']>;
  median?: Maybe<Scalars['Int']>;
  minimum?: Maybe<Scalars['Int']>;
  mode?: Maybe<Scalars['Int']>;
  total?: Maybe<Scalars['Int']>;
};

export enum TimestampSortingOrder {
  NewestToOldest = 'newestToOldest',
  OldestToNewest = 'oldestToNewest'
}
