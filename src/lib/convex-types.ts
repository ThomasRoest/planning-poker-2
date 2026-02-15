import type { FunctionReturnType } from "convex/server";
import type { Doc } from "../../convex/_generated/dataModel";
import { api } from "./convex-client";

export type Session = NonNullable<FunctionReturnType<typeof api.sessions.getByUid>>;
export type Participant = Session["participants"][number];
export type Priority = Doc<"participants">["priority"];
