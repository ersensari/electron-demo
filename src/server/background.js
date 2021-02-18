"use strict";

import { app, protocol, BrowserWindow, Menu, ipcMain } from "electron";
import { createProtocol } from "vue-cli-plugin-electron-builder/lib";
import electronLocalshortcut from "electron-localshortcut";

import todoRepo from "./repositories/todo";

const isDevelopment = process.env.NODE_ENV !== "production";

//import { connect } from './database';

// Scheme must be registered before the app is ready
protocol.registerSchemesAsPrivileged([
  { scheme: "app", privileges: { secure: true, standard: true } }
]);

async function createWindow() {
  // Create the browser window.
  const win = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,
    webPreferences: {
      contextIsolation: false,
      nodeIntegration: true,
      enableRemoteModule: true
    }
  });

  win.on("focus", event => {
    electronLocalshortcut.register(
      win,
      ["CommandOrControl+R", "CommandOrControl+Shift+R", "F5"],
      () => {}
    );
  });

  win.on("blur", event => {
    electronLocalshortcut.unregisterAll(win);
  });

  if (process.env.WEBPACK_DEV_SERVER_URL) {
    // Load the url of the dev server if in development mode
    await win.loadURL(process.env.WEBPACK_DEV_SERVER_URL);
    if (!process.env.IS_TEST) {
      win.webContents.openDevTools();
    }
  } else {
    createProtocol("app");
    // Load the index.html when not in development
    win.loadURL("app://./index.html");
  }
}

async function setMainMenu() {
  const template = [
    {
      label: "ToDo App",
      submenu: [
        {
          label: "Quit",
          role: "quit"
        }
      ]
    }
  ];
  Menu.setApplicationMenu(Menu.buildFromTemplate(template));
}

// Quit when all windows are closed.
app.on("window-all-closed", () => {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) createWindow();
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on("ready", async () => {
  createWindow();
  setMainMenu();
});

ipcMain.on("saveTodo", async (event, todo) => {
  const data = await todoRepo.mutations.save(todo);
  event.reply("saveTodoCompleted", data.dataValues);
});

ipcMain.on("updateTodo", async (event, todo) => {
  await todoRepo.mutations.update(JSON.parse(todo));
  event.reply("updateTodoCompleted");
});

ipcMain.on("deleteTodo", async (event, id) => {
  await todoRepo.mutations.delete(id);
  event.reply("deleteTodoCompleted");
});

ipcMain.on("getTodos", async event => {
  const data = await todoRepo.queries.findAll();
  event.reply(
    "getTodosCompleted",
    data.map(x => x.dataValues)
  );
});

// app.whenReady().then(() => {
//   if (isDevelopment && !process.env.IS_TEST) {
//     // Install Vue Devtools
//     try {
//       installExtension(VUEJS_DEVTOOLS);
//     } catch (e) {
//       console.error('Vue Devtools failed to install:', e.toString());
//     }
//   }
// });

// Exit cleanly on request from parent process in development mode.
if (isDevelopment) {
  if (process.platform === "win32") {
    process.on("message", data => {
      if (data === "graceful-exit") {
        app.quit();
      }
    });
  } else {
    process.on("SIGTERM", () => {
      app.quit();
    });
  }
}
