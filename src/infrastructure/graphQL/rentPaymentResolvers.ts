/* eslint-disable @typescript-eslint/naming-convention */
import RentPaymentHistoryService from '../../application-service/rentPaymentHistoryService';
import { ServiceResolverContext, validateContext } from './context';
import { Resolvers, RentPaymentInput, RentPaymentUpdateInput } from './schemaAndTypes';
import createResolvers from './createResolvers';

const resolvers: Resolvers<ServiceResolverContext> = {
  Query: {
    getTotalRentPayment: async (source, params, ctx: ServiceResolverContext) => {
      validateContext(ctx);
      return new RentPaymentHistoryService().get();
    },
  },
  Mutation: {
    createRentPayment: async (
      _source: any,
      { rentPaymentInput }: { rentPaymentInput: RentPaymentInput },
      ctx: ServiceResolverContext,
    ) => {
      validateContext(ctx);
      console.log(rentPaymentInput);
      return null;
    },
    deleteRentPayment: async (source, rentPaymentId, ctx: ServiceResolverContext) => {
      validateContext(ctx);
      console.log(rentPaymentId);
      return true;
    },
    updateRentPayment: async (
      source,
      { updateRentPaymentInput }: { updateRentPaymentInput: RentPaymentUpdateInput },
      ctx,
    ) => {
      validateContext(ctx);
      console.log(updateRentPaymentInput);
      return null;
    },
  },
};

export default createResolvers(resolvers);
