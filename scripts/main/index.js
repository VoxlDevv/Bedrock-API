// Index importer
import { system } from "@minecraft/server";
import { Config } from "./config";

system.events.beforeWatchdogTerminate.subscribe(
  (data) => (data.cancel = Config.disableWatchDog)
);

import "./plugins/import.plugins";
