import {
  ChatSendBeforeEvent,
  DataDrivenEntityTriggerBeforeEvent,
  ExplosionBeforeEvent,
  ItemDefinitionBeforeEventSignal,
  ItemUseBeforeEvent,
  ItemUseOnBeforeEvent,
  PistonActivateBeforeEvent,
} from "@minecraft/server";

type BeforeEventsList =
  | "chat"
  | "dataDrivenEntity"
  | "explosion"
  | "itemDefinition"
  | "itemUse"
  | "itemUseOn"
  | "pistonActivate";

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
  : undefined;
