import {
  ChatSendBeforeEvent,
  DataDrivenEntityTriggerBeforeEvent,
  ExplosionBeforeEvent,
  ItemDefinitionBeforeEventSignal,
  ItemUseBeforeEvent,
  ItemUseOnBeforeEvent,
  PistonActivateBeforeEvent,
  PlayerBreakBlockBeforeEvent,
  PlayerPlaceBlockBeforeEvent,
} from "@minecraft/server";

type BeforeEventsList =
  | "chat"
  | "dataDrivenEntity"
  | "explosion"
  | "itemDefinition"
  | "itemUse"
  | "itemUseOn"
  | "pistonActivate"
  | "playerBreakBlock"
  | "playerPlaceBlock";

type BeforeEventCallback<T extends BeforeEventsList> = T extends "chat"
  ? ChatSendBeforeEvent
  : T extends "dataDrivenEntity"
  ? DataDrivenEntityTriggerBeforeEvent
  : T extends "explosion"
  ? ExplosionBeforeEvent
  : T extends "itemDefinition"
  ? ItemDefinitionBeforeEventSignal
  : T extends "itemUse"
  ? ItemUseBeforeEvent
  : T extends "itemUseOn"
  ? ItemUseOnBeforeEvent
  : T extends "pistonActivate"
  ? PistonActivateBeforeEvent
  : T extends "playerBreakBlock"
  ? PlayerBreakBlockBeforeEvent
  : T extends "playerPlaceBlock"
  ? PlayerPlaceBlockBeforeEvent
  : undefined;
