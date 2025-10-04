// src/services/graphql/StatsService.ts
import { gql } from "@apollo/client";
import { apollo } from "./GraphQLClient";
import { DateRange, IStatsService } from "@/domain/services";

const Q_STATS = gql`
  query Stats($rangeStart: String!, $rangeEnd: String!) {
    stats(rangeStart: $rangeStart, rangeEnd: $rangeEnd) {
      byTag {
        tag
        totalCents
      }
      totals {
        dateISO
        totalCents
      }
    }
  }
`;

export const StatsService: IStatsService = {
  async getTotals(range: DateRange) {
    const res = await apollo.query({
      query: Q_STATS,
      variables: { rangeStart: range.startISO, rangeEnd: range.endISO },
      fetchPolicy: "network-only",
    });
    return { totals: res.data!.stats.totals };
  },
  async getByTag(range: DateRange) {
    const res = await apollo.query({
      query: Q_STATS,
      variables: { rangeStart: range.startISO, rangeEnd: range.endISO },
      fetchPolicy: "network-only",
    });
    return { byTag: res.data!.stats.byTag };
  },
};
