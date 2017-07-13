'use babel';

export default {
  appendWithBrackets(editor, line) {
    const editorBaseline = editor.getCursorBufferPosition().row;
    const baseIndentation = editor.indentationForBufferRow(editorBaseline);
    editor.moveToEndOfLine();

    /** append missing space */
    if (!line.endsWith(' ')) {
      editor.insertText(' ');
    }

    let tempPos = editor.getCursorBufferPosition();
    editor.insertText('() {\n\n}');

    editor.setIndentationForBufferRow(editorBaseline + 1, baseIndentation + 1);
    editor.setIndentationForBufferRow(editorBaseline + 2, baseIndentation);

    editor.setCursorBufferPosition(tempPos);
    editor.moveRight(1);

  },

  appendWithoutBrackets(editor, line) {
    const editorBaseline = editor.getCursorBufferPosition().row;
    const baseIndentation = editor.indentationForBufferRow(editorBaseline);
    editor.moveToEndOfLine();

    /** append missing space */
    if (!line.endsWith(' ')) {
      editor.insertText(' ');
    }

    let tempPos = editor.getCursorBufferPosition();
    editor.insertText('{\n\n}');
    editor.setIndentationForBufferRow(editorBaseline + 1, baseIndentation + 1);
    editor.setIndentationForBufferRow(editorBaseline + 2, baseIndentation);
    editor.moveUp(1);
    editor.moveToEndOfLine();
  }
};
