import { SystemEvents } from "./@modules/modules";
import { Config } from "./config";

SystemEvents.on(
  "watchdogTerminate",
  (watchdog) => (watchdog.cancel = Config.disableWatchdog)
);

import "./plugins/plugin.loader";
