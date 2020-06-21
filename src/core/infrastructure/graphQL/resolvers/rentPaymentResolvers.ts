/* eslint-disable @typescript-eslint/naming-convention */
import RentPaymentHistoryService from '../../application-service/rentPaymentHistoryService';
import { ServiceResolverContext, validateContext } from './context';
import {
  Resolvers,
  RentPaymentInput,
  RentPaymentUpdateInput,
  QueryGetTotalRentPaymentArgs,
} from './schemaAndTypes';
// import createResolvers from './createResolvers';

const resolvers: Resolvers<ServiceResolverContext> = {
  Query: {
    getTotalRentPayment: async (
      source,
      { contractId, startDate, endDate }: QueryGetTotalRentPaymentArgs,
      ctx: ServiceResolverContext,
    ) => {
      validateContext(ctx);
      const data = await new RentPaymentHistoryService().getRentPaymentHistory(
        contractId,
        startDate,
        endDate,
      );
      console.log(data);
      return data;
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
      return new RentPaymentHistoryService().addPaymentRecord(rentPaymentInput);
    },
    deleteRentPayment: async (source, { rentPaymentId }, ctx: ServiceResolverContext) => {
      validateContext(ctx);
      return new RentPaymentHistoryService().deleteRentPayment(rentPaymentId);
    },
    updateRentPayment: async (
      source,
      { updateRentPaymentInput }: { updateRentPaymentInput: RentPaymentUpdateInput },
      ctx,
    ) => {
      validateContext(ctx);
      return new RentPaymentHistoryService().updatePaymentRecord(updateRentPaymentInput);
    },
  },
};

export default resolvers;
