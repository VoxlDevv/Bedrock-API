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
  PlayerJoinAfterEvent,
  PlayerLeaveAfterEvent,
  PlayerSpawnAfterEvent,
  PressurePlatePopAfterEvent,
  PressurePlatePushAfterEvent,
  TargetBlockHitAfterEvent,
  TripWireTripAfterEvent,
  WeatherChangeAfterEvent,
  WorldInitializeAfterEvent,
} from "@minecraft/server";

type AfterEventsList =
  | "blockBreak"
  | "blockExplode"
  | "blockPlace"
  | "buttonPush"
  | "chat"
  | "dataDrivenEntity"
  | "effectAdd"
  | "entityDie"
  | "entityHealthChanged"
  | "entityHitBlock"
  | "entityHitEntity"
  | "entityHurt"
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
  | "playerJoin"
  | "playerLeave"
  | "playerSpawn"
  | "pressurePlatePop"
  | "pressurePlatePush"
  | "projectileHit"
  | "targetBlockHit"
  | "tripWireTrip"
  | "weatherChange"
  | "worldInitialize";

type AfterEventCallback<T extends AfterEventsList> = T extends "blockBreak"
  ? BlockBreakAfterEvent
  : T extends "blockExplode"
  ? BlockExplodeAfterEvent
  : T extends "blockPlace"
  ? BlockPlaceAfterEvent
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
  : T extends "entityRemoved"
  ? EntityRemovedAfterEvent
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
  : T extends "playerJoin"
  ? PlayerJoinAfterEvent
  : T extends "playerLeave"
  ? PlayerLeaveAfterEvent
  : T extends "playerSpawn"
  ? PlayerSpawnAfterEvent
  : T extends "pressurePlatePop"
  ? PressurePlatePopAfterEvent
  : T extends "pressurePlatePush"
  ? PressurePlatePushAfterEvent
  : T extends "projectileHit"
  ? ProjectileHitAfterEvent
  : T extends "targetBlockHit"
  ? TargetBlockHitAfterEvent
  : T extends "tripWireTrip"
  ? TripWireTripAfterEvent
  : T extends "weatherChange"
  ? WeatherChangeAfterEvent
  : T extends "worldInitialize"
  ? WorldInitializeAfterEvent
  : undefined;
