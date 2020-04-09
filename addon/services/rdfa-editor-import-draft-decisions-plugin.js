import { getOwner } from '@ember/application';
import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import { task } from 'ember-concurrency';

function normalizeLocation(location, reference) {
  return [location[0] + reference[0], location[1] + reference[0]];
}

export default class RdfaEditorImportDraftDecisionsPluginService extends Service {
  editorApi = "1.0"

  execute(rdfaBlocks, hintsRegistry, editor, extraInfo) {
    hintsRegistry.removeHints( { rdfaBlocks, scope: "import-draft-decisions" } );
    for (const block of rdfaBlocks) {
      const match = block.text.match("Selecteer ontwerpbesluit");
      if (match) {
        const { 0: fullMatch, 1: term, index: start } = match;
        const location = normalizeLocation( [ start, start + fullMatch.length ], block.region );
        hintsRegistry.addHint( "import-draft-decisions", {
          location,
          card: "plugins/import-draft-decisions",
          info: {
            hintsRegistry, editor, location, term
          }
        });
      }
    }
  }
}