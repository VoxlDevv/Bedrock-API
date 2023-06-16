import { world, system } from "@minecraft/server";
import { AfterEvents, BeforeEvents, SystemEvents } from "../../class.chain";

// Before events
world.beforeEvents.chatSend.subscribe((cb) => BeforeEvents.emit("chat", cb));

world.beforeEvents.dataDrivenEntityTriggerEvent.subscribe((cb) =>
  BeforeEvents.emit("dataDrivenEntity", cb)
);

world.beforeEvents.explosion.subscribe((cb) =>
  BeforeEvents.emit("explosion", cb)
);

world.beforeEvents.itemDefinitionEvent.subscribe((cb) =>
  BeforeEvents.emit("itemDefinition", cb)
);

world.beforeEvents.itemUse.subscribe((cb) => BeforeEvents.emit("itemUse", cb));

world.beforeEvents.itemUseOn.subscribe((cb) =>
  BeforeEvents.emit("itemUseOn", cb)
);

world.beforeEvents.pistonActivate.subscribe((cb) =>
  BeforeEvents.emit("pistonActivate", cb)
);

// After events
world.afterEvents.blockBreak.subscribe((cb) =>
  AfterEvents.emit("blockBreak", cb)
);

world.afterEvents.blockExplode.subscribe((cb) =>
  AfterEvents.emit("blockExplode", cb)
);

world.afterEvents.blockPlace.subscribe((cb) =>
  AfterEvents.emit("blockPlace", cb)
);

world.afterEvents.buttonPush.subscribe((cb) =>
  AfterEvents.emit("buttonPush", cb)
);

world.afterEvents.chatSend.subscribe((cb) => AfterEvents.emit("chat", cb));

world.afterEvents.dataDrivenEntityTriggerEvent.subscribe((cb) =>
  AfterEvents.emit("dataDrivenEntity", cb)
);

world.afterEvents.effectAdd.subscribe((cb) =>
  AfterEvents.emit("effectAdd", cb)
);

world.afterEvents.entityDie.subscribe((cb) =>
  AfterEvents.emit("entityDie", cb)
);

world.afterEvents.entityHit.subscribe((cb) =>
  AfterEvents.emit("entityHit", cb)
);

world.afterEvents.entityHurt.subscribe((cb) =>
  AfterEvents.emit("entityHurt", cb)
);

world.afterEvents.entityRemoved.subscribe((cb) =>
  AfterEvents.emit("entityRemoved", cb)
);

world.afterEvents.entitySpawn.subscribe((cb) =>
  AfterEvents.emit("entitySpawn", cb)
);

world.afterEvents.explosion.subscribe((cb) =>
  AfterEvents.emit("explosion", cb)
);

world.afterEvents.itemCompleteCharge.subscribe((cb) =>
  AfterEvents.emit("itemCompleteCharge", cb)
);

world.afterEvents.itemDefinitionEvent.subscribe((cb) =>
  AfterEvents.emit("itemDefinition", cb)
);

world.afterEvents.itemReleaseCharge.subscribe((cb) =>
  AfterEvents.emit("itemReleaseCharge", cb)
);

world.afterEvents.itemStartCharge.subscribe((cb) =>
  AfterEvents.emit("itemStartCharge", cb)
);

world.afterEvents.itemStartUseOn.subscribe((cb) =>
  AfterEvents.emit("itemStartUseOn", cb)
);

world.afterEvents.itemStopCharge.subscribe((cb) =>
  AfterEvents.emit("itemStopCharge", cb)
);

world.afterEvents.itemStopUseOn.subscribe((cb) =>
  AfterEvents.emit("itemStopUseOn", cb)
);

world.afterEvents.itemUse.subscribe((cb) => AfterEvents.emit("itemUse", cb));

world.afterEvents.itemUseOn.subscribe((cb) =>
  AfterEvents.emit("itemUseOn", cb)
);

world.afterEvents.leverActivate.subscribe((cb) =>
  AfterEvents.emit("leverActivate", cb)
);

world.afterEvents.messageReceive.subscribe((cb) =>
  AfterEvents.emit("messageRecieve", cb)
);

world.afterEvents.pistonActivate.subscribe((cb) =>
  AfterEvents.emit("pistonActivate", cb)
);

world.afterEvents.playerJoin.subscribe((cb) =>
  AfterEvents.emit("playerJoin", cb)
);

world.afterEvents.playerLeave.subscribe((cb) =>
  AfterEvents.emit("playerLeave", cb)
);

world.afterEvents.playerSpawn.subscribe((cb) =>
  AfterEvents.emit("playerSpawn", cb)
);

world.afterEvents.projectileHit.subscribe((cb) =>
  AfterEvents.emit("projectileHit", cb)
);

world.afterEvents.weatherChange.subscribe((cb) =>
  AfterEvents.emit("weatherChange", cb)
);

world.afterEvents.worldInitialize.subscribe((cb) =>
  AfterEvents.emit("worldInitialize", cb)
);

// System events
system.events.beforeWatchdogTerminate.subscribe((cb) =>
  SystemEvents.emit("beforeWatchdog", cb)
);

system.events.scriptEventReceive.subscribe((cb) =>
  SystemEvents.emit("scriptEvent", cb)
);
