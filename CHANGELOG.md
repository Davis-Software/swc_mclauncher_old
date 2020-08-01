## 0.1.0
- ram setting
- hide on start
- download and run mc-versions
  (For now, the launcher always starts the 1.15.2)

## 0.1.1
- fixed startup
- fixed login window frame
- fixed updater (maybe it was already working right, dunno)
- fixed typos (there are probably more)

## 0.1.2
- Added Version selection
  (Versions 1.7.10 and 1.8.9 are bugged don't start them)
- Fixed frame disappearing after app re-opens on game close
- Fixed play button bugging during game launch
- added better vanilla page
- QOL fixes on home and vanilla pages
- changed menu colors slightly

## 0.1.3
- fixed auto-login
- fixed random logout
- fixed not validating login data
- added launcher showing all mc versions in vanilla tab
- added colors to version selection
- changed background colors slightly
- added launcher getting modpacks from software city [project-cdn](https://projects.software-city.org/resources/minecraft/modded/modpacks)
- changed sidebar style and sections

## 0.1.4
- fixed single instance lock not working correctly
- fixed Vanilla page sometimes taking an eternity to load
- fixed modpacks sometimes not loading
- fixed settings reset not reloading info on settings page
- made modpacks launchable (thanks to [Pierce01](https://github.com/Pierce01/) for his amazing and fast help)
- added profiles page
- added base code and functionality for custom version profiles

## 0.1.5
- fixed mod page not refreshing content

## 0.1.6
- fixed Forge not getting enough ram

## 0.1.7
- fixed auto-login (again)
- fixed infinite login loop
- fixed login data stall
- added error info to login page

## 0.1.8
- Fixed auto-login (hopefully this time)
- Fixed updater page bootstrap not loading
- Fixed offline page bootstrap and frame not being loaded correctly
- Fixed page-switch bugs
- Fixed login page not showing errors in case of auto-login fails
- QOL fixes

## 0.1.9
- fixed modpack being always downloaded
- added error-debug features to `launcher.js`

## 0.2.0
- completed profile overview and editor (still more to come)
- added profile feature (create/cutsomize own profiles)
- added custom profile icons and backgrounds
- each modpack now has its own folder

## 0.2.1
- fixed root folders not being created

## 0.2.2
- added some basic implementation of better custom profile version selection
- added reset-full button to settings
- fixed settings to default button deleting profiles and gameversionsaves
- some minor GUI improvements
- updated dependencies
- fixed background not loading on custom version pages

## 0.2.3
- made custom profiles version selection better
- added info to PLAY Button (INSTALL and UPDATE)
- some QOL fixes
- added docs [here](https://projects.software-city.org/docs/electron/swc_mclauncher)
- updated [`README.md`](https://github.com/Software-City/swc_mclauncher/blob/dev/README.md)

## 0.2.4
- App version is shown on settings page
- Added info page
- Added forge versions:
  - 1.12.2-14.23.5.2854
  - 1.12.2-14.23.5.2847
- Forge can now be started through custom profiles
- some more QOL fixes

## 0.2.5
- fixed an error when starting a new forge profile which forces to click start again
- fixed help menu pointing to non existent website
- Added Readme.md to Info page
- reduced app size by removing unnecessary files

## 1.0.0
- released 1.0 for windows & linux

## 1.0.1
- macOS release
- fixed a bug where the data folder couldn'n be created