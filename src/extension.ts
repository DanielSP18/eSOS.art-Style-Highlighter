// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// Define decorator for bold text
const boldDecorator = vscode.window.createTextEditorDecorationType({
    fontWeight: 'bold'
});

// Define decorator for italic text
const italicDecorator = vscode.window.createTextEditorDecorationType({
    fontStyle: 'italic'
});

function applyTextDecorations(editor: vscode.TextEditor) {
    const text = editor.document.getText();
    const boldRanges: vscode.DecorationOptions[] = [];
    const italicRanges: vscode.DecorationOptions[] = [];

    // Regular expressions for matching your patterns
    const boldPattern = /^-\w+/gm; // Adjust the pattern as needed
    const italicPattern = /__\w+/g; // Adjust the pattern as needed

    let match;
    while ((match = boldPattern.exec(text))) {
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        const decoration = { range: new vscode.Range(startPos, endPos) };
        boldRanges.push(decoration);
    }

    while ((match = italicPattern.exec(text))) {
        const startPos = editor.document.positionAt(match.index);
        const endPos = editor.document.positionAt(match.index + match[0].length);
        const decoration = { range: new vscode.Range(startPos, endPos) };
        italicRanges.push(decoration);
    }

    // Apply the decorations
    editor.setDecorations(boldDecorator, boldRanges);
    editor.setDecorations(italicDecorator, italicRanges);
}

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	//console.log('Congratulations, your extension "esos-styling" is now active!');

	if (vscode.window.activeTextEditor) {
        applyTextDecorations(vscode.window.activeTextEditor);
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            applyTextDecorations(editor);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (vscode.window.activeTextEditor && event.document === vscode.window.activeTextEditor.document) {
            applyTextDecorations(vscode.window.activeTextEditor);
        }
    }, null, context.subscriptions);

	// The command has been defined in the package.json file
	// Now provide the implementation of the command with registerCommand
	// The commandId parameter must match the command field in package.json
	// let disposable = vscode.commands.registerCommand('esos-styling.helloWorld', () => {
	// 	// The code you place here will be executed every time your command is executed
	// 	// Display a message box to the user
	// 	vscode.window.showInformationMessage('Hello World from eSOS_Styling!');
	// });

	// context.subscriptions.push(disposable);
}


// This method is called when your extension is deactivated
export function deactivate() {}
