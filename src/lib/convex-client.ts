import { ConvexReactClient } from "convex/react";
import { api as generatedApi } from "../../convex/_generated/api";

export const convex = new ConvexReactClient(import.meta.env.VITE_CONVEX_URL);
export const api = generatedApi;
