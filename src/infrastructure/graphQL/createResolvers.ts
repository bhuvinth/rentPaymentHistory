import { IFieldResolver } from 'graphql-tools';

export type Resolvers = Record<string, Record<string, IFieldResolver<any, any, any>>>;

export default function createResolvers(resolvers: Resolvers): Resolvers {
  return resolvers;
}
