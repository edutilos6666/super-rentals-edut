import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('worker', params.update_id);
  },
  actions: {
    updateWorker() {
      let controller = this.get('controller')
      let id = parseInt(controller.get('model.id'));
      console.log(`id = ${id}`);
      let name = controller.get('model.name');
      let age = parseInt(controller.get('model.age'));
      let wage = parseFloat(controller.get('model.wage'));
      let active = controller.get('model.active') === 'True' || controller.get('model.active') === 'true';
      // let worker = this.get('model').findBy('id', id);
      let $this = this;
      this.store.findRecord('worker', id).then((worker)=> {
        worker.set('name', name);
        worker.set('age', age);
        worker.set('wage', wage);
        worker.set('active', active);
        worker.save();
        controller.set('id', '');
        controller.set('name', '');
        controller.set('age', '');
        controller.set('wage', '');
        controller.set('active', ''); 
        $this.transitionTo('workers');
      });
    }
  }
});
