import { reads } from '@ember/object/computed';
import Component from '@ember/component';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class ImportDrafDecisionsCard extends Component {
  @tracked info

  /**
   * Region on which the card applies
   * @property location
   * @type [number,number]
   * @private
  */
  get location() {
    return info.location;
  }

  /**
   * The RDFa editor instance
   * @property editor
   * @type RdfaEditor
   * @private
  */
  get editor() {
    return info.editor;
  }

  /**
   * Hints registry storing the cards
   * @property hintsRegistry
   * @type HintsRegistry
   * @private
  */
  get hintsRegistry() {
    return info.hintsRegistry
  }

  @action
  insert(draftDecision) {
    const info = this.info;
    const html = info;

    info.hintsRegistry.removeHintsAtLocation( info.location, info.hrId, "draft-decisions" );
    const selection = info.editor.selectHighlight( info.location );
    info.editor.update( selection, {
      set: { innerHTML: html }
    });
  }
};
