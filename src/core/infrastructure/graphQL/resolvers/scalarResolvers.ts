/* eslint-disable @typescript-eslint/naming-convention */
import { GraphQLScalarType } from 'graphql';
import { Resolvers } from '@core/infrastructure/graphQL/schemaAndTypes';

const scalarResolvers: Resolvers = {
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
