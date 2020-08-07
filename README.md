# Software City Minecraft Launcher
![GitHub](https://img.shields.io/github/license/Software-City/swc_mclauncher?style=flat-square)
![GitHub package.json version](https://img.shields.io/github/package-json/v/Software-City/swc_mclauncher?style=flat-square)
![GitHub package.json version (branch)](https://img.shields.io/github/package-json/v/Software-City/swc_mclauncher/dev?style=flat-square)
![GitHub release (latest by date)](https://img.shields.io/github/v/release/Software-City/swc_mclauncher?style=flat-square)

Start your Minecraft via a beatiful and easy to use Interface and play all Software City Modpacks.
(Our modpacks can be found [here](https://projects.software-city.org/resources/minecraft/modded/modpacks))

![pic1](_gitresources/preview1.png)

![pic1](_gitresources/preview2.png)


## Changes
You can see all changes [here](https://github.com/Software-City/swc_mclauncher/blob/master/CHANGELOG.md)

## Download
### Requirements
- Winodws 10 64bit, MacOS Catalina 10.15.6 or Linux
- Java 64-Bit
- Minecraft account, duh

### pre-packaged installer
##### Windows x64
- [Web-based Installer (Recommended)](https://github.com/Software-City/swc_mclauncher/releases/download/v1.0.1/SWC-Minecraft-Launcher-Web-Setup-1.0.1.exe)
- [Normal Installer](https://github.com/Software-City/swc_mclauncher/releases/download/v1.0.1/SWC-Minecraft-Launcher-Setup-1.0.1.exe)
- [.7z file](https://github.com/Software-City/swc_mclauncher/releases/download/v1.0.1/swc_mclauncher-1.0.1-x64.nsis.7z)

##### MacOS
- [DMG Package (Recommended)](https://github.com/Software-City/swc_mclauncher/releases/download/v1.0.1/SWC-Minecraft-Launcher-1.0.1.dmg)
- [PKG Installer (also ok)](https://github.com/Software-City/swc_mclauncher/releases/download/v1.0.1/SWC-Minecraft-Launcher-1.0.1.pkg)

##### Linux
- [AppImage (Recommended)](https://github.com/Software-City/swc_mclauncher/releases/download/v1.0.1/SWC-Minecraft-Launcher-1.0.1.AppImage)
- [.deb Package](https://github.com/Software-City/swc_mclauncher/releases/download/v1.0.1/swc_mclauncher_1.0.1_amd64.deb)

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
Special thanks to [Pierce01](https://github.com/Pierce01) for his [MinecraftLauncher-core](https://github.com/Pierce01/MinecraftLauncher-core) and his amazing Support on his [Discord](https://discord.gg/8uYVbXP)

Shields by [shields.io](https://shields.io/)