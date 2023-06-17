import {
  Command,
  CommandRegistration,
  Database,
  PlayerClass,
  Validation,
  MS,
  AfterEvents,
  Timer,
  ChatClass,
} from "../../class.chain";

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
    return sender.sendMessage(`§cPlayer with name §f${playerName} §cnot found`);
  if (!Validation.isNumber(duration))
    return sender.sendMessage("§cDuration must be a number");
  if (Validation.isUndefined(timeFormat))
    return sender.sendMessage("§cTime format must be a string");
  if (playerName === sender.name)
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
    bannedBy: sender.name,
  };

  if (banDB.hasKey(playerName))
    return sender.sendMessage(
      `§cPlayer with name §f${playerName} $calready banned`
    );
  banDB.set(playerName, banData);
  return sender.sendMessage(
    `${playerName} §dhas been banned\n§creason: §f${reason}`
  );
});

AfterEvents.on("playerSpawn", async (data) => {
  const { player } = data;
  const currentTime = new Date().getTime();
  const getBanned = banDB.get(player.name);
  if (Validation.isUndefined(getBanned)) return;
  const parseBan = JSON.parse(getBanned);
  if (parseBan && parseBan.unbanTime < currentTime) banDB.delete(player.name);
  else {
    await Timer.sleep(1);
    new ChatClass().runCommand(`
    kick "${parseBan.playerName}" §r\n§cYou have been banned for §b${MS.Format(
      parseBan.length
    )} §cfrom this server at §e${parseBan.date}\n§7Reason: §f${parseBan.reason}
    `);
  }
});

export { banDB };
