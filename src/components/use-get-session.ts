import { useQuery } from "convex/react";
import { useParams } from "react-router";
import { z } from "zod";
import { api } from "../lib/convex-client";

const sessionUidSchema = z.uuid();

export const useGetSession = () => {
  const { uid } = useParams<{ uid: string }>();
  const parsedUid = sessionUidSchema.safeParse(uid);
  const validUid = parsedUid.success ? parsedUid.data : null;
  const queryArgs: { uid: string } | "skip" = validUid ? { uid: validUid } : "skip";
  const session = useQuery(api.sessions.getByUid, queryArgs);

  return {
    isValidUid: validUid !== null,
    session,
  };
};
