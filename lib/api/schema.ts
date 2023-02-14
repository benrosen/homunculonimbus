export const schema = /*GraphQL*/ `
	type Mutation {
		create(
			edges: CreateEdgeCollectionRequest
			features: CreateFeatureCollectionRequest
			nodes: CreateNodeCollectionRequest
		): CreateResponse!
		delete(
			edges: SelectEdgesRequest
			features: SelectFeaturesRequest
			nodes: SelectNodesRequest
		): DeleteResponse!
	}

	type Query {
		edges(select: SelectEdgesRequest): EdgesResponse!
		features(select: SelectFeaturesRequest): FeaturesResponse!
		nodes(select: SelectNodesRequest): NodesResponse!
	}

	# TODO subscriptions
	# TODO graphql -> typescript code generation
	# TODO deploy appsync api
	# TODO log handled requests from lambda
	# TODO create lambda interpreter

	input BooleanInstanceMatcher {
		equals: Boolean
	}

	interface BooleanReducer {
		mostCommon: Boolean
	}

	interface Count {
		total: Int
		unique: Int
	}

	input CreateEdgeCollectionRequest {
		from: [CreateEdgeInstance]
	}

	input CreateEdgeInstance {
		features: CreateFeatureCollectionRequest
		nodes: CreateEdgeNodeInstance
	}

	input CreateEdgeNodeInstance {
		destination: CreateNodeInstance
		origin: CreateNodeInstance
	}

	input CreateFeatureCollectionRequest {
		from: [CreateFeatureInstance]
	}

	input CreateFeatureInstance {
		edges: CreateEdgeCollectionRequest
		key: String
		nodes: CreateNodeCollectionRequest
		value: String
	}

	input CreateNodeCollectionRequest {
		from: [CreateNodeInstance]
	}

	input CreateNodeEdgeInstance {
		inbound: CreateEdgeCollectionRequest
		outbound: CreateEdgeCollectionRequest
	}

	input CreateNodeInstance {
		edges: CreateNodeEdgeInstance
		features: CreateFeatureCollectionRequest
	}

	interface CreateResponse {
		created: MutationResponse!
	}

	interface DeleteResponse {
		deleted: MutationResponse
	}

	interface Edge {
		features(select: SelectFeaturesRequest): FeaturesResponse!
		id: ID!
		nodes: EdgeNodes
	}

	input EdgeCollectionMatcher {
		any: EdgeInstanceMatcher
		every: EdgeInstanceMatcher
		none: EdgeInstanceMatcher
	}

	input EdgeCollectionSorter {
		count: FloatSortingOrder
		features: FeatureCollectionSorter
		id: StringInstanceSorter
		nodes: EdgeNodeInstanceSorter
	}

	input EdgeInstanceMatcher {
		and: [EdgeInstanceMatcher]
		features: FeatureCollectionMatcher
		id: StringInstanceMatcher
		nodes: EdgeNodeInstanceMatcher
		not: [EdgeInstanceMatcher]
		or: [EdgeInstanceMatcher]
	}

	input EdgeInstanceSorter {
		features: FeatureCollectionSorter
		id: StringInstanceSorter
		nodes: EdgeNodeInstanceSorter
	}

	input EdgeNodeInstanceMatcher {
		destination: NodeInstanceMatcher
		origin: NodeInstanceMatcher
	}

	input EdgeNodeInstanceSorter {
		destination: NodeInstanceSorter
		origin: NodeInstanceSorter
	}

	interface EdgeNodes {
		destination: Node!
		origin: Node!
	}

	interface EdgeNodesResponseReducer {
		destination(select: SelectNodesRequest): NodesResponseReducer
		origin(select: SelectNodesRequest): NodesResponseReducer
	}

	input SelectEdgesRequest {
		by: EdgeInstanceSorter
		limit: Int
		offset: Int
		where: EdgeInstanceMatcher
	}

	interface EdgesResponse {
		calculate: EdgesResponseReducer
		enumerate: [Edge]
	}

	interface EdgesResponseReducer {
		count: Count
		features(select: SelectFeaturesRequest): FeaturesResponseReducer
		nodes: EdgeNodesResponseReducer
	}

	interface Feature {
		edges(select: SelectEdgesRequest): EdgesResponse
		id: String!
		key: String!
		nodes(select: SelectNodesRequest): NodesResponse!
		value: String!
	}

	input FeatureInstanceMatcher {
		and: [FeatureInstanceMatcher]
		edges: EdgeCollectionMatcher
		id: StringInstanceMatcher
		key: StringInstanceMatcher
		nodes: NodeCollectionMatcher
		not: [FeatureInstanceMatcher]
		or: [FeatureInstanceMatcher]
		value: FeatureValueInstanceMatcher
	}

	input FeatureInstanceSorter {
		edges: EdgeCollectionSorter
		id: StringInstanceSorter
		key: StringInstanceSorter
		nodes: NodeCollectionSorter
		value: FeatureValueInstanceSorter
	}

	input FeatureCollectionMatcher {
		any: FeatureInstanceMatcher
		every: FeatureInstanceMatcher
		none: FeatureInstanceMatcher
	}

	input FeatureCollectionSorter {
		count: FloatSortingOrder
		edges: EdgeCollectionSorter
		id: StringInstanceSorter
		key: StringInstanceSorter
		nodes: NodeCollectionSorter
		value: FeatureValueInstanceSorter
	}

	interface FeatureKeyReducer {
		mostCommon: String
	}

	input SelectFeaturesRequest {
		by: FeatureInstanceSorter
		limit: Int
		offset: Int
		where: FeatureInstanceMatcher
	}

	interface FeaturesResponse {
		calculate: FeaturesResponseReducer
		enumerate: [Feature]
	}

	interface FeaturesResponseReducer {
		count: Count
		edges(select: SelectEdgesRequest): EdgesResponseReducer
		key: FeatureKeyReducer
		nodes(select: SelectNodesRequest): NodesResponseReducer
		value: FeatureValueReducer
	}

	input FeatureValueInstanceMatcher {
		asBoolean: BooleanInstanceMatcher
		asFloat: FloatInstanceMatcher
		asString: StringInstanceMatcher
		asTimestamp: TimestampInstanceMatcher
	}

	input FeatureValueInstanceSorter {
		asFloat: FloatSortingOrder
		asString: StringInstanceSorter
		asTimestamp: TimestampSortingOrder
	}

	interface FeatureValueReducer {
		asBoolean: BooleanReducer
		asFloat: FloatReducer
		asString: StringReducer
		asTimestamp: TimestampReducer
	}

	input FloatInstanceMatcher {
		equals: Float
		isGreaterThan: Float
		isGreaterThanOrEqualTo: Float
		isLessThan: Float
		isLessThanOrEqualTo: Float
	}

	interface FloatReducer {
		mean: Float
		median: Float
		mode: Float
		minimum: Float
		maximum: Float
		total: Float
	}

	enum FloatSortingOrder {
		smallestToLargest
		largestToSmallest
	}

	interface MutationResponse {
		edges(select: SelectEdgesRequest): EdgesResponse!
		features(select: SelectFeaturesRequest): FeaturesResponse!
		nodes(select: SelectNodesRequest): NodesResponse!
	}

	interface Node {
		edges: NodeEdges!
		features(select: SelectFeaturesRequest): FeaturesResponse!
		id: ID!
	}

	input NodeCollectionMatcher {
		any: NodeInstanceMatcher
		every: NodeInstanceMatcher
		none: NodeInstanceMatcher
	}

	input NodeCollectionSorter {
		count: FloatSortingOrder
		edges: NodeEdgeInstanceSorter
		features: FeatureCollectionSorter
		id: StringInstanceSorter
	}

	input NodeEdgeCollectionMatcher {
		inbound: EdgeCollectionMatcher
		outbound: EdgeCollectionMatcher
	}

	# TODO rename this to NodeEdgesCollectionSorter?
	input NodeEdgeInstanceSorter {
		inbound: EdgeCollectionSorter
		outbound: EdgeCollectionSorter
	}

	interface NodeEdges {
		inbound(select: SelectEdgesRequest): EdgesResponse
		outbound(select: SelectEdgesRequest): EdgesResponse
	}

	interface NodeEdgesResponseReducer {
		inbound(select: SelectEdgesRequest): EdgesResponseReducer
		outbound(select: SelectEdgesRequest): EdgesResponseReducer
	}

	input NodeInstanceMatcher {
		and: [NodeInstanceMatcher]
		edges: NodeEdgeCollectionMatcher
		features: FeatureCollectionMatcher
		id: StringInstanceMatcher
		or: [NodeInstanceMatcher]
		not: [NodeInstanceMatcher]
	}

	input NodeInstanceSorter {
		edges: NodeEdgeInstanceSorter
		features: FeatureCollectionSorter
		id: StringInstanceSorter
	}

	input SelectNodesRequest {
		by: NodeInstanceSorter
		limit: Int
		offset: Int
		where: NodeInstanceMatcher
	}

	interface NodesResponse {
		calculate: NodesResponseReducer
		enumerate: [Node]
	}

	interface NodesResponseReducer {
		count: Count
		edges: NodeEdgesResponseReducer
		features(select: SelectFeaturesRequest): FeaturesResponseReducer
	}

	input StringInstanceMatcher {
		contains: String
		endsWith: String
		equals: String
		startsWith: String
	}

	input StringInstanceSorter {
		alphabetical: StringSortingOrder
		length: FloatSortingOrder
	}

	interface StringReducer {
		longest: String
		mostCommon: String
		shortest: String
	}

	enum StringSortingOrder {
		aToZ
		zToA
	}

	input TimestampInstanceMatcher {
		equals: Int
		isGreaterThan: Int
		isGreaterThanOrEqualTo: Int
		isLessThan: Int
		isLessThanOrEqualTo: Int
	}

	interface TimestampReducer {
		maximum: Int
		mean: Int
		median: Int
		minimum: Int
		mode: Int
		total: Int
	}

	enum TimestampSortingOrder {
		newestToOldest
		oldestToNewest
	}
`;