import gql from 'graphql-tag';

const rentPaymentSchema = gql`
  """
  An ISO-8601 encoded UTC date string. Example: \`"2018-06-11T00:00:00.000Z"\`.
  """
  scalar Date
  scalar Optional

  "This is to fetch data for Rent Payment"
  type RentPayment {
    rentId: Int!
    contractId: Int!
    description: String
    value: Int!
    time: Date!
    isImported: Boolean!
    createdAt: Date!
    updatedAt: Date!
    isDeleted: Boolean!
  }

  type totalRentPayment {
    sum: Int!
    items: [RentPayment]!
  }

  input RentPaymentInput {
    contractId: Int!
    description: String
    value: Int!
    isImported: Boolean!
    time: Date!
  }

  input RentPaymentUpdateInput {
    description: String
    value: Int!
    isImported: Boolean!
    rentId: Int!
    time: Date
  }

  type Query {
    """
    This is to get the rent payment history for a tenant based on contractId, between a range of dates.
    """
    getListOfPayments(contractId: Int!, startDate: Date!, endDate: Date!): totalRentPayment
  }

  type Mutation {
    createRentPayment(rentPaymentInput: RentPaymentInput!): RentPayment!
    updateRentPayment(updateRentPaymentInput: RentPaymentUpdateInput!): RentPayment!
    deleteRentPayment(rentPaymentId: Int!): Boolean!
  }
`;

export default rentPaymentSchema;
