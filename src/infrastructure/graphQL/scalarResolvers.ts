/* eslint-disable @typescript-eslint/naming-convention */
import { GraphQLScalarType } from 'graphql';
import { Resolvers } from './schemaAndTypes/rentPaymentGraphQlGeneratedTypes';

const scalarResolvers: Resolvers = {
  Decimal: new GraphQLScalarType({
    name: 'Decimal',
    parseValue(value: string) {
      return parseFloat(value);
    },
    serialize(value: Date) {
      return value.toString();
    },
  }),
  Date: new GraphQLScalarType({
    name: 'Date',
    parseValue(value: string) {
      return new Date(value);
    },
    serialize(value: Date) {
      return value.toISOString();
    },
  }),
};

export default scalarResolvers;
