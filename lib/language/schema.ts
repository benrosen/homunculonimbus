/**
 * # Don't edit this file manually.
 * Instead, regenerate it using the 'codegen' script in package.json.
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

/** Descriptions of booleans. */
export type BooleansMetadata = {
  /** The most common boolean value. */
  mostCommon?: Maybe<Scalars['Boolean']>;
};

/** Describes quantities of items. */
export type Count = {
  /** The total number of items. */
  total?: Maybe<Scalars['Int']>;
  /** The number of unique items. */
  unique?: Maybe<Scalars['Int']>;
};

/** Describes features and nodes that should be created and connected to the newly created edge. */
export type CreateEdgeInput = {
  /** Descriptions of features that should be created and attached to the newly created edge. */
  features?: InputMaybe<CreateFeaturesInput>;
  /** Descriptions of nodes that should be created and attached to the newly created edge. */
  nodes?: InputMaybe<CreateEdgeNodeInput>;
};

/** Describes nodes that should be created and connected to the newly created edge. */
export type CreateEdgeNodeInput = {
  /** A description of the node that should be created at the origin point of the newly created edge. */
  origin?: InputMaybe<CreateNodeInput>;
  /** A description of the node that should be created at the termination point of the newly created edge. */
  termination?: InputMaybe<CreateNodeInput>;
};

/** Describes edges that should be created. */
export type CreateEdgesInput = {
  /** Descriptions of edges that should be created. */
  from?: InputMaybe<Array<InputMaybe<CreateEdgeInput>>>;
};

/** Describes a feature that should be created. */
export type CreateFeatureInput = {
  /** Descriptions of edges that should be created and attached to the newly created feature. */
  edges?: InputMaybe<CreateEdgesInput>;
  /** The key that should be used for the newly created feature. */
  key: Scalars['String'];
  /** Descriptions of nodes that should be created and attached to the newly created feature. */
  nodes?: InputMaybe<CreateNodesInput>;
  /** The value that should be used for the newly created feature. */
  value: Scalars['String'];
};

/** Describes features that should be created. */
export type CreateFeaturesInput = {
  /** Descriptions of features that should be created. */
  from?: InputMaybe<Array<InputMaybe<CreateFeatureInput>>>;
};

/** Describes edges that should be created and connected to the newly created node. */
export type CreateNodeEdgeInput = {
  /** Descriptions of edges that should originate from the newly created edge. */
  inbound?: InputMaybe<CreateEdgesInput>;
  /** Descriptions of edges that should terminate at the newly created edge. */
  outbound?: InputMaybe<CreateEdgesInput>;
};

/** Describes a node that should be created. */
export type CreateNodeInput = {
  /** Descriptions of edges that should be created and attached to the newly created node. */
  edges?: InputMaybe<CreateNodeEdgeInput>;
  /** Descriptions of features that should be created and attached to the newly created node. */
  features?: InputMaybe<CreateFeaturesInput>;
};

/** Describes nodes that should be created. */
export type CreateNodesInput = {
  /** Descriptions of nodes that should be created. */
  from?: InputMaybe<Array<InputMaybe<CreateNodeInput>>>;
};

/** Records that were created. */
export type CreatedRecords = {
  /** Created records. */
  created: MutatedRecords;
};

/** Records that were deleted. */
export type DeletedRecords = {
  /** Deleted records. */
  deleted?: Maybe<MutatedRecords>;
};

/** A uniquely-identified directional connection between two nodes that may be associated with an arbitrary number of features. */
export type Edge = {
  /** Features associated with this edge. */
  features: Features;
  /** A unique identifier for this edge. */
  id: Scalars['ID'];
  /** Nodes connected to either end of this edge. */
  nodes?: Maybe<EdgeNodes>;
};


/** A uniquely-identified directional connection between two nodes that may be associated with an arbitrary number of features. */
export type EdgeFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesInput>;
};

/** Two nodes connected by an edge. */
export type EdgeNodes = {
  /** The node at the origin (start) of the edge. */
  origin: Node;
  /** The node at the termination (end) of the edge. */
  termination: Node;
};

/** Descriptions of edge-connected nodes. */
export type EdgeNodesMetadata = {
  /** Metadata that describes origin nodes. */
  origin?: Maybe<NodesMetadata>;
  /** Metadata that describes termination nodes. */
  termination?: Maybe<NodesMetadata>;
};


/** Descriptions of edge-connected nodes. */
export type EdgeNodesMetadataOriginArgs = {
  select?: InputMaybe<SelectNodesInput>;
};


/** Descriptions of edge-connected nodes. */
export type EdgeNodesMetadataTerminationArgs = {
  select?: InputMaybe<SelectNodesInput>;
};

/** A collection of edges. */
export type Edges = {
  /** Metadata that describes the collection of edges. */
  calculate?: Maybe<EdgesMetadata>;
  /** The collection of edges. */
  enumerate?: Maybe<Array<Maybe<Edge>>>;
};

/** A description of a collection of edges. */
export type EdgesMetadata = {
  /** Metadata that describes quantities of edges. */
  count?: Maybe<Count>;
  /** Metadata that describes edge features. */
  features?: Maybe<FeaturesMetadata>;
  /** Metadata that describes edge nodes. */
  nodes?: Maybe<EdgeNodesMetadata>;
};


/** A description of a collection of edges. */
export type EdgesMetadataFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesInput>;
};

/** A key-value pair that can be associated with one or more edges and/or nodes. */
export type Feature = {
  /** Edges associated with this feature. */
  edges?: Maybe<Edges>;
  /** A unique identifier for this feature. */
  id: Scalars['String'];
  /** A label for this feature. */
  key: Scalars['String'];
  /** Nodes associated with this feature. */
  nodes: Nodes;
  /** The value of this feature. */
  value: Scalars['String'];
};


/** A key-value pair that can be associated with one or more edges and/or nodes. */
export type FeatureEdgesArgs = {
  select?: InputMaybe<SelectEdgesInput>;
};


/** A key-value pair that can be associated with one or more edges and/or nodes. */
export type FeatureNodesArgs = {
  select?: InputMaybe<SelectNodesInput>;
};

/** A description of a collection of feature keys. */
export type FeatureKeysMetadata = {
  /** The most common feature key value. */
  mostCommon?: Maybe<Scalars['String']>;
};

/** A description of a collection of feature values. */
export type FeatureValuesMetadata = {
  /** Treat the feature values as booleans. */
  asBoolean?: Maybe<BooleansMetadata>;
  /** Treat the feature values as floats. */
  asFloat?: Maybe<FloatsMetadata>;
  /** Treat the feature values as strings. */
  asString?: Maybe<StringsMetadata>;
  /** Treat the feature values as timestamps. */
  asTimestamp?: Maybe<TimestampsMetadata>;
};

/** A collection of features. */
export type Features = {
  /** Metadata that describes the collection of features. */
  calculate?: Maybe<FeaturesMetadata>;
  /** The collection of features. */
  enumerate?: Maybe<Array<Maybe<Feature>>>;
};

/** A description of a collection of features. */
export type FeaturesMetadata = {
  /** Metadata that describes quantities of features. */
  count?: Maybe<Count>;
  /** Metadata that describes feature edges. */
  edges?: Maybe<EdgesMetadata>;
  /** Metadata that describes feature keys. */
  key?: Maybe<FeatureKeysMetadata>;
  /** Metadata that describes feature nodes. */
  nodes?: Maybe<NodesMetadata>;
  /** Metadata that describes feature values. */
  value?: Maybe<FeatureValuesMetadata>;
};


/** A description of a collection of features. */
export type FeaturesMetadataEdgesArgs = {
  select?: InputMaybe<SelectEdgesInput>;
};


/** A description of a collection of features. */
export type FeaturesMetadataNodesArgs = {
  select?: InputMaybe<SelectNodesInput>;
};

/** Describes how a collection of float values should be sorted. */
export enum FloatSortingOrder {
  /** `Float` values should be sorted in descending order. */
  LargestToSmallest = 'LargestToSmallest',
  /** `Float` values should be sorted in ascending order. */
  SmallestToLargest = 'SmallestToLargest'
}

/** A description of a collection of floats. */
export type FloatsMetadata = {
  /** The maximum float value. */
  maximum?: Maybe<Scalars['Float']>;
  /** The mean float value. */
  mean?: Maybe<Scalars['Float']>;
  /** The median float value. */
  median?: Maybe<Scalars['Float']>;
  /** The minimum float value. */
  minimum?: Maybe<Scalars['Float']>;
  /** The mode float value. */
  mode?: Maybe<Scalars['Float']>;
};

/** Describes matching criteria for booleans. */
export type MatchBooleanInput = {
  /** Match boolean values that equal the value of this property. */
  equals?: InputMaybe<Scalars['Boolean']>;
};

/** Describes matching criteria for edges. */
export type MatchEdgeInput = {
  /** Match edges that meet all of these criteria. */
  and?: InputMaybe<Array<InputMaybe<MatchEdgeInput>>>;
  /** Match edges with features that meet these criteria. */
  features?: InputMaybe<MatchFeaturesInput>;
  /** Match edges with ids that meet these criteria. */
  id?: InputMaybe<MatchStringInput>;
  /** Match edges with nodes that meet these criteria. */
  nodes?: InputMaybe<MatchEdgeNodeInput>;
  /** Match edges that meet none of these criteria. */
  not?: InputMaybe<Array<InputMaybe<MatchEdgeInput>>>;
  /** Match edges that meet any of these criteria. */
  or?: InputMaybe<Array<InputMaybe<MatchEdgeInput>>>;
};

/** Describes matching criteria for edge nodes. */
export type MatchEdgeNodeInput = {
  /** Match edges with origin nodes that meet these criteria. */
  origin?: InputMaybe<MatchNodeInput>;
  /** Match edges with termination nodes that meet these criteria. */
  termination?: InputMaybe<MatchNodeInput>;
};

/** Describes matching criteria for collections of edges. */
export type MatchEdgesInput = {
  /** Match collections of edges where any edge meets these criteria. */
  any?: InputMaybe<MatchEdgeInput>;
  /** Match collections of edges where every edge meets these criteria. */
  every?: InputMaybe<MatchEdgeInput>;
  /** Match collections of edges where no edge meets these criteria. */
  none?: InputMaybe<MatchEdgeInput>;
};

/** Describes matching criteria for features. */
export type MatchFeatureInput = {
  /** Match features that meet all of these criteria. */
  and?: InputMaybe<Array<InputMaybe<MatchFeatureInput>>>;
  /** Match features with edges that meet these criteria. */
  edges?: InputMaybe<MatchEdgesInput>;
  /** Match features with ids that meet these criteria. */
  id?: InputMaybe<MatchStringInput>;
  /** Match edges with keys that meet these criteria. */
  key?: InputMaybe<MatchStringInput>;
  /** Match features with nodes that meet these criteria. */
  nodes?: InputMaybe<MatchNodesInput>;
  /** Match features that meet none of these criteria. */
  not?: InputMaybe<Array<InputMaybe<MatchFeatureInput>>>;
  /** Match features that meet any of these criteria. */
  or?: InputMaybe<Array<InputMaybe<MatchFeatureInput>>>;
  /** Match edges with values that meet these criteria. */
  value?: InputMaybe<MatchFeatureValueInput>;
};

/** Describes matching criteria for feature values. */
export type MatchFeatureValueInput = {
  /** Treat the feature value as a boolean. */
  asBoolean?: InputMaybe<MatchBooleanInput>;
  /** Treat the feature value as a float. */
  asFloat?: InputMaybe<MatchFloatInput>;
  /** Treat the feature value as a string. */
  asString?: InputMaybe<MatchStringInput>;
  /** Treat the feature value as a timestamp. */
  asTimestamp?: InputMaybe<MatchTimestampInput>;
};

/** Describes matching criteria for collections of features. */
export type MatchFeaturesInput = {
  /** Match collections of features where any feature meets these criteria. */
  any?: InputMaybe<MatchFeatureInput>;
  /** Match collections of features where every feature meets these criteria. */
  every?: InputMaybe<MatchFeatureInput>;
  /** Match collections of features where no feature meets these criteria. */
  none?: InputMaybe<MatchFeatureInput>;
};

/** Describes matching criteria for floats. */
export type MatchFloatInput = {
  /** Match float values that equal the value of this property. */
  equals?: InputMaybe<Scalars['Float']>;
  /** Match boolean values that are greater than the value of this property. */
  isGreaterThan?: InputMaybe<Scalars['Float']>;
  /** Match boolean values that are greater than or equal to the value of this property. */
  isGreaterThanOrEqualTo?: InputMaybe<Scalars['Float']>;
  /** Match boolean values that are less than the value of this property. */
  isLessThan?: InputMaybe<Scalars['Float']>;
  /** Match boolean values that are less than or equal to the value of this property. */
  isLessThanOrEqualTo?: InputMaybe<Scalars['Float']>;
};

/** Describes matching criteria for node edges. */
export type MatchNodeEdgesInput = {
  /** Match nodes with inbound edges that meet these criteria. */
  inbound?: InputMaybe<MatchEdgesInput>;
  /** Match nodes with outbound edges that meet these criteria. */
  outbound?: InputMaybe<MatchEdgesInput>;
};

/** Describes matching criteria for nodes. */
export type MatchNodeInput = {
  /** Match nodes that meet all of these criteria. */
  and?: InputMaybe<Array<InputMaybe<MatchNodeInput>>>;
  /** Match nodes with edges that meet these criteria. */
  edges?: InputMaybe<MatchNodeEdgesInput>;
  /** Match nodes with features that meet these criteria. */
  features?: InputMaybe<MatchFeaturesInput>;
  /** Match nodes with ids that meet these criteria. */
  id?: InputMaybe<MatchStringInput>;
  /** Match nodes that meet none of these criteria. */
  not?: InputMaybe<Array<InputMaybe<MatchNodeInput>>>;
  /** Match nodes that meet any of these criteria. */
  or?: InputMaybe<Array<InputMaybe<MatchNodeInput>>>;
};

/** Describes matching criteria for collections of nodes. */
export type MatchNodesInput = {
  /** Match collections of nodes where any node meets these criteria. */
  any?: InputMaybe<MatchNodeInput>;
  /** Match collections of nodes where every node meets these criteria. */
  every?: InputMaybe<MatchNodeInput>;
  /** Match collections of nodes where no node meets these criteria. */
  none?: InputMaybe<MatchNodeInput>;
};

/** Describes matching criteria for strings. */
export type MatchStringInput = {
  /** Match string values that contain the value of this property. */
  contains?: InputMaybe<Scalars['String']>;
  /** Match string values that end with the value of this property. */
  endsWith?: InputMaybe<Scalars['String']>;
  /** Match string values that equal the value of this property. */
  equals?: InputMaybe<Scalars['String']>;
  /** Match string values that start with the value of this property. */
  startsWith?: InputMaybe<Scalars['String']>;
};

/** Describes matching criteria for timestamps. */
export type MatchTimestampInput = {
  /** Match timestamp values that equal the value of this property. */
  equals?: InputMaybe<Scalars['Int']>;
  /** Match timestamp values that are greater than the value of this property. */
  isGreaterThan?: InputMaybe<Scalars['Int']>;
  /** Match timestamp values that are greater than or equal to the value of this property. */
  isGreaterThanOrEqualTo?: InputMaybe<Scalars['Int']>;
  /** Match timestamp values that are less than the value of this property. */
  isLessThan?: InputMaybe<Scalars['Int']>;
  /** Match timestamp values that are less than or equal to the value of this property. */
  isLessThanOrEqualTo?: InputMaybe<Scalars['Int']>;
};

/** Records that changed. */
export type MutatedRecords = {
  /** Edges that changed. */
  edges: Edges;
  /** Features that changed. */
  features: Features;
  /** Nodes that changed. */
  nodes: Nodes;
};


/** Records that changed. */
export type MutatedRecordsEdgesArgs = {
  select?: InputMaybe<SelectEdgesInput>;
};


/** Records that changed. */
export type MutatedRecordsFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesInput>;
};


/** Records that changed. */
export type MutatedRecordsNodesArgs = {
  select?: InputMaybe<SelectNodesInput>;
};

export type Mutation = {
  __typename?: 'Mutation';
  /** Create edges, features, and/or nodes. */
  create: CreatedRecords;
  /** Delete edges, features, and/or nodes. */
  delete: DeletedRecords;
};


export type MutationCreateArgs = {
  edges?: InputMaybe<CreateEdgesInput>;
  features?: InputMaybe<CreateFeaturesInput>;
  nodes?: InputMaybe<CreateNodesInput>;
};


export type MutationDeleteArgs = {
  edges?: InputMaybe<SelectEdgesInput>;
  features?: InputMaybe<SelectFeaturesInput>;
  nodes?: InputMaybe<SelectNodesInput>;
};

/** A uniquely-identified entity that may be connected to other nodes via edges and/or associated with an arbitrary number of features. */
export type Node = {
  /** Edges connected to this node. */
  edges: NodeEdges;
  /** Features associated with this node. */
  features: Features;
  /** A unique identifier for this node. */
  id: Scalars['ID'];
};


/** A uniquely-identified entity that may be connected to other nodes via edges and/or associated with an arbitrary number of features. */
export type NodeFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesInput>;
};

/** Edges connected to a node. */
export type NodeEdges = {
  /** Edges that terminate (end) at this node. */
  inbound?: Maybe<Edges>;
  /** Edges that originate (start) at this node. */
  outbound?: Maybe<Edges>;
};


/** Edges connected to a node. */
export type NodeEdgesInboundArgs = {
  select?: InputMaybe<SelectEdgesInput>;
};


/** Edges connected to a node. */
export type NodeEdgesOutboundArgs = {
  select?: InputMaybe<SelectEdgesInput>;
};

/** Descriptions of edges connected to a node. */
export type NodeEdgesMetadata = {
  /** Metadata that describes edges that terminate (end) at this node. */
  inbound?: Maybe<EdgesMetadata>;
  /** Metadata that describes edges that originate (start) at this node. */
  outbound?: Maybe<EdgesMetadata>;
};


/** Descriptions of edges connected to a node. */
export type NodeEdgesMetadataInboundArgs = {
  select?: InputMaybe<SelectEdgesInput>;
};


/** Descriptions of edges connected to a node. */
export type NodeEdgesMetadataOutboundArgs = {
  select?: InputMaybe<SelectEdgesInput>;
};

/** A collection of nodes. */
export type Nodes = {
  /** Metadata that describes the collection of nodes. */
  calculate?: Maybe<NodesMetadata>;
  /** The collection of nodes. */
  enumerate?: Maybe<Array<Maybe<Node>>>;
};

/** A description of a collection of nodes. */
export type NodesMetadata = {
  /** Metadata that describes quantities of nodes. */
  count?: Maybe<Count>;
  /** Metadata that describes edges connected to this node. */
  edges?: Maybe<NodeEdgesMetadata>;
  /** Metadata that describes featuers associated with this node. */
  features?: Maybe<FeaturesMetadata>;
};


/** A description of a collection of nodes. */
export type NodesMetadataFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesInput>;
};

export type Query = {
  __typename?: 'Query';
  /** Query edges. */
  edges: Edges;
  /** Query features. */
  features: Features;
  /** Query nodes. */
  nodes: Nodes;
};


export type QueryEdgesArgs = {
  select?: InputMaybe<SelectEdgesInput>;
};


export type QueryFeaturesArgs = {
  select?: InputMaybe<SelectFeaturesInput>;
};


export type QueryNodesArgs = {
  select?: InputMaybe<SelectNodesInput>;
};

/** Describes matching, sorting, and pagination criteria for edges. */
export type SelectEdgesInput = {
  /** Sort matched edges by these criteria. */
  by?: InputMaybe<SortEdgeInput>;
  /** Select this many items from the sorted matched edges. */
  limit?: InputMaybe<Scalars['Int']>;
  /** Offset the selection of sorted matched edges by this many items. */
  offset?: InputMaybe<Scalars['Int']>;
  /** Match edges that meet these criteria. */
  where?: InputMaybe<MatchEdgeInput>;
};

/** Describes matching, sorting, and pagination criteria for features. */
export type SelectFeaturesInput = {
  /** Sort matched features by these criteria. */
  by?: InputMaybe<SortFeatureInput>;
  /** Select this many items from the sorted matched features. */
  limit?: InputMaybe<Scalars['Int']>;
  /** Offset the selection of sorted matched features by this many items. */
  offset?: InputMaybe<Scalars['Int']>;
  /** Match features that meet these criteria. */
  where?: InputMaybe<MatchFeatureInput>;
};

/** Describes matching, sorting, and pagination criteria for nodes. */
export type SelectNodesInput = {
  /** Sort matched nodes by these criteria. */
  by?: InputMaybe<SortNodeInput>;
  /** Select this many items from the sorted matched nodes. */
  limit?: InputMaybe<Scalars['Int']>;
  /** Offset the selection of sorted matched nodes by this many items. */
  offset?: InputMaybe<Scalars['Int']>;
  /** Match nodes that meet these criteria. */
  where?: InputMaybe<MatchNodeInput>;
};

/** Describes sorting criteria for edges. */
export type SortEdgeInput = {
  /** Sort edges by features. */
  features?: InputMaybe<SortFeaturesInput>;
  /** Sort edges by id. */
  id?: InputMaybe<SortStringsInput>;
  /** Sort edges by nodes. */
  nodes?: InputMaybe<SortEdgeNodesInput>;
};

/** Describes sorting criteria for edges nodes. */
export type SortEdgeNodesInput = {
  /** Sort edges by origin node. */
  origin?: InputMaybe<SortNodeInput>;
  /** Sort edges by termination node. */
  termination?: InputMaybe<SortNodeInput>;
};

/** Describes sorting criteria for collections of edges. */
export type SortEdgesInput = {
  /** Sort edge collections by count. */
  count?: InputMaybe<FloatSortingOrder>;
  /** Sort edge collections by features. */
  features?: InputMaybe<SortFeaturesInput>;
  /** Sort edge collections by id. */
  id?: InputMaybe<SortStringsInput>;
  /** Sort edge collections by nodes. */
  nodes?: InputMaybe<SortEdgeNodesInput>;
};

/** Describes sorting criteria for features. */
export type SortFeatureInput = {
  /** Sort features by edges. */
  edges?: InputMaybe<SortEdgesInput>;
  /** Sort features by id. */
  id?: InputMaybe<SortStringsInput>;
  /** Sort features by key. */
  key?: InputMaybe<SortStringsInput>;
  /** Sort features by node. */
  nodes?: InputMaybe<SortNodesInput>;
  /** Sort features by value. */
  value?: InputMaybe<SortFeatureValueInput>;
};

/** Describes sorting criteria for feature values. */
export type SortFeatureValueInput = {
  /** Treat the feature value as a float. */
  asFloat?: InputMaybe<FloatSortingOrder>;
  /** Treat the feature value as a string. */
  asString?: InputMaybe<SortStringsInput>;
  /** Treat the feature value as a timestamp. */
  asTimestamp?: InputMaybe<TimestampSortingOrder>;
};

/** Describes sorting criteria for collections of features. */
export type SortFeaturesInput = {
  /** Sort feature collections by count. */
  count?: InputMaybe<FloatSortingOrder>;
  /** Sort feature collections by edges. */
  edges?: InputMaybe<SortEdgesInput>;
  /** Sort feature collections by id. */
  id?: InputMaybe<SortStringsInput>;
  /** Sort feature collections by key. */
  key?: InputMaybe<SortStringsInput>;
  /** Sort feature collections by nodes. */
  nodes?: InputMaybe<SortNodesInput>;
  /** Sort feature collections by value. */
  value?: InputMaybe<SortFeatureValueInput>;
};

/** Describes sorting criteria for node edges. */
export type SortNodeEdgeInput = {
  /** Sort nodes by inbound edges. */
  inbound?: InputMaybe<SortEdgesInput>;
  /** Sort nodes by outbound edges. */
  outbound?: InputMaybe<SortEdgesInput>;
};

/** Describes sorting criteria for nodes. */
export type SortNodeInput = {
  /** Sort nodes by edges. */
  edges?: InputMaybe<SortNodeEdgeInput>;
  /** Sort nodes by features. */
  features?: InputMaybe<SortFeaturesInput>;
  /** Sort nodes by id. */
  id?: InputMaybe<SortStringsInput>;
};

/** Describes sorting criteria for collections of nodes. */
export type SortNodesInput = {
  /** Sort node collections by count. */
  count?: InputMaybe<FloatSortingOrder>;
  /** Sort node collections by edges. */
  edges?: InputMaybe<SortNodeEdgeInput>;
  /** Sort node collections by features. */
  features?: InputMaybe<SortFeaturesInput>;
  /** Sort node collections by id. */
  id?: InputMaybe<SortStringsInput>;
};

/** Describes sorting criteria for strings. */
export type SortStringsInput = {
  /** Sort strings alphabetically. */
  alphabetical?: InputMaybe<StringSortingOrder>;
  /** Sort strings by length. */
  length?: InputMaybe<FloatSortingOrder>;
};

/** Describes how a collection of string values should be sorted. */
export enum StringSortingOrder {
  /** `String` values should be sorted in alphabetical order. */
  AToZ = 'AToZ',
  /** `String` values should be sorted in reverse alphabetical order. */
  ZToA = 'ZToA'
}

/** A description of a collection of strings. */
export type StringsMetadata = {
  /** The longest string value. */
  longest?: Maybe<Scalars['String']>;
  /** The most common boolean value. */
  mostCommon?: Maybe<Scalars['String']>;
  /** The shortest string value. */
  shortest?: Maybe<Scalars['String']>;
};

/** Describes how a collection of timestamp values should be sorted. */
export enum TimestampSortingOrder {
  /** `Timestamp` values should be sorted in chronological order. */
  NewestToOldest = 'NewestToOldest',
  /** `Timestamp` values should be sorted in reverse chronological order. */
  OldestToNewest = 'OldestToNewest'
}

/** A description of a collection of timestamps. */
export type TimestampsMetadata = {
  /** The maximum timestamp value. */
  maximum?: Maybe<Scalars['Int']>;
  /** The mean timestamp value. */
  mean?: Maybe<Scalars['Int']>;
  /** The median timestamp value. */
  median?: Maybe<Scalars['Int']>;
  /** The minimum timestamp value. */
  minimum?: Maybe<Scalars['Int']>;
  /** The mode timestamp value. */
  mode?: Maybe<Scalars['Int']>;
};
