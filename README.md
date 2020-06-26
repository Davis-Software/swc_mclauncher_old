# Software City Minecraft Launcher
![GitHub](https://img.shields.io/github/license/Software-City/swc_mclauncher?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Software-City/swc_mclauncher?style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Software-City/swc_mclauncher?style=flat-square)

Start your Minecraft via a beatiful and easy to use Interface and play all Software City Modpacks.
(Our modpacks can be found [here](https://projects.software-city.org/resources/minecraft/modded/modpacks))

![pic1](_gitresources/preview1.png)

![pic1](_gitresources/preview2.png)


## Features
Section will be added soon...

## Changes
You can see all changes [here](https://github.com/Software-City/swc_mclauncher/blob/master/CHANGELOG.md)

## Download
### Requirements
- Winodws 10 64bit or Linux
- Java 64-Bit
- Minecraft account, duh

### pre-packaged installer
- Go to [releases](https://github.com/Software-City/swc_mclauncher/releases/latest) page and download the `SWC Minecraft Launcher Setup x.x.x.exe` file
- Run the installer

(Linux [download](https://github.com/Software-City/swc_mclauncher/releases/download/v0.2.0/SWC-Minecraft-Launcher-0.2.0.AppImage))

### from source
- Clone and extract the source files to a directory
- Run `npm install` in that directory to install dependencies
- Run `npm start` to start the launcher
- Run `npm dist` to package the launcher to a .exe file

## Activate Dev-mode
In order to activate devMode, you can:

**Warning: Dev-Mode WILL disable auto-updates!**

- Edit the file `%APPDATA%\SWC Minecraft Launcher\settings.json` and change `devMode` to `true` at the end of the file
or
- Press `Ctrl + Shift + I` in the launcher then in the console enter `setVal("devMode", true)` and restart

## Support
If you have a question you want to ask us, just use our [Support page](https://software-city.org/support) 

## People
Special thanks to [Pierce01](https://github.com/Pierce01) for his
[MinecraftLauncher-core](https://github.com/Pierce01/MinecraftLauncher-core) and
his amazing Support on his [Discord](https://discord.gg/8uYVbXP)

## Developer Notes
Here are some important information about the code!

#### Launcher requires software-city to be online
In order for the lancher to start, our software-city servers **have** to be online.
If that's not the case, you **will** be presented with the offline page.
Our servers are online during daytime in Germany CEST.

The state of the server is being checked in the `main.js` file

```javascript
require("dns").lookup("software-city.org", function(err, addr) {
  if (err) {
      win.loadFile('templates/offline.html');
  } else {
      require('dns').lookupService(addr, 80, function(err) {
          if (err) {
              win.loadFile('templates/offline.html');
          } else {
              win.loadFile("templates/load.html");
              win.webContents.session.clearCache()
              win.loadFile("templates/login.html");
          }
      });
  }
});
```
Don't remove this though, because the login functions also need our servers.

More Dev-notes will follow soon...
