/**
 * This is an AutoLoad system
 * Import plugin using pluginFolder, like if you have plugin called "Example" then add "Example" to the pluginFolder, it should looks like this
 * ["Example", "Plugin 1", "Plugin 2"]
 * Don't forget to rename the main plugin with "system.js", example: "Plugin 1/system.js"
 */

const pluginFolder = [
  // Import Plugin (Folder Name)
  "Chat Ranks",
  "Custom Commands",
];








// Don't Touch
const start = Date.now();
for (const plugin of pluginFolder) {
  const end = Date.now();
  import(`./${plugin}/system.js`)
    .then(() =>
      console.warn(
        `Loaded plugin: ${plugin} successfully, in ${end - start} ms`
      )
    )
    .catch((err) =>
      console.warn(
        `Error on loading plugin: ${plugin}\nStack:`,
        err + err.stack
      )
    );
}
