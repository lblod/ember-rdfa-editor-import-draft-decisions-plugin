import { getOwner } from '@ember/application';
import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import isEmpty from '@lblod/ember-rdfa-editor/utils/is-empty'

export default class RdfaEditorImportDraftDecisionsPluginService extends Service {
  editorApi = "0.1"
  @service store;

  async execute(rdfaBlocks, hintsRegistry, editor, extraInfo) {
    hintsRegistry.removeHints( { rdfaBlocks, scope: "import-draft-decisions" } );

    for (const block of rdfaBlocks) {
      const location = block.region;
      const selection = editor.selectContext( block.region, {
        property: "http://mu.semte.ch/vocabularies/ext/draftDecisionsHint"
      });

      if (!isEmpty(selection)) {
        hintsRegistry.addHint( "import-draft-decisions", {
          location,
          card: "editor-plugins/import-draft-decisions-card",
          info: {
            hintsRegistry, editor, location
          }
        });
      }
    }
  }
}
