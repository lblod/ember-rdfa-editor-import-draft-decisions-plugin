import Model, {  belongsTo, hasMany } from '@ember-data/model';

export default class DocumentContainer extends Model {
  @hasMany( 'editor-document', { inverse: 'documentContainer' } ) revisions;
  @belongsTo( 'editor-document', { inverse: null } ) currentVersion;
  @belongsTo('editor-document-status', {inverse: null }) status;
  @belongsTo('editor-document-folder', {inverse: null }) folder;
  @belongsTo('bestuurseenheid', {inverse: null }) publisher;
  @hasMany('versioned-agenda') versionedAgendas;
  @hasMany('versioned-notulen') versionedNotulen;
  @hasMany('versioned-besluiten-lijst') versionedBesluitenLijsten;
  @hasMany('versioned-behandelingen') versionedBehandelingen;
};
