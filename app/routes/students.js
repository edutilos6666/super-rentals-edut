import Route from '@ember/routing/route';
import Student from 'super-rentals/models/student';


export default Route.extend({
  model() {
    return [
      Student.create({id:1, name:'foo',age: 10,wage: 100.0,active: true}),
      Student.create({id:2, name:'bar', age:20, wage:200.0, active:false}),
      Student.create({id:3, name:'bim', age:30, wage:300.0, active:true})
    ];
  }
});
