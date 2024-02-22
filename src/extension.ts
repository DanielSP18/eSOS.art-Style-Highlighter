// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

const ruleTitleDecorator = vscode.window.createTextEditorDecorationType({
    fontWeight: 'bold',
    color: '#0088ff'
});

const separatorDecorator = vscode.window.createTextEditorDecorationType({
    color: '#00bb00'
});

const integratedDecorator = vscode.window.createTextEditorDecorationType({
    fontStyle: 'italic',
    color: '#FFA500'
});

const parameterDecorator = vscode.window.createTextEditorDecorationType({
    color: '#e00280'
});

const arrowDecorator = vscode.window.createTextEditorDecorationType({
    color: '#00bb00'
});

function applyDecorations(editor: vscode.TextEditor) {

    // Check if the current editor's document is of the 'esos' language
    if (editor.document.languageId !== 'esos') {
        return; // Exit the function if not 'esos'
    }

    const text = editor.document.getText();
    const ruleTitles: vscode.DecorationOptions[] = [];
    const separators: vscode.DecorationOptions[] = [];
    const integrateds: vscode.DecorationOptions[] = [];
    const parameters: vscode.DecorationOptions[] = [];
    const arrows: vscode.DecorationOptions[] = [];

    const ruleTitlePattern = /^-\w+/gm;
    const separatorPattern = /^---/gm;
    const integratedPattern = /__\w+/g;
    const parameterPattern = /_\w+/g;
    const arrowPattern = /->/g;

    const addDecorations = (pattern: RegExp, decoratorArray: vscode.DecorationOptions[], decorator: vscode.TextEditorDecorationType) => {
        let match;
        while ((match = pattern.exec(text))) {
            const startPos = editor.document.positionAt(match.index);
            const endPos = editor.document.positionAt(match.index + match[0].length);
            const decoration: vscode.DecorationOptions = { range: new vscode.Range(startPos, endPos) };
            decoratorArray.push(decoration);
        }
        editor.setDecorations(decorator, decoratorArray);
    };

    addDecorations(ruleTitlePattern, ruleTitles, ruleTitleDecorator);
    addDecorations(separatorPattern, separators, separatorDecorator);
    addDecorations(integratedPattern, integrateds, integratedDecorator);
    addDecorations(parameterPattern, parameters, parameterDecorator);
    addDecorations(arrowPattern, arrows, arrowDecorator);
}

export function activate(context: vscode.ExtensionContext) {
    let activeEditor = vscode.window.activeTextEditor;
    if (activeEditor) {
        applyDecorations(activeEditor);
    }

    vscode.window.onDidChangeActiveTextEditor(editor => {
        if (editor) {
            activeEditor = editor;
            applyDecorations(activeEditor);
        }
    }, null, context.subscriptions);

    vscode.workspace.onDidChangeTextDocument(event => {
        if (activeEditor && event.document === activeEditor.document) {
            applyDecorations(activeEditor);
        }
    }, null, context.subscriptions);
}


