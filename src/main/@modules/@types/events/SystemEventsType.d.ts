import {
  ScriptEventCommandMessageAfterEvent,
  WatchdogTerminateBeforeEvent,
} from "@minecraft/server";

type SystemEventsList = "watchdogTerminate" | "scriptEventReceive";

type SystemEventCallback<T extends SystemEventsList> =
  T extends "watchdogTerminate"
    ? WatchdogTerminateBeforeEvent
    : T extends "scriptEventReceive"
    ? ScriptEventCommandMessageAfterEvent
    : undefined;
