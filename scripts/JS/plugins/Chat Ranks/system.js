import {
  Command,
  BeforeEvents,
  PlayerClass,
  Timer,
  ChatClass,
} from "../class.chain";
import { RankConfig } from "./config";

BeforeEvents.on("chat", async (data) => {
  const { message, sender } = data;
  if (message.startsWith(Command.getPrefix())) return;
  data.cancel = true;
  const player = new PlayerClass(sender);
  const getRankTag =
    player.getTagStartsWith("rank:")?.slice(5) ?? RankConfig.defaultRank;

  // Privilege kont
  await Timer.sleep(1);
  new ChatClass().broadcast({
    text: getRankTag
      ?.replaceAll("{name}", sender.name)
      ?.replaceAll("{msg}", message),
  });
});
