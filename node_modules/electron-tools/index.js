const {shell, screen} = require("electron");
const os = require('os');
const child_process = require("child_process");
const fs = require("fs");

module.exports = {
    openLink: function(link) {
        if (typeof link !== "string") throw new TypeError("Only strings are accepted");
        shell.openExternal(link);
    },
    openExplorer: function(dir) {
        if (dir == undefined) {
            shell.showItemInFolder(os.homedir());
        } else {
            if (typeof dir !== "string") throw new TypeError("Only strings are accepted");
            shell.showItemInFolder(dir);
        }
    },
    getPrimaryDisplaySize: function() {
        return screen.getPrimaryDisplay().size;
    },
    moveMouse: function(x, y) {
        if (typeof x !== "number" || typeof y !== "number") throw new TypeError("Only numbers are accepted");

        child_process.exec("node_modules\\electron-tools\\aet.exe --moveMouse " + x + " " + y, (error, stdout, stderr) => {
            if (error) {
                console.error(`execute error: ${error}`);
            }
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    },
    openNotepad: function() {
        child_process.exec("notepad.exe");
    },
    openRegistry: function() {
        child_process.exec("regedit");
    },
    openTerminal: function() {
        child_process.exec("cmd");
    },
    runCommand: function(commandToRun) {
        child_process.exec(commandToRun);
    },
    runCommandInTerminal: function(commandToRunInNewTerminal) {

        //var fileLoc = os.homedir() + "\\AppData\\Local\\Temp\\electron-tools-cmd-window" + Math.random + ".bat";

        //fs.writeFile(fileLoc, commandToRunInNewTerminal, function (err) {
        //    if (err) throw err;
        //    child_process.execFile(fileLoc, function(error, stdout, stderr) {
        //        if (error) console.log(`execute err: ${error}`);
        //        console.log(`stdout: ${stdout}`);
        //        console.log(`stderr: ${stderr}`);
        //    });
        //});
        child_process.execFile("start cmd /k" + commandToRunInNewTerminal, function(error, stdout, stderr) {
            if (error) console.log(`execute err: ${error}`);
            console.log(`stdout: ${stdout}`);
            console.log(`stderr: ${stderr}`);
        });
    },
    simulateKeypress: function(keys) {
        child_process.exec("cscript.exe node_modules\\electron-tools\\keypress.vbs /keys:" + keys);
    },
    screenshot: function() {


        //TODO: ADD SCREENSHOT FUNCTION


    },
    click: function(mousebtn, x, y) {
        if (typeof mousebtn !== "string") throw new TypeError("Must be string left or right");
        if (typeof x !== "number" || typeof y !== "number") throw new TypeError("x and/or y must be integers");

        if (mousebtn == "left") {
            child_process.exec("node_modules\\electron-tools\\aet.exe --mouseClick " + x + " " + y);
        } else if (mousebtn == "right") {
            //TODO: add rightclick function in C#
        } else {
            throw new TypeError("mousebtn must be left or right");
        }
    }
};