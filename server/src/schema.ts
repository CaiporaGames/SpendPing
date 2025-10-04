// server/src/schema.ts
import { createYoga, createSchema } from "graphql-yoga";
import { nanoid } from "nanoid";
import dayjs from "dayjs";
import { db } from "./db";
import { expenseCreated, gqlLatency } from "./metrics";

export const yoga = createYoga({
  schema: createSchema({
    typeDefs: /* GraphQL */ `
      type Expense {
        id: ID!
        amountCents: Int!
        tag: String!
        note: String
        tsISO: String!
      }

      type ByTag {
        tag: String!
        totalCents: Int!
      }

      type Daily {
        dateISO: String!
        totalCents: Int!
      }

      type Stats {
        byTag: [ByTag!]!
        totals: [Daily!]!
      }

      type Query {
        expenses(rangeStart: String, rangeEnd: String): [Expense!]!
        stats(rangeStart: String!, rangeEnd: String!): Stats!
      }

      type Mutation {
        addExpense(amountCents: Int!, tag: String!, note: String, ts: String): Expense!
      }
    `,
    resolvers: {
      Query: {
        expenses: (_, args: any) => {
          const s = args.rangeStart ? dayjs(args.rangeStart) : null;
          const e = args.rangeEnd ? dayjs(args.rangeEnd) : null;
          return db.data!.expenses.filter((x) => {
            const d = dayjs(x.tsISO);
            return (!s || !d.isBefore(s)) && (!e || !d.isAfter(e));
          }).sort((a,b) => dayjs(b.tsISO).valueOf() - dayjs(a.tsISO).valueOf());
        },
        stats: (_, { rangeStart, rangeEnd }: any) => {
          const s = dayjs(rangeStart), e = dayjs(rangeEnd);
          const inRange = db.data!.expenses.filter((x) => {
            const d = dayjs(x.tsISO);
            return !d.isBefore(s) && !d.isAfter(e);
          });
          const byTagMap = new Map<string, number>();
          for (const it of inRange) byTagMap.set(it.tag, (byTagMap.get(it.tag) ?? 0) + it.amountCents);

          const totalsMap = new Map<string, number>();
          for (const it of inRange) {
            const key = dayjs(it.tsISO).format("YYYY-MM-DD");
            totalsMap.set(key, (totalsMap.get(key) ?? 0) + it.amountCents);
          }

          return {
            byTag: Array.from(byTagMap, ([tag, totalCents]) => ({ tag, totalCents })),
            totals: Array.from(totalsMap, ([dateISO, totalCents]) => ({ dateISO, totalCents }))
              .sort((a, b) => (a.dateISO < b.dateISO ? -1 : 1)),
          };
        },
      },
      Mutation: {
        addExpense: (_, { amountCents, tag, note, ts }: any) => {
          const row = {
            id: nanoid(),
            amountCents,
            tag,
            note: note ?? null,
            tsISO: ts ?? new Date().toISOString(),
          };
          db.data!.expenses.push(row);
          db.write();
          expenseCreated.inc({ tag });
          return row;
        },
      },
    },
  }),
  // simple per-operation latency histogram
  plugins: [
    {
      onExecute: ({ args }: { args: { operationName?: string } }) => {
        const op = args.operationName ?? "anonymous";
        const end = gqlLatency.startTimer({ operation: op });
        return {
          onExecuteDone: () => end(),
        };
      },
    },
  ],
});
