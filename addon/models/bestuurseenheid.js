import Model, { attr, belongsTo, hasMany } from '@ember-data/model';

export default class Bestuurseenheid extends Model {
  @attr naam;
  @belongsTo('bestuurseenheid-classificatie-code', { inverse: null }) classificatie;
  @hasMany('bestuursorgaan', { inverse: 'bestuurseenheid' }) bestuursorganen;
  @attr uri;

  rdfaBindings = { // eslint-disable-line ember/avoid-leaking-state-in-ember-objects
    naam: "http://www.w3.org/2004/02/skos/core#prefLabel",
    class: "http://data.vlaanderen.be/ns/besluit#Bestuurseenheid",
    werkingsgebied: "http://data.vlaanderen.be/ns/besluit#werkingsgebied",
    bestuursorgaan: "http://data.vlaanderen.be/ns/besluit#bestuurt",
    classificatie: "http://data.vlaanderen.be/ns/besluit#classificatie"
  }
};
