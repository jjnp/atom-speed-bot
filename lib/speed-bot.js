'use babel';

import SpeedBotView from './speed-bot-view';
import { CompositeDisposable } from 'atom';

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
      'speed-bot:toggle': () => this.toggle()
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

  toggle() {
    console.log('SpeedBot was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
