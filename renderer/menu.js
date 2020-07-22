const { app, Menu, shell } = require('electron')
const { getVal } = require("./../settingshandler.js")
const iswin32 = process.platform === "win32"

const template = [
    {
        label: 'View',
        submenu: [
            { role: 'reload' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async() => {
                    await shell.openExternal('https://projects.software-city.org/projects/electron/swc_mclauncher')
                }
            },
            {
                label: 'GitHub',
                click: async() => {
                    await shell.openExternal('https://github.com/Software-City/swc_mclauncher')
                }
            }
        ]
    }
]

const devtemplate = [
    {
        label: 'View',
        submenu: [
            { role: 'reload' },
            { role: 'forcereload' },
            { type: 'separator' },
            { role: 'togglefullscreen' }
        ]
    },
    {
        label: 'Window',
        submenu: [
            { role: 'toggledevtools' }
        ]
    },
    {
        role: 'help',
        submenu: [
            {
                label: 'Learn More',
                click: async() => {
                    await shell.openExternal('https://projects.software-city.org/projects/electron/swc_mclauncher')
                }
            },
            {
                label: 'GitHub',
                click: async() => {
                    await shell.openExternal('https://github.com/Software-City/swc_mclauncher')
                }
            }
        ]
    }
]

var menu;
function buildMenu(){
  if(getVal("devMode")){
    menu = Menu.buildFromTemplate(devtemplate)
  }else{
    menu = Menu.buildFromTemplate(template)
  }
  Menu.setApplicationMenu(menu)
}

exports.buildMenu = buildMenu;


/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

if(iswin32){
  app.setUserTasks([])
}