const detectInstalled = require('detect-installed');
const asar = require("asar");
const {ipcRenderer} = require('electron');
const os = require('os');
const fs = require("fs");

var editor;
var destname = Math.random().toString().split(".")[1];

window.onload = function() {
    const epkgexists = detectInstalled.sync("electron-builder");
    if (!epkgexists) {
        console.error("Electron builder is not installed! showing dialog...");
        document.getElementById("package-check").style.display = "block";
    } else {
        console.log("Electron builder is installed");
    }


    editor = CodeMirror.fromTextArea(document.getElementById("codemirror-area"), {
        lineNumbers: true,
        theme: 'material',
        extraKeys: {"Ctrl-Space" : "autocomplete"},
        autoCloseBrackets: true,
        indentUnit: 4,
        tabSize: 4,
        direction: 'ltr',
        lineWrapping: true,
        foldCode: true,
        foldGutter: true,
        gutters: ["CodeMirror-lint-markers", "CodeMirror-linenumbers", "CodeMirror-foldgutter"],
        lint: true
    });

    editor.on("keypress", function(cm, event) {
        if (!cm.state.completionActive &&
            event.charCode != 13 && event.charCode != 123) {
                CodeMirror.commands.autocomplete(cm, null, {completeSingle: false});
            }
    });
};


function loggit() {
    const loggit = {};

    loggit.changeLanguage = function() {
        const changeLanguage = {};

        changeLanguage.html = function() {
            editor.setOption("mode", "htmlmixed");
        };

        return changeLanguage;
    };

    return loggit;
}

function electronInjector() {
    const ei = {};

    ei.decompileASAR = function(fileLoc) {
        fs.mkdirSync(os.homedir + "\\AppData\\Electron Injector\\" + destname);
        asar.extractAll(fileLoc + "\\resources\\app.asar", os.homedir + "\\AppData\\Electron Injector\\" + destname);
    };

    ei.selectApp = function() {
        ipcRenderer.send('open-file-dialog');
    };

    return ei;
}


ipcRenderer.on('selected-directory', (event, path) => {
    electronInjector().decompileASAR(path);
});
