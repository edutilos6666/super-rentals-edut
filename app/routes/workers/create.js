import Route from '@ember/routing/route';

export default Route.extend({
  model() {
    console.log('inside workers.create model hook');
  },
  actions: {
    createWorker() {
      let controller = this.get('controller');
      let id = parseInt(controller.get('id'));
      let name = controller.get('name');
      let age = parseInt(controller.get('age'));
      let wage = parseFloat(controller.get('wage'));
      let active = controller.get('active') === 'True' || controller.get('active') === 'true';
      let newWorker = this.store.createRecord('worker', {
        id: id,
        name: name,
        age: age ,
        wage: wage,
        active: active
      });
      newWorker.save();
      controller.set('id', '');
      controller.set('name', '');
      controller.set('age', '');
      controller.set('wage', '');
      controller.set('active', ''); 
      this.transitionTo('workers');
  }
}
});
