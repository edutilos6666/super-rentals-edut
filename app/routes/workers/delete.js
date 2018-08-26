import Route from '@ember/routing/route';

export default Route.extend({
  model(params) {
    return this.store.findRecord('worker', params.delete_id);
  },
  actions: {
    deleteWorker() {
      let controller = this.get('controller');
      let id = parseInt(controller.get('model.id'));
      console.log(id);
      let $this = this;
      let worker = this.store.peekRecord('worker', id);
      if(worker) worker.destroyRecord().then(function() {
        controller.set('model.id', ''); 
        $this.transitionTo('workers');
      });

      // let worker = this.get('model').findBy('id', id);
      // this.store.findRecord('worker', id).then(worker=> {
      //   worker.deleteRecord();
      //   worker.save();
      // });
      // worker.deleteRecord();
      // worker.save();
      // worker.destroyRecord().then(()=> this.store.unloadRecord(worker), function(response){});
      // worker.destroyRecord().then(function(){}, function(response){});
      // worker.destroyRecord();
      // return true;
    }

  }
});
