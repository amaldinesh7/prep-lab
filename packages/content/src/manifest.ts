import type { ModuleDef } from "./types";
import { tanstackRouterModule } from "./modules/tanstack-router/manifest";
import { performanceModule } from "./modules/performance/manifest";
import { optimisticUpdatesModule } from "./modules/optimistic-updates/manifest";
import { serviceWorkersModule } from "./modules/service-workers/manifest";
import { syncEnginesModule } from "./modules/sync-engines/manifest";
import { crdtsModule } from "./modules/crdts/manifest";
import { otModule } from "./modules/ot/manifest";
import { webrtcModule } from "./modules/webrtc/manifest";
import { reactNativeModule } from "./modules/react-native/manifest";
import { electronModule } from "./modules/electron/manifest";
import { capstoneModule } from "./modules/capstone/manifest";

export const allModules: ModuleDef[] = [
  tanstackRouterModule,
  performanceModule,
  optimisticUpdatesModule,
  serviceWorkersModule,
  syncEnginesModule,
  crdtsModule,
  otModule,
  webrtcModule,
  reactNativeModule,
  electronModule,
  capstoneModule,
];
