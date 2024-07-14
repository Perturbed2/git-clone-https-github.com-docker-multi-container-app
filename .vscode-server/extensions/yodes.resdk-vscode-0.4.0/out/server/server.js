"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const main_1 = require("vscode-languageserver/lib/node/main");
//import { getLanguageModes, LanguageModes } from './languageModes';
const vscode_languageserver_textdocument_1 = require("vscode-languageserver-textdocument");
// Create a connection for the server. The connection uses Node's IPC as a transport.
// Also include all preview / proposed LSP features.
const connection = (0, main_1.createConnection)(main_1.ProposedFeatures.all);
// Create a simple text document manager. The text document manager
// supports full document sync only
const documents = new main_1.TextDocuments(vscode_languageserver_textdocument_1.TextDocument);
connection.onInitialize((_params) => {
    console.log("YEEEEEES!");
    return {
        capabilities: {
            textDocumentSync: main_1.TextDocumentSyncKind.Full,
            // Tell the client that the server supports code completion
            completionProvider: {
                resolveProvider: false
            }
        }
    };
});
documents.listen(connection);
// Listen on the connection
connection.listen();
//# sourceMappingURL=server.js.map