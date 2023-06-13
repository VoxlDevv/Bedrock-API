import { system } from "@minecraft/server";
import { BeforeEvents, PlayerClass, Timer, ChatClass } from "../class.chain.js";
import { RankConfig } from "./config.js";

BeforeEvents.on("send", async (data) => {
  const { message, sender } = data;
  if (message.startsWith(API.Command.getPrefix())) return;
  data.cancel = true;
  const player = new PlayerClass(sender);
  const getRankTag =
    player.getTagStartsWith("rank:")?.slice(5) ?? RankConfig.defaultRank;

  // Privilege kont
  await Timer.sleep(2);
  new ChatClass().broadcast({
    text: getRankTag
      ?.replaceAll("{name}", sender.nameTag)
      ?.replaceAll("{msg}", message),
  });
});
