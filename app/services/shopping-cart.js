import Service from '@ember/service';

export default Service.extend({
  items: null,
  init() {
    this._super(...arguments);
    this.set('items', ['foo', 'bar', 'bim']); 
  },
  add(item) {
    this.items.pushObject(item);
  },
  remove(item) {
    this.items.removeObject(item);
  },
  empty() {
    this.items.clear();
  }
});
