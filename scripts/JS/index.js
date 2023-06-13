// Index importer
import { system } from "@minecraft/server";
import { Config } from "./config.js";

system.events.beforeWatchdogTerminate.subscribe(
  (data) => (data.cancel = Config.disableWatchDog)
);

import "./plugins/import.plugins.js";
