import { reads } from '@ember/object/computed';
import Component from '@glimmer/component';
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";
import { restartableTask } from 'ember-concurrency-decorators';
import EmberObject from '@ember/object';
import { inject as service } from '@ember/service';

export default class ImportDrafDecisionsCard extends Component {
  @service store;
  @tracked info;
  @tracked draftDecisions;
  @tracked popup = false;

  /**
   * Region on which the card applies
   * @property location
   * @type [number,number]
   * @private
  */
  get location() {
    return info.args.location;
  }

  /**
   * The RDFa editor instance
   * @property editor
   * @type RdfaEditor
   * @private
  */
  get editor() {
    return info.args.editor;
  }

  /**
   * Hints registry storing the cards
   * @property hintsRegistry
   * @type HintsRegistry
   * @private
  */
  get hintsRegistry() {
    return info.args.hintsRegistry;
  }

  constructor() {
    super(...arguments);
    this.filter = EmberObject.create({
      title: '',
      page: 0,
      size: 2,
      sort: '-current-version.updated-on',
    });

    // Setup observers for 2-way binded values of ember-data-table
    this.filter.addObserver('page', this, 'onDataTableParamChange'); // eslint-disable-line ember/no-observers
    this.filter.addObserver('size', this, 'onDataTableParamChange'); // eslint-disable-line ember/no-observers
    this.filter.addObserver('sort', this, 'onDataTableParamChange'); // eslint-disable-line ember/no-observers
    this.filter.addObserver('title', this, 'onDataTableParamChange'); // eslint-disable-line ember/no-observers
    this.search.perform(this.filter);
  }

  willDestroy() {
    this.filter.removeObserver('page', this, 'onDataTableParamChange');
    this.filter.removeObserver('size', this, 'onDataTableParamChange');
    this.filter.removeObserver('sort', this, 'onDataTableParamChange');
    this.filter.removeObserver('title', this, 'onDataTableParamChange');
  }

  onDataTableParamChange() {
    this.search.perform(this.filter);
  }

  @restartableTask
  *search(filter) {
    const queryFilter = {
      page: {
        size: filter.size,
        number: filter.page
      },
      sort: filter.sort,
      include: 'current-version',
      'filter[folder][:uri:]': "http://mu.semte.ch/application/editor-document-folder/ae5feaed-7b70-4533-9417-10fbbc480a4c"
    };

    if (filter.title.length > 0) {
      queryFilter.filter = { 'current-version': { 'title': filter.title } };
    }
    this.draftDecisions = yield this.store.query('document-container', queryFilter);
  }

  @action
  async insert(document) {
    const info = this.args.info;
    const html = info;
    const content = await document.content.content;

    info.hintsRegistry.removeHints( { region: info.location, scope: "import-draft-decisions" } );

    const selection = info.editor.selectHighlight( info.location );
    info.editor.update( selection, {
      set: { innerHTML: content }
    });
  }

  @action
  togglePopup() {
    this.popup = !this.popup;
  }
};
