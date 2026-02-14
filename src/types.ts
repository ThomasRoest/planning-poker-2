import type { Id } from "../convex/_generated/dataModel";

export interface IParticipant {
  id: Id<"participants">;
  name: string;
  owner: boolean;
  vote: number | null;
  priority: "HIGH" | "LOW" | "MEDIUM" | null;
}

export interface ISession {
  id: Id<"sessions">;
  title: string;
  created_at: number;
  uid: string;
  participants: IParticipant[];
}
