import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import type { AppContract, ContractRouterClient } from "@prep-lab/contracts";

export type AppClient = ContractRouterClient<AppContract>;

const link = new RPCLink({
  url: () => `${import.meta.env.VITE_API_URL ?? "http://localhost:3001"}/rpc`,
});

export const api: AppClient = createORPCClient<AppClient>(link);
