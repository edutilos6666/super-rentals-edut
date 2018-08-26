import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('about');
  this.route('contact');
  this.route('rentals', function() {
    // this.route('show');
    this.route('show', {path: '/:rental_id'});
  });
  this.route('person');
  this.route('workers', function() {
    this.route('create');
    this.route('update', {path: '/:update_id'});
    this.route('delete', {path: '/:delete_id'});
    this.route('details', {path: '/:details_id'});
  });
});

export default Router;
