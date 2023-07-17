/**
 * This is an AutoLoad system
 * Import plugin using pluginFolder, like if you have plugin called "Example" then add "Example" to the pluginFolder, it should looks like this
 * ["Example", "Plugin 1", "Plugin 2"]
 * Don't forget to rename the main plugin with "system", example: "Plugin 1/system"
 */

const pluginFolder: string[] = [
  // Import Plugin (Folder Name)
  "Chat Ranks",
  "Custom Commands",
];

























// Don't Touch
import "./_ignore/index";
const start: number = Date.now();
for (const plugin of pluginFolder) {
  const end: number = Date.now();
  import(`./${plugin}/system`)
    .then(() => {
      throw `Loaded plugin: ${plugin} successfully, in ${end - start} ms`;
    })
    .catch((err) => {
      throw `Error on loading plugin: ${plugin}\nError: ${err}\nStack: ${err.stack}`;
    });
}
