'use babel';

import BadgesSnippetsView from './badges-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  badgesSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.badgesSnippetsView = new BadgesSnippetsView(state.badgesSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.badgesSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'badges-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.badgesSnippetsView.destroy();
  },

  serialize() {
    return {
      badgesSnippetsViewState: this.badgesSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('BadgesSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
