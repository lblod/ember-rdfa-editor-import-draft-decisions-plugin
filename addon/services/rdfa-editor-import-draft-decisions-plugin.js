import Service from '@ember/service';
import { A } from '@ember/array';

export default class RdfaEditorImportDraftDecisionsPluginService extends Service {
  editorApi = "0.1"
  draftDecisionProperty = 'http://mu.semte.ch/vocabularies/ext/draftDecisionsHint'

  async execute(rdfaBlocks, hintsRegistry, editor) {
    hintsRegistry.removeHints( { rdfaBlocks, scope: "import-draft-decisions" } );

    for (const block of rdfaBlocks) {
      const location = block.region;

      const contextResult = this.detectRelevantContext(block);

      if (contextResult) {
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

  detectRelevantContext({ semanticNode }) {
    if (semanticNode.rdfaAttributes && semanticNode.rdfaAttributes.properties) {
      const properties = semanticNode.rdfaAttributes.properties || A();
      if (properties.includes(this.draftDecisionProperty)) {
        return semanticNode;
      }
    }
    return null;
  }
}
