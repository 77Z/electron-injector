const fs = require("fs");

module.exports = {
    scanDir: function(directory, fromElement) {
        var folders = getDirectories(directory);
        var files   = getFiles(directory);

        //basic initalization
        var wrapper = document.createElement("div");
        wrapper.setAttribute("class", "explorer-wrapper");

        
        var wrapperTitle = document.createElement("div");
        wrapperTitle.title = directory;
        wrapperTitle.innerHTML = directory;
        wrapperTitle.setAttribute("class", "wrapper-title");

        var foldersWrapper = document.createElement("div");
        foldersWrapper.setAttribute("class", "wrapper-section-folders");

        var filesWrapper = document.createElement("div");
        filesWrapper.setAttribute("class", "wrapper-section-files");
        //end

        for(var i = 0; i < folders.length; i++) {
            var folder = document.createElement("div");
            folder.setAttribute("class", "folder");
            
            var iconwrap = document.createElement("div");
            iconwrap.setAttribute("class", 'icon-wrap');
            iconwrap.innerHTML = "<img src='../img/icons/svg/folder.svg'><div class='no-drag-overlay'></div>";

            var textwrap = document.createElement('div');
            textwrap.setAttribute("class", "text-wrap");
            textwrap.innerText = folders[i];

            folder.appendChild(iconwrap);
            folder.appendChild(textwrap);

            foldersWrapper.appendChild(folder);
        }

        for(var i = 0; i < files.length; i++) {
            var file = document.createElement("div");
            file.setAttribute("class", "file");

            var iconwrap = document.createElement("div");
            iconwrap.setAttribute("class", "icon-wrap");

            var preExtention = files[i].split(".");
            var fileExtention = preExtention[preExtention.length - 1];


            if(fileExtention == "js") {
                iconwrap.innerHTML = "<img src='../img/icons/svg/js_file.svg'><div class='no-drag-overlay'></div>";
            } else if (fileExtention == "html") {
                iconwrap.innerHTML = "<img src='../img/icons/svg/html_file.svg'><div class='no-drag-overlay'></div>";
            } else if (fileExtention == "css") {
                iconwrap.innerHTML = "<img src='../img/icons/svg/css_file.svg'><div class='no-drag-overlay'></div>";
            } else {
                iconwrap.innerHTML = "<img src='../img/icons/svg/img_file.svg'><div class='no-drag-overlay'></div>";
            }
            
            
            var textwrap = document.createElement("div");
            textwrap.setAttribute("class", "text-wrap");
            textwrap.innerText = files[i];

            file.appendChild(iconwrap);
            file.appendChild(textwrap);

            filesWrapper.appendChild(file);
        }

        wrapper.appendChild(wrapperTitle);
        wrapper.appendChild(foldersWrapper);
        wrapper.appendChild(filesWrapper);
        fromElement.appendChild(wrapper);
    }
};


const getDirectories = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name);


const getFiles = source =>
    fs.readdirSync(source, { withFileTypes: true })
        .filter(dirent => !dirent.isDirectory())
        .map(dirent => dirent.name);