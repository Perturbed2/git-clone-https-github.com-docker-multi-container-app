"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.init = void 0;
const vscode = require("vscode");
const fs = require("fs");
const path = require("path");
const config_1 = require("./config");
const scannedExtensions = [".interface", ".sqf", ".cpp", ".h", ".hpp"];
async function init(context) {
    scanDirectory(config_1.sourcePathFolder);
}
exports.init = init;
function onFileChanged(filePath) {
    vscode.window.showInformationMessage(`Файл изменен: ${filePath}`);
}
// Отслеживание изменений в директории
function scanDirectory(directoryPath) {
    //console.debug(`Scandir:${directoryPath}`);
    fs.readdir(directoryPath, (err, files) => {
        if (err) {
            console.error(err);
            return;
        }
        for (const file of files) {
            const filePath = path.join(directoryPath, file);
            // Получение информации о файле
            fs.stat(filePath, (err, stats) => {
                if (err) {
                    console.error(err);
                    return;
                }
                if (stats.isDirectory()) {
                    // Если это директория, вызываем функцию рекурсивно
                    scanDirectory(filePath);
                }
                else if (stats.isFile()) {
                    const fileExt = path.extname(filePath).toLocaleLowerCase();
                    if (scannedExtensions.includes(fileExt)) {
                        console.log(`Added watcher ${path.relative(config_1.sourcePathFolder, filePath)}`);
                        //console.log(filePath);
                        // Если это файл, отслеживаем изменения
                        fs.watch(filePath, (event, filename) => {
                            if (event === 'change') {
                                onFileChanged(filePath);
                            }
                            else if (event === 'rename') {
                                //todo...
                            }
                        });
                    }
                }
            });
        }
    });
}
//# sourceMappingURL=projectWatch.js.map