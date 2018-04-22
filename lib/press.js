'use babel';

import {CompositeDisposable} from 'atom'

export default {

  subscriptions: null,

  activate() {
    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'press:addCodeBlock': () => this.addCodeBlock()
    }));
  },

  deactivate() {
    this.subscriptions.dispose();
  },

  addCodeBlock() {
    let editor
    if (editor = atom.workspace.getActiveTextEditor()) {
      // Press detects your source's language to tag the code block
      // but in some cases, might opt not to try
      let detectLanguage = true
      let title = editor.getTitle()

      // Rather than an `.endsWith` check, we reverse the dot-split
      // file name so we can get the language for literate source
      titleComponents = title.split('.').reverse()

      // If there's less than three components in the title,
      // there's not enough info to detect a language
      if (titleComponents.length < 3) detectLanguage = false

      // If we're detecting the language, the second-to-last component
      // is assumed to be the language, as the last is assumed to be
      // the Markdown extension. Build & tag the code block.
      let codeBlock = `\`\`\`${detectLanguage ? titleComponents[1] : ''}

\`\`\``

      // Add our tagged code block & move the cursor inside
      editor.insertText(codeBlock)
      editor.moveUp()
    }
  }
};
