import {
  BlockExplodeAfterEvent,
  ButtonPushAfterEvent,
  ChatSendAfterEvent,
  DataDrivenEntityTriggerAfterEvent,
  EffectAddAfterEvent,
  EntityDieAfterEvent,
  EntityHealthChangedAfterEvent,
  EntityHitBlockAfterEvent,
  EntityHitEntityAfterEvent,
  EntityHurtAfterEvent,
  EntityLoadAfterEventSignal,
  EntityRemoveAfterEvent,
  EntitySpawnAfterEvent,
  ExplosionAfterEvent,
  ItemCompleteUseAfterEvent,
  ItemDefinitionAfterEventSignal,
  ItemReleaseUseAfterEvent,
  ItemStartUseAfterEvent,
  ItemStartUseOnAfterEvent,
  ItemStopUseAfterEvent,
  ItemStopUseOnAfterEvent,
  ItemUseAfterEvent,
  ItemUseOnAfterEvent,
  LeverActionAfterEvent,
  MessageReceiveAfterEvent,
  PistonActivateAfterEvent,
  PlayerBreakBlockAfterEvent,
  PlayerJoinAfterEvent,
  PlayerLeaveAfterEvent,
  PlayerPlaceBlockAfterEvent,
  PlayerSpawnAfterEvent,
  PressurePlatePopAfterEvent,
  PressurePlatePushAfterEvent,
  ProjectileHitBlockAfterEvent,
  ProjectileHitEntityAfterEvent,
  TargetBlockHitAfterEvent,
  TripWireTripAfterEvent,
  WeatherChangeAfterEvent,
  WorldInitializeAfterEvent,
} from "@minecraft/server";

type AfterEventsList =
  | "blockExplode"
  | "buttonPush"
  | "chat"
  | "dataDrivenEntity"
  | "effectAdd"
  | "entityDie"
  | "entityHealthChanged"
  | "entityHitBlock"
  | "entityHitEntity"
  | "entityHurt"
  | "entityLoad"
  | "entityRemoved"
  | "entitySpawn"
  | "explosion"
  | "itemCompleteUse"
  | "itemDefinition"
  | "itemReleaseUse"
  | "itemStartUse"
  | "itemStartUseOn"
  | "itemStopUse"
  | "itemStopUseOn"
  | "itemUse"
  | "itemUseOn"
  | "leverAction"
  | "messageReceive"
  | "pistonActivate"
  | "playerBreakBlock"
  | "playerJoin"
  | "playerLeave"
  | "playerPlaceBlock"
  | "playerSpawn"
  | "pressurePlatePop"
  | "pressurePlatePush"
  | "projectileHitBlock"
  | "projectileHitEntity"
  | "targetBlockHit"
  | "tripWireTrip"
  | "weatherChange"
  | "worldInitialize";

type AfterEventCallback<T extends AfterEventsList> = T extends "blockExplode"
  ? BlockExplodeAfterEvent
  : T extends "buttonPush"
  ? ButtonPushAfterEvent
  : T extends "chat"
  ? ChatSendAfterEvent
  : T extends "dataDrivenEntity"
  ? DataDrivenEntityTriggerAfterEvent
  : T extends "effectAdd"
  ? EffectAddAfterEvent
  : T extends "entityDie"
  ? EntityDieAfterEvent
  : T extends "entityHealthChanged"
  ? EntityHealthChangedAfterEvent
  : T extends "entityHitBlock"
  ? EntityHitBlockAfterEvent
  : T extends "entityHitEntity"
  ? EntityHitEntityAfterEvent
  : T extends "entityHurt"
  ? EntityHurtAfterEvent
  : T extends "entityLoad"
  ? EntityLoadAfterEventSignal
  : T extends "entityRemoved"
  ? EntityRemoveAfterEvent
  : T extends "entitySpawn"
  ? EntitySpawnAfterEvent
  : T extends "explosion"
  ? ExplosionAfterEvent
  : T extends "itemCompleteUse"
  ? ItemCompleteUseAfterEvent
  : T extends "itemDefinition"
  ? ItemDefinitionAfterEventSignal
  : T extends "itemReleaseUse"
  ? ItemReleaseUseAfterEvent
  : T extends "itemStartUse"
  ? ItemStartUseAfterEvent
  : T extends "itemStartUseOn"
  ? ItemStartUseOnAfterEvent
  : T extends "itemStopUse"
  ? ItemStopUseAfterEvent
  : T extends "itemStopUseOn"
  ? ItemStopUseOnAfterEvent
  : T extends "itemUse"
  ? ItemUseAfterEvent
  : T extends "itemUseOn"
  ? ItemUseOnAfterEvent
  : T extends "leverAction"
  ? LeverActionAfterEvent
  : T extends "messageReceive"
  ? MessageReceiveAfterEvent
  : T extends "pistonActivate"
  ? PistonActivateAfterEvent
  : T extends "playerBreakBlock"
  ? PlayerBreakBlockAfterEvent
  : T extends "playerJoin"
  ? PlayerJoinAfterEvent
  : T extends "playerLeave"
  ? PlayerLeaveAfterEvent
  : T extends "playerPlaceBlock"
  ? PlayerPlaceBlockAfterEvent
  : T extends "playerSpawn"
  ? PlayerSpawnAfterEvent
  : T extends "pressurePlatePop"
  ? PressurePlatePopAfterEvent
  : T extends "pressurePlatePush"
  ? PressurePlatePushAfterEvent
  : T extends "projectileHitBlock"
  ? ProjectileHitBlockAfterEvent
  : T extends "projectileHitEntity"
  ? ProjectileHitEntityAfterEvent
  : T extends "targetBlockHit"
  ? TargetBlockHitAfterEvent
  : T extends "tripWireTrip"
  ? TripWireTripAfterEvent
  : T extends "weatherChange"
  ? WeatherChangeAfterEvent
  : T extends "worldInitialize"
  ? WorldInitializeAfterEvent
  : undefined;
