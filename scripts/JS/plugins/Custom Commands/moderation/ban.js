import { AfterEvents, PlayerSpawnAfterEvent } from "@minecraft/server";
import {
  Command,
  CommandRegistration,
  Database,
  PlayerClass,
  Validation,
  MS,
  Timer,
} from "../../class.chain.js";

const registration = new CommandRegistration()
  .setName("ban")
  .setDescription("Ban player")
  .setCategory("Moderation")
  .setRequireTags(["mod.ban"])
  .setInputs({
    0: ["playername"],
    1: ["number"],
    2: ["string"],
    3: ["string"],
  })
  .setUsage(["<playerName> <duration> <timeFormat> <reason>"])
  .setExample([
    "ban @JustSky001 1 hrs Stealing",
    "ban @JustSky001 1 days Spamming",
    "ban @JustSky001 1 yrs Hacking",
    'ban @JustSky001 1 sec "Multi line reason" ',
  ]);

const banDB = new Database("bannedPlayers");

Command.BuildCommand(registration, (interaction) => {
  const { sender, inputs } = interaction;
  const player = new PlayerClass(sender);
  const parsedTimeRegex =
    /^\d+(?:\.\d+)?\s?(?:years*?|yrs*?|weeks*?|days*?|hours*?|hrs*?|minutes*?|mins*?|seconds*?|secs*?|milliseconds*?|msecs*?|ms|[smhdwy])(?!\S)(?=\s?)/;

  const playerName = inputs.getInput(0);
  const duration = inputs.getInput(1);
  const timeFormat = inputs.getInput(2);
  const reason = inputs.getInput(3);

  if (Validation.isUndefined(playerName))
    return sender.sendMessage(
      "§cPlayer name must be starts with @, example: @JustSky001"
    );
  if (!player.isOnline(playerName))
    return sender.sendMessage(`§cPlayer with name §f${playerName} not found`);
  2;
  if (Validation.isUndefined(duration))
    return sender.sendMessage("§cDuration must be a number");
  if (Validation.isUndefined(timeFormat))
    return sender.sendMessage("§cTime format must be a string");
  if (playerName === sender.nameTag)
    return sender.sendMessage("§cYou can't ban yourself");

  const parseTime = `${duration} ${timeFormat}`;
  const time = MS.Format(parseTime.match(parsedTimeRegex)[0]);
  const today = new Date();
  const banData = {
    playerName: playerName,
    date: `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`,
    length: time,
    unbanTime: today.getTime() + time,
    reason: reason ?? "Unknown.",
    bannedBy: sender.nameTag,
  };

  if (banDB.hasKey(playerName))
    return sender.sendMessage(
      `§cPlayer with name §f${playerName} $calready banned`
    );
  else banDB.set(playerName, banData);
});

/**@type {PlayerSpawnAfterEvent} */
AfterEvents.on("playerSpawn", (data) => {
  const { player } = data;
});


/*
Server.on("tick", () => {
  const currentTime = new Date().getTime();
  const bannedPlayers = db.getCollection();
  if (!bannedPlayers) return;
  for (let key in bannedPlayers) {
    if (bannedPlayers.hasOwnProperty(key) && bannedPlayers[key]?.bannedPlayer) {
      if (bannedPlayers[key]?.unbanTime < currentTime) db.delete(key);
      else
        Server.runCommand(
          `kick "${
            bannedPlayers[key]?.bannedPlayer
          }" §r\n§cYou have been banned for §a${MS(
            bannedPlayers[key]?.length
          )}§c from this server at §b${bannedPlayers[key]?.date}${
            bannedPlayers[key]?.reason
              ? `\n§7Reason: §r${bannedPlayers[key]?.reason}`
              : ""
          }`
        );
    }
  }
});
*/