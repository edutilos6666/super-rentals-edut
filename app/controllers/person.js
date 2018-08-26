import Controller from '@ember/controller';

export default Controller.extend({
  actions: {
    createPerson() {
      let myid = parseInt(this.get('myid'));
      let name = this.get('name');
      let age = parseInt(this.get('age'));
      let wage = parseFloat(this.get('wage'));
      let active = this.get('active') === 'True' || this.get('active') === 'true';
      let newPerson = this.store.createRecord('person', {
        myid: myid,
        name: name,
        age: age ,
        wage: wage,
        active: active
      });

      newPerson.save();
    },
    readPerson() {
      let myid = parseInt(this.get('r_myid'));
      // console.log(myid);
      this.store.findRecord('person', myid).then((person)=> {
        alert(person.get('name'));
      });
    },
    updatePerson() {
      let myid = parseInt(this.get('u_myid'));
      let name = this.get('u_name');
      let age = parseInt(this.get('u_age'));
      let wage = parseFloat(this.get('u_wage'));
      let active = this.get('u_active') === 'True' || this.get('u_active') === 'true';
      let person = this.get('model').findBy('myid', myid);
      person.set('name', name);
      person.set('age', age);
      person.set('wage', wage);
      person.set('active', active);
      person.save();
    },
    deletePerson() {
      let myid = parseInt(this.get('d_myid'));
      let person = this.get('model').findBy('myid', myid);
      // person.deleteRecord();
      // person.save();
      // person.destroyRecord().then(()=> this.store.unloadRecord(person), function(response){});
      person.destroyRecord().then(function(){}, function(response){});
      // person.destroyRecord();
      // return true;
    }
  }
});
