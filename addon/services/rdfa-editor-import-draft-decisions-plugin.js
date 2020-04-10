import { getOwner } from '@ember/application';
import Service from '@ember/service';
import EmberObject, { computed } from '@ember/object';
import { task } from 'ember-concurrency';
import { inject as service } from '@ember/service';

function normalizeLocation(location, reference) {
  return [location[0] + reference[0], location[1] + reference[0]];
}

function getBestuursorgaanUri(rdfaBlocks) {
  for (const block of rdfaBlocks) {
    const triples = block.context;
    const zitting = triples.find((triple) => triple.object === 'http://data.vlaanderen.be/ns/besluit#Zitting');
    if (zitting) {
      const bestuursorgaan = triples.find((triple) => triple.subject === zitting.subject && triple.predicate === 'http://data.vlaanderen.be/ns/besluit#isGehoudenDoor');
      if (bestuursorgaan) {
        return bestuursorgaan.object;
      }
    }
  }
  return null;
}

export default class RdfaEditorImportDraftDecisionsPluginService extends Service {
  editorApi = "1.0"
  @service store;

  async execute(rdfaBlocks, hintsRegistry, editor, extraInfo) {
    hintsRegistry.removeHints( { rdfaBlocks, scope: "import-draft-decisions" } );
    for (const block of rdfaBlocks) {
      if (block.text) {
        const match = block.text.match("Selecteer ontwerpbesluit");

        if (match) {
          const { 0: text, index: start } = match;
          const location = normalizeLocation( [ start, start + text.length ], block.region );
          const bestuursorgaanUri = getBestuursorgaanUri(rdfaBlocks);
          const bestuurseenheid = (await this.store.query('bestuurseenheid',
            { 'filter[bestuursorganen][heeft-tijdsspecialisaties][:uri:]': bestuursorgaanUri }
          )).firstObject;

          hintsRegistry.addHint( "import-draft-decisions", {
            location,
            card: "editor-plugins/import-draft-decisions-card",
            info: {
              hintsRegistry, editor, location, bestuurseenheid
            }
          });
        }
      }
    }
  }
}