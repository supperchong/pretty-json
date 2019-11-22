"use strict";
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import { TextEditor, TextEditorEdit } from "vscode";
import { getConfiguration } from "./util";
import * as pretty from "pretty-object-string";
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "json" is now active!');

  // The command has been defined in the package.json file
  // Now provide the implementation of the command with  registerCommand
  // The commandId parameter must match the command field in package.json
  let disposable = vscode.commands.registerTextEditorCommand(
    "extension.prettyJson",
    (textEditor: TextEditor, edit: TextEditorEdit, args: any[]) => {
      // The code you place here will be executed every time your command is executed
      //get indent from user configure, default tab
      const indent = getConfiguration();
      let selectText = textEditor.document.getText(textEditor.selections[0]);
      let prettyText: string;
      try {
        prettyText = pretty(selectText, { delComment: true, indent });
      } catch (err) {
        vscode.window.showInformationMessage(err.message);
        return;
      }

      textEditor.edit((editBuilder: TextEditorEdit) => {
        editBuilder.replace(textEditor.selections[0], prettyText);
      });
      // Display a message box to the user
      // vscode.window.showInformationMessage('Hello World!');
    }
  );

  context.subscriptions.push(disposable);
}

// this method is called when your extension is deactivated
export function deactivate() {}
