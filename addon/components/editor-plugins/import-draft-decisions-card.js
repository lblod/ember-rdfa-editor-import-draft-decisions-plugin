import { reads } from '@ember/object/computed';
import Component from '@ember/component';

/**
* Card displaying a hint of the Date plugin
*
* @module editor-import-draft-decisions-plugin
* @class ImportDraftDecisionsCard
* @extends Ember.Component
*/
export default Component.extend({
  /**
   * Region on which the card applies
   * @property location
   * @type [number,number]
   * @private
  */
  location: reads('info.location'),

  /**
   * The RDFa editor instance
   * @property editor
   * @type RdfaEditor
   * @private
  */
  editor: reads('info.editor'),

  /**
   * Hints registry storing the cards
   * @property hintsRegistry
   * @type HintsRegistry
   * @private
  */
  hintsRegistry: reads('info.hintsRegistry'),

  actions: {
    insert(){
      // TODO
/*       const info = this.args.info;
      const html = `<img src="${info.url}" property="http://mu.semte.ch/vocabularies/ext/screenshot" alt="${info.label}" />`;

      info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, "external-image" );
      const selection = info.editor.selectHighlight( info.location );
      info.editor.update( selection, {
        set: { innerHTML: html }
      }); */
    }
  }
});
