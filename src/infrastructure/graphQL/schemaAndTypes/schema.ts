import gql from 'graphql-tag';

// eslint-disable-next-line import/prefer-default-export
export const rentPaymentSchema = gql`
  """
  A signed decimal number, which supports arbitrary precision and is serialized as a string. Example: \`"29.99"\`.
  """
  scalar Decimal
  """
  An ISO-8601 encoded UTC date string. Example: \`"2018-06-11T00:00:00.000Z"\`.
  """
  scalar Date
  scalar Optional

  type RentPayment {
    rentId: Int!
    contractId: Int!
    description: String
    value: Int!
    time: Date!
    isImported: Boolean!
    createdAt: Date!
    updatedAt: Date!
  }

  type totalRentPayment {
    sum: Int!
    rentPayments: [RentPayment]
  }

  input RentPaymentInput {
    contractId: Int!
    description: String
    value: Int!
    isImported: Boolean!
  }

  input RentPaymentUpdateInput {
    description: String
    value: Int!
    isImported: Boolean!
  }

  type Query {
    getTotalRentPayment(contractId: Int!, startDate: Date!, endDate: Date!): totalRentPayment
  }

  type Mutation {
    createRentPayment(rentPaymentInput: RentPaymentInput!): RentPayment!
    updateRentPayment(updateRentPaymentInput: RentPaymentUpdateInput!): RentPayment!
    deleteRentPayment(rentPaymentId: Int!): Boolean!
  }
`;
