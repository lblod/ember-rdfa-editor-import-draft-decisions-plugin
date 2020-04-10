import Model, { attr, hasMany } from '@ember-data/model';
import defaultContext from '../config/editor-document-default-context';

export default class EditorDocument extends Model {
  @attr uri;
  @attr title;
  @attr content;
  @attr('string', { defaultValue: defaultContext }) context;
  @attr('datetime') createdOn;
  @attr('datetime') updatedOn;
  @attr starred;
  @attr origin;
  @belongsTo('editor-document', {inverse: 'nextVersion'}) previousVersion;
  @belongsTo('editor-document', {inverse: 'previousVersion'}) nextVersion;
  @belongsTo('document-container', {inverse: 'revisions'}) documentContainer;
};
