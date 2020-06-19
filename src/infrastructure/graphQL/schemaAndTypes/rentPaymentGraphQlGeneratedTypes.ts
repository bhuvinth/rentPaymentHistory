/* This file is auto-generated from schema.ts. */
/* eslint-disable */
import { GraphQLResolveInfo, GraphQLScalarType, GraphQLScalarTypeConfig } from 'graphql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: any }> = { [K in keyof T]: T[K] };
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };


/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** An ISO-8601 encoded UTC date string. Example: `"2018-06-11T00:00:00.000Z"`. */
  Date: Date;
  /** A signed decimal number, which supports arbitrary precision and is serialized as a string. Example: `"29.99"`. */
  Decimal: number;
  Optional: any;
};



export type Mutation = {
  __typename?: 'Mutation';
  createRentPayment: RentPayment;
  updateRentPayment: RentPayment;
  deleteRentPayment: Scalars['Boolean'];
};


export type MutationCreateRentPaymentArgs = {
  rentPaymentInput: RentPaymentInput;
};


export type MutationUpdateRentPaymentArgs = {
  updateRentPaymentInput: RentPaymentUpdateInput;
};


export type MutationDeleteRentPaymentArgs = {
  rentPaymentId: Scalars['Int'];
};


export type Query = {
  __typename?: 'Query';
  getTotalRentPayment?: Maybe<TotalRentPayment>;
};


export type QueryGetTotalRentPaymentArgs = {
  contractId: Scalars['Int'];
  startDate: Scalars['Date'];
  endDate: Scalars['Date'];
};

export type RentPayment = {
  __typename?: 'RentPayment';
  rentId: Scalars['Int'];
  contractId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  value: Scalars['Int'];
  time: Scalars['Date'];
  isImported: Scalars['Boolean'];
  createdAt: Scalars['Date'];
  updatedAt: Scalars['Date'];
};

export type RentPaymentInput = {
  contractId: Scalars['Int'];
  description?: Maybe<Scalars['String']>;
  value: Scalars['Int'];
  isImported: Scalars['Boolean'];
};

export type RentPaymentUpdateInput = {
  description?: Maybe<Scalars['String']>;
  value: Scalars['Int'];
  isImported: Scalars['Boolean'];
};

export type TotalRentPayment = {
  __typename?: 'totalRentPayment';
  sum: Scalars['Int'];
  rentPayments?: Maybe<Array<Maybe<RentPayment>>>;
};

export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;


export type LegacyStitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type NewStitchingResolver<TResult, TParent, TContext, TArgs> = {
  selectionSet: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};
export type StitchingResolver<TResult, TParent, TContext, TArgs> = LegacyStitchingResolver<TResult, TParent, TContext, TArgs> | NewStitchingResolver<TResult, TParent, TContext, TArgs>;
export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes> | Promise<Maybe<TTypes>>;

export type IsTypeOfResolverFn<T = {}> = (obj: T, info: GraphQLResolveInfo) => boolean | Promise<boolean>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>;
  Int: ResolverTypeWrapper<Scalars['Int']>;
  Date: ResolverTypeWrapper<Scalars['Date']>;
  totalRentPayment: ResolverTypeWrapper<TotalRentPayment>;
  RentPayment: ResolverTypeWrapper<RentPayment>;
  String: ResolverTypeWrapper<Scalars['String']>;
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>;
  Mutation: ResolverTypeWrapper<{}>;
  RentPaymentInput: RentPaymentInput;
  RentPaymentUpdateInput: RentPaymentUpdateInput;
  Decimal: ResolverTypeWrapper<Scalars['Decimal']>;
  Optional: ResolverTypeWrapper<Scalars['Optional']>;
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {};
  Int: Scalars['Int'];
  Date: Scalars['Date'];
  totalRentPayment: TotalRentPayment;
  RentPayment: RentPayment;
  String: Scalars['String'];
  Boolean: Scalars['Boolean'];
  Mutation: {};
  RentPaymentInput: RentPaymentInput;
  RentPaymentUpdateInput: RentPaymentUpdateInput;
  Decimal: Scalars['Decimal'];
  Optional: Scalars['Optional'];
}>;

export interface DateScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Date'], any> {
  name: 'Date';
}

export interface DecimalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Decimal'], any> {
  name: 'Decimal';
}

export type MutationResolvers<ContextType = any, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  createRentPayment?: Resolver<ResolversTypes['RentPayment'], ParentType, ContextType, RequireFields<MutationCreateRentPaymentArgs, 'rentPaymentInput'>>;
  updateRentPayment?: Resolver<ResolversTypes['RentPayment'], ParentType, ContextType, RequireFields<MutationUpdateRentPaymentArgs, 'updateRentPaymentInput'>>;
  deleteRentPayment?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType, RequireFields<MutationDeleteRentPaymentArgs, 'rentPaymentId'>>;
}>;

export interface OptionalScalarConfig extends GraphQLScalarTypeConfig<ResolversTypes['Optional'], any> {
  name: 'Optional';
}

export type QueryResolvers<ContextType = any, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  getTotalRentPayment?: Resolver<Maybe<ResolversTypes['totalRentPayment']>, ParentType, ContextType, RequireFields<QueryGetTotalRentPaymentArgs, 'contractId' | 'startDate' | 'endDate'>>;
}>;

export type RentPaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['RentPayment'] = ResolversParentTypes['RentPayment']> = ResolversObject<{
  rentId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  contractId?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  description?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>;
  value?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  time?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  isImported?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>;
  createdAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  updatedAt?: Resolver<ResolversTypes['Date'], ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type TotalRentPaymentResolvers<ContextType = any, ParentType extends ResolversParentTypes['totalRentPayment'] = ResolversParentTypes['totalRentPayment']> = ResolversObject<{
  sum?: Resolver<ResolversTypes['Int'], ParentType, ContextType>;
  rentPayments?: Resolver<Maybe<Array<Maybe<ResolversTypes['RentPayment']>>>, ParentType, ContextType>;
  __isTypeOf?: IsTypeOfResolverFn<ParentType>;
}>;

export type Resolvers<ContextType = any> = ResolversObject<{
  Date?: GraphQLScalarType;
  Decimal?: GraphQLScalarType;
  Mutation?: MutationResolvers<ContextType>;
  Optional?: GraphQLScalarType;
  Query?: QueryResolvers<ContextType>;
  RentPayment?: RentPaymentResolvers<ContextType>;
  totalRentPayment?: TotalRentPaymentResolvers<ContextType>;
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;
