// server/src/metrics.ts
import client from "prom-client";

export const register = new client.Registry();
client.collectDefaultMetrics({ register });

export const expenseCreated = new client.Counter({
  name: "spendping_expense_created_total",
  help: "Total expenses created",
  labelNames: ["tag"],
});
export const appOpen = new client.Counter({
  name: "spendping_app_open_total",
  help: "App opens by platform",
  labelNames: ["platform"],
});
export const gqlLatency = new client.Histogram({
  name: "spendping_graphql_latency_ms",
  help: "GraphQL latency",
  labelNames: ["operation"],
  buckets: [5, 10, 20, 50, 100, 200, 500, 1000],
});

register.registerMetric(expenseCreated);
register.registerMetric(appOpen);
register.registerMetric(gqlLatency);
