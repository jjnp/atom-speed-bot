'use babel';

import SpeedBotView from './speed-bot-view';
import { CompositeDisposable } from 'atom';
import Utils from './utils';

export default {

  speedBotView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.speedBotView = new SpeedBotView(state.speedBotViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.speedBotView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'speed-bot:boost': () => this.boost()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.speedBotView.destroy();
  },

  serialize() {
    return {
      speedBotViewState: this.speedBotView.serialize()
    };
  },

  boost() {
    /** get the editor */
    let editor;
    if (editor = atom.workspace.getActiveTextEditor()) {
      //editor.insertText('kek');


      /** get the current line */
      var cursorPosition = editor.getCursorBufferPosition();

      var currentLine = String(editor.lineTextForBufferRow(cursorPosition.row));
      if (currentLine.match(/function(\s[\w]*)?$/)) {
          Utils.appendWithBrackets(editor, currentLine);

      } else if (currentLine.match(/function(\s[\w]*)?[(][^()]*[)]?[\s]?$/)) {
          Utils.appendWithoutBrackets(editor, currentLine);

      } else if (currentLine.match(/if[\s]?$/)) {
        Utils.appendWithBrackets(editor, currentLine);

      } else if (currentLine.match(/if[\s]?[(][^()]*[)]?[\s]?$/)) {
        Utils.appendWithoutBrackets(editor, currentLine);

      } else if (currentLine.match(/[(][^()]*[)][\s]?=>[\s]?$/)) {
        Utils.appendWithoutBrackets(editor, currentLine);

      } else {
        editor.moveToEndOfLine();
        editor.insertText(';');
      }



    }
  }

};
