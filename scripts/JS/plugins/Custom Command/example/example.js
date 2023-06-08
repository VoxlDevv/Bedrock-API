import * as API from "../../class.chain.js";

const registration = new API.CommandRegistration()
  .setName("ping")
  .setDescription("Ping command")
  .setAliases(["p"])
  .setExample(["p", "ping"])
  .setCategory("Example");

API.Command.BuildCommand(registration, (data) => {
  data.sender.sendMessage("Pong!");
});
