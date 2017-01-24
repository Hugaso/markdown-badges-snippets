'use babel';

import MarkdownBadgesSnippetsView from './markdown-badges-snippets-view';
import { CompositeDisposable } from 'atom';

export default {

  markdownBadgesSnippetsView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.markdownBadgesSnippetsView = new MarkdownBadgesSnippetsView(state.markdownBadgesSnippetsViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.markdownBadgesSnippetsView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'markdown-badges-snippets:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.markdownBadgesSnippetsView.destroy();
  },

  serialize() {
    return {
      markdownBadgesSnippetsViewState: this.markdownBadgesSnippetsView.serialize()
    };
  },

  toggle() {
    console.log('MarkdownBadgesSnippets was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
