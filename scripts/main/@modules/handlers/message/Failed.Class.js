class FailedClass {
    /**
     * Invalid command builder
     * @param player - Player object
     * @param commandName - Command name
     */
    InvalidCommand(player, commandName) {
        return player.sendMessage({
            rawtext: [
                {
                    text: "§c",
                },
                {
                    translate: "commands.generic.unknown",
                    with: [`${commandName}`],
                },
            ],
        });
    }
}
export { FailedClass };
