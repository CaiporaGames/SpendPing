// src/services/graphql/ExpensesService.ts
import { gql } from "@apollo/client";
import { apollo } from "./GraphQLClient";
import { IExpensesService } from "@/domain/services";

const MUT_ADD = gql`
  mutation AddExpense($amountCents: Int!, $tag: String!, $note: String, $ts: String) {
    addExpense(amountCents: $amountCents, tag: $tag, note: $note, ts: $ts) {
      id
      tsISO
    }
  }
`;

const Q_LIST = gql`
  query Expenses($rangeStart: String, $rangeEnd: String) {
    expenses(rangeStart: $rangeStart, rangeEnd: $rangeEnd) {
      id
      amountCents
      tag
      note
      tsISO
    }
  }
`;

export const ExpensesService: IExpensesService = {
  async addExpense(input) {
    const res = await apollo.mutate({
      mutation: MUT_ADD,
      variables: { amountCents: input.amountCents, tag: input.tag, note: input.note, ts: input.tsISO },
    });
    return { expense: res.data!.addExpense };
  },
  async listExpenses(range) {
    const res = await apollo.query({
      query: Q_LIST,
      variables: {
        rangeStart: range?.startISO,
        rangeEnd: range?.endISO,
      },
      fetchPolicy: "network-only",
    });
    return { expenses: res.data!.expenses };
  },
};
