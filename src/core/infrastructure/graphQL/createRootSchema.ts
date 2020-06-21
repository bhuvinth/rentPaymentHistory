import { GraphQLSchema } from 'graphql';
import { makeExecutableSchema } from 'graphql-tools';

import rentPaymentResolvers from './rentPaymentResolvers';
import scalarResolvers from './scalarResolvers';
// import createResolvers from './createResolvers';
import { rentPaymentSchema } from './schemaAndTypes/schema';

/**
 * @returns GraphQL schema including resolvers.
 *
 * @see {@link https://www.apollographql.com/docs/graphql-tools/generate-schema.html | Generating a schema}
 */
export default function createRootSchema(): GraphQLSchema {
  return makeExecutableSchema({
    typeDefs: [rentPaymentSchema],
    resolvers: [rentPaymentResolvers, scalarResolvers],
    allowUndefinedInResolve: false,
  });
}
