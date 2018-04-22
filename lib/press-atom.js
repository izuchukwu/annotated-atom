'use babel';

import PressAtomView from './press-atom-view';
import { CompositeDisposable } from 'atom';

export default {

  pressAtomView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.pressAtomView = new PressAtomView(state.pressAtomViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.pressAtomView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'press-atom:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.pressAtomView.destroy();
  },

  serialize() {
    return {
      pressAtomViewState: this.pressAtomView.serialize()
    };
  },

  toggle() {
    console.log('PressAtom was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
