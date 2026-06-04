import { implement } from "@orpc/server";
import { appContract } from "@prep-lab/contracts";

export const base = implement(appContract);
