// src/config/env.ts
export const GRAPHQL_URL =
  process.env.EXPO_PUBLIC_GRAPHQL_URL ?? "http://localhost:4000/graphql";
export const METRICS_EVENTS_URL =
  process.env.EXPO_PUBLIC_METRICS_EVENTS_URL ?? "http://localhost:4000/events";
export const PERSIST_ENABLED = true; // we will persist expense cache only
