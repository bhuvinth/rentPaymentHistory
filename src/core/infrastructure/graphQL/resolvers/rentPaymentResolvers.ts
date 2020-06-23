/* eslint-disable @typescript-eslint/naming-convention */
import {
  Resolvers,
  RentPaymentInput,
  RentPaymentUpdateInput,
  QueryGetListOfPaymentsArgs,
} from '@core/infrastructure/graphQL/schemaAndTypes';
import RentPaymentHistoryService from '@core/application-service/rentPaymentHistoryService';
import {
  ServiceResolverContext,
  validateContext,
} from '@core/infrastructure/graphQL/contextHelper';

const resolvers: Resolvers<ServiceResolverContext> = {
  Query: {
    getListOfPayments: async (
      source,
      { contractId, startDate, endDate }: QueryGetListOfPaymentsArgs,
      ctx: ServiceResolverContext,
    ) => {
      validateContext(ctx);
      const data = await new RentPaymentHistoryService().getRentPaymentHistory(
        contractId,
        startDate,
        endDate,
      );
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
