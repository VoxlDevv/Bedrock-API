import { world } from "@minecraft/server";
import { BeforeEvents, Command, PlayerClass } from "../@modules";
import { RankConfig } from "./config";

BeforeEvents.on("chat", (rawdata) => {
  const { sender, message } = rawdata;
  if (message.startsWith(Command.getPrefix())) return;
  rawdata.cancel = true;
  const player = new PlayerClass(sender);
  const getRank =
    player.getTagStartsWith("rank:")?.slice(5) ?? RankConfig.defaultRank;
  world.sendMessage(
    getRank?.replaceAll("@NAME", sender.name)?.replaceAll("@CHAT", message)
  );
});
