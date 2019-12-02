# Electron Tools
Tools to make your life easier while making an electron application

![npm](https://img.shields.io/npm/v/electron-tools)
![NPM](https://img.shields.io/npm/l/electron-tools)
![GitHub repo size](https://img.shields.io/github/repo-size/77Z/electron-tools)
![GitHub issues](https://img.shields.io/github/issues/77Z/electron-tools)
![Platforms](https://img.shields.io/badge/Platforms-Windows-green)

# Docs
This section is the documentation for Electron Tools

To get started, you're gonna need the package. To get it, you need NPM. If you're looking at this page, we expect that you're somewhat expirenced with Electron.

## Install

To install Electron Tools type `npm i electron-tools` into your terminal.

If Electron isn't already installed in your project, NPM will install it for you before installing Electron Tools.

Electron Tools is currently only being tested in the renderer process.

## Setup

To get Electron Tools setup in your project, like any other Node Module, all you have to do is require it in the renderer process.
```javascript
const et = require("electron-tools");
```

That's all there is to getting it in your project.

## Functions and calling them

As of writing this, electron tools is on version 2.0.0. So some things may change.

To call a function you must use that name of the constant you used earlier. We used `et`.

Use that name and then .whatEverFunction();

Example:
```javascript
et.openLink("https://github.com/77Z/electron-tools");
```

Functions:

| Function     | Description                                      | Arguments/Params    |
|:-------------|:-------------------------------------------------|--------------------:|
| openLink     | Opens a link in the default browser              | string link         |
| openExplorer | Opens a directory in File Explorer               | string dir          |
| getPrimaryDisplaySize | Gets the size of the primary display in pixels | none         |
| moveMouse    | Moves the mouse cursor to the set location       | int x, int y        |
| openNotepad  | Opens the notepad app                            | none                |
| openRegistry | Opens the system registry                        | none                |
| openTerminal | Opens the command prompt                         | none                |
| runCommand   | Runs a command in the terminal                   | string commandToRun |
| simulateKeypress | Presses a key on the users keyboard. Spacebar is not yet supported| string keys |
| screenshot(not done) | Takes a screenshot                       | none                |
| click (beta) | Not enough testing has been done. Makes the user click on a specific pixel | mousebtn(only left supported right now) string(left or right), int x, int y |

