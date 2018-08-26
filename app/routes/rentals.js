import Route from '@ember/routing/route';
import EmberObject from '@ember/object';
import {computed} from '@ember/object';
import {equal, filterBy} from '@ember/object/computed';
import Component from '@ember/component';
import {observer} from '@ember/object';

const Person = EmberObject.extend({
  say(thing) {
    console.log(`${this.name} says: ${thing}`);
  }
});


const Soldier = Person.extend({
  init() {
    console.log("init() method was called for Soldier class.");
    this._super(...arguments);
  },
  say(thing) {
    this._super(`${thing}, sir!`);
  }
});

const SharedPerson = EmberObject.extend({
  shoppingList: ['eggs', 'cheese']
});

const NotSharedPerson = EmberObject.extend({
  init() {
    this.set('shoppingList', ['eggs', 'cheese']);
    this._super(...arguments);
  }
});

const Worker = EmberObject.extend({
  id: 1,
  name: "foo",
  age: 10,
  wage: 100.0,
  active: true,
  printProps() {
    console.log(`[${this.id}, ${this.name}, ${this.age}, ${this.wage}, ${this.active}]`);
  }
});

const Student = EmberObject.extend({
  printProps() {

  }
});
Student.reopen({
  id: 1,
  name: 'foo',
  age: true,
  printProps() {
    console.log(`${this.id}, ${this.name}, ${this.age}`);
    this._super();
  }
});

const StaticPerson = EmberObject.extend({});
StaticPerson.reopenClass({
  isPerson: false
});
StaticPerson.reopen({
  isPerson:true
});


const ComputedPerson = EmberObject.extend({
  firstName: null,
  lastName: null,
  fullName: computed('firstName', 'lastName', function() {
    console.log('compute fullName');
    return this.firstName+ ' '+ this.lastName;
  })
});

const ComputedPerson2 = EmberObject.extend({
  baz: {foo: 'edu', bar: 'tilos'},
  sm: computed('baz.{foo,bar}', function() {
    return `${this.baz.foo} ${this.baz.bar}`;
  })
})


//chaining computed properties
const ComputedPerson3 = EmberObject.extend({
  firstName: null ,
  lastName: null,
  age: null,
  country: null,
  fullName: computed('firstName', 'lastName', function() {
    console.log('computing fullName');
    return `${this.firstName} ${this.lastName}`;
  }),
  description: computed('fullName', 'age', 'country', function() {
    console.log('computing description');
    return `${this.fullName} ${this.age} ${this.country}`;
  })
});


//setting computed property
const ComputedPerson4 = EmberObject.extend({
  firstName: null,
  lastName: null,
  fullName: computed('firstName', 'lastName',  {
    get(key) {
      return `${this.firstName} ${this.lastName}`;
    },
    set(key, value) {
      console.log(value);
      let [firstName, lastName] = value.split(/\s+/);
      this.set('firstName', firstName);
      this.set('lastName', lastName);
      return value;
    }
  })
});

const ComputedPerson5 = EmberObject.extend({
  firstName: null,
  lastName: null ,
  fullName: computed('firstName', 'lastName', function() {
    return `${this.firstName} ${this.lastName}`;
  }),
  isEqualToFoobar0: computed('fullName', function() {
    return this.fullName === 'foo bar';
  }),
  isEqualToFooBar: equal('fullName', 'foo bar')
});


const TodoList = EmberObject.extend({
  todos: null,
  init() {
    this.set('todos', [
      EmberObject.create({title: 'foo', isDone:true}),
      EmberObject.create({title:'bar', isDone:false}),
      EmberObject.create({title:'bim', isDone:true})
    ]);
    this._super(...arguments);
  },
  titles: computed('todos.[]', function() {
    console.log('computing todos.[]');
    return this.todos.mapBy('title');
  })
});


const TodoList2 = EmberObject.extend({
  todos:null,
  init() {
    this.set('todos', [
      EmberObject.create({title: 'foo', isDone:true}),
      EmberObject.create({title:'bar', isDone:false}),
      EmberObject.create({title:'bim', isDone:true})
    ]);
    this._super(...arguments);
  },
  incomplete: computed('todos.@each.isDone', function() {
    console.log('computing todos.@each.isDone');
    return this.todos.filterBy('isDone', false);
  }),
  incomplete2: filterBy('todos', 'isDone', false)
});

const ObservablePerson = EmberObject.extend({
  firstName: null,
  lastName: null,
  fullName: computed('firstName','lastName', function() {
    console.log('computed fullName');
    return `${this.firstName} ${this.lastName}`;
  }),
  fullNameChanged: observer('fullName', function() {
    console.log(`fullName was changed to ${this.fullName}`);
  }),
  firstNameChanged: observer('firstName', function() {
    console.log(`firstName was changed to ${this.firstName}`);
  }),
  lastNameChanged: observer('lastName', function() {
    console.log(`lastName was changed to ${this.lastName}`);
  })
});


const Runner = EmberObject.extend({
  run() {
    let p1 = Person.create({name: "foo"});
    p1.say("hello world");
    let s1 = Soldier.create({name: "edutilos"});
    s1.say("hello world");

    let sp1 = SharedPerson.create({
      addItem() {
        this.shoppingList.pushObject('bacon');
      }
    });
    let sp2 = SharedPerson.create({
      addItem() {
        this.shoppingList.pushObject('sausage');
      }
    });
    sp1.addItem();
    sp2.addItem();
    console.log(sp1.shoppingList);
    console.log(sp2.shoppingList);

    let nsp1 = NotSharedPerson.create({
      addItem() {
        this.shoppingList.pushObject('bacon');
      }
    });
    let nsp2 = NotSharedPerson.create({
      addItem() {
        this.shoppingList.pushObject('sausage');
      }
    });

    nsp1.addItem();
    nsp2.addItem();
    console.log(nsp1.shoppingList);
    console.log(nsp2.shoppingList);

    let worker1 = Worker.create();
    worker1.printProps();
    worker1.id = 2 ;
    worker1.set('name', 'bar');
    worker1.set('age', 20);
    worker1.printProps();
    console.log(`${worker1.id}, ${worker1.get('age')}, ${worker1.get('active')}`);
    console.log(StaticPerson.isPerson); //static property access
    console.log(StaticPerson.create().get('isPerson')); //instance property access

    let cp = ComputedPerson.create({
      firstName: 'foo',
      lastName: 'bar'
    });
    console.log(cp.fullName);
    console.log(cp.get('fullName'));
    cp.set('firstName', 'edutilos');
    console.log(cp.fullName);

    let cp2 = ComputedPerson2.create();
    console.log(cp2.sm);

    let cp3 = ComputedPerson3.create({
      firstName: 'foo',
      lastName: 'bar',
      age: 10,
      country: 'Germany'
    });
    console.log(cp3.description);
    console.log(cp3.get('description'));
    let cp3_2 = ComputedPerson3.create();
    cp3_2.firstName= 'edu';
    cp3_2.lastName = 'tilos';
    cp3_2.age = 20 ;
    cp3_2.set('country', 'USA');
    console.log(cp3_2.description);

    let cp4 = ComputedPerson4.create();
    cp4.set('fullName', 'foo bar');
    console.log(cp4.firstName);
    console.log(cp4.lastName);

    let cp5 = ComputedPerson5.create({
      firstName: 'foo',
      lastName: 'bar'
    });
    console.log(cp5.isEqualToFoobar0);
    console.log(cp5.isEqualToFooBar);

    let td = TodoList.create();
    console.log(td.titles);
    td.todos.pushObject(EmberObject.create({title:'edutilos', isDone:false}));
    console.log(td.titles);
    let td2 = TodoList2.create() ;
    console.log(td2.incomplete);
    console.log(td2.incomplete2);
    td2.todos.pushObject(EmberObject.create({title:'edutilos', isDone:false}));
    let someTodo = td2.todos.objectAt(0);
    someTodo.set('isDone', false);
    console.log(td2.incomplete);
    console.log(td2.incomplete2);

    let op = ObservablePerson.create({
      firstName: 'foo',
      lastName: 'bar'
    });
    console.log(op.fullName);

    op.set('firstName', 'edutilos');
  }
});


const EnumerableRunner = EmberObject.extend({
  run() {
    let names= ["foo", "bar", "bim"];
    names.forEach((name, index)=> {
      console.log(name+ " "+ index);
    });
    console.log(`lastObject = ${names.get('lastObject')}`);
    names.addObject('edutilos');
    console.log(`lastObject = ${names.get('lastObject')}`);

    let mappedNames = names.map(name=> `mapped(${name})`);
    console.log(mappedNames);

    let w1 = Worker.create({
      id: 1,
      name: "foo",
      age: 10,
      wage:100.0,
      active: true
    });
    let w2 = Worker.create({
       id: 2,
       name: "bar",
       age: 20,
       wage: 200.0,
       active: false
    });
    let workers= [w1, w2];
    let wIds = workers.mapBy('id');
    let wNames = workers.mapBy('name');
    let wAges = workers.mapBy('age');
    let wWages = workers.mapBy('wage');
    let wActives = workers.mapBy('active');
    console.log(wIds);
    console.log(wNames);
    console.log(wAges);
    console.log(wWages);
    console.log(wActives);
    let numbers = [-2, -1, 0, 1, 2, 3, 4, 5, 6];
    let filteredNumbers = numbers.filter(n=> n>0 && n < 4);
    console.log(numbers);
    console.log(filteredNumbers);
    console.log(workers.filterBy('active', true));
    console.log(numbers.find(n=> n>0 && n < 4));
    console.log(workers.findBy('active',true));
    console.log(numbers.every(n=> n>0 && n < 4));
    console.log(numbers.any(n=> n>0 && n < 4));
    console.log(workers.isEvery('active', true));
    console.log(workers.isAny('active', true)); 
  }
});

export default Route.extend({
  model() {
    let r = Runner.create();
    r.run();
    let er = EnumerableRunner.create();
    er.run();
  }
});
