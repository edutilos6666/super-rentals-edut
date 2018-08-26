import Mirage from 'ember-cli-mirage';
export default function() {

  // These comments are here to help you get started. Feel free to delete them.

  /*
    Config (with defaults).

    Note: these only affect routes defined *after* them!
  */

  // this.urlPrefix = '';    // make this `http://localhost:8080`, for example, if your API is on a different server
  // this.namespace = '';    // make this `/api`, for example, if your API is namespaced
  // this.timing = 400;      // delay for each request, automatically set to 0 during testing

  /*
    Shorthand cheatsheet:

    this.get('/posts');
    this.post('/posts');
    this.get('/posts/:id');
    this.put('/posts/:id'); // or this.patch
    this.del('/posts/:id');

    http://www.ember-cli-mirage.com/docs/v0.3.x/shorthands/
  */

this.namespace = '/api';
let rentals = [{
        type: 'rentals',
        id: 'grand-old-mansion',
        attributes: {
          title: 'Grand Old Mansion',
          owner: 'Veruca Salt',
          city: 'San Francisco',
          category: 'Estate',
          bedrooms: 15,
          image: 'https://upload.wikimedia.org/wikipedia/commons/c/cb/Crane_estate_(5).jpg',
        }},
      {
       type: 'rentals',
       id: 'urban-living',
       attributes: {
         title: 'Urban Living',
         owner: 'Mike Teavee',
         city: 'Seattle',
         category: 'Condo',
         bedrooms: 1,
         image: 'https://upload.wikimedia.org/wikipedia/commons/0/0e/Alfonso_13_Highrise_Tegucigalpa.jpg'
       }
     }, {
       type: 'rentals',
       id: 'downtown-charm',
       attributes: {
         title: 'Downtown Charm',
         owner: 'Violet Beauregarde',
         city: 'Portland',
         category: 'Apartment',
         bedrooms: 3,
         image: 'https://upload.wikimedia.org/wikipedia/commons/f/f7/Wheeldon_Apartment_Building_-_Portland_Oregon.jpg'
       }}
    ];

this.get('/rentals', function(db, request) {
  // console.log(request);
  if(request.queryParams.city !== undefined) {
    let filteredRentals = rentals.filter(function(i) {
      return i.attributes.city.toLowerCase().indexOf(request.queryParams.city.toLowerCase()) !== -1;
    });
    return  {data: filteredRentals};
  } else {
    return {data:rentals};
  }
});


this.get('/rentals/:id', function(db, request) {
  return {data:rentals.find((rental)=> request.params.id === rental.id)};
});

let people = [
{
  type: 'people',
  id: 1,
  attributes:   {
      myid: 1,
      name: "foo",
      age: 10,
      wage: 100.0,
      active: true
    }
}
];
this.get('/people', function(db, request) {
  return {data:people};
});
this.get('/people/:myid', function(db , request) {
  return {data:people.find((person)=> parseInt(request.params.myid) === person.attributes.myid)};
});
this.post('/people', function(db, request) {
  var person = JSON.parse(request.requestBody).data;
  person.id =  parseInt(people[people.length-1].id) + 1;
  people.push(person);
  return {data:person};
});
this.patch('/people/:myid', function(db, request) {
  var person = JSON.parse(request.requestBody).data;
  var oldPerson = people.filter((person)=> person.attributes.myid = person.attributes.myid);
  oldPerson.attributes = person.attributes;
  //here oldPerson has already id , so we just return person whose id is null
  return {data:person};
});
this.delete('/people/:myid', function(db, request) {
  console.log(db);
  // var newPeople = people.filter((person)=> person.attributes.myid !== parseInt(request.params.myid));
  // console.log(newPeople);
  // people = newPeople;
  people.splice(people.findIndex(p=> p.attributes.myid === parseInt(request.params.myid)), 1);
  console.log(people);
  return {data:people};
  // return new Mirage.response(204,{},{});
});
// this.delete('/people/:myid', 'people');


//workers
this.get('/workers', (schema, request)=> {
  // console.log(schema);
  // console.log(schema.workers.all());
  return schema.workers.all({});
});
this.get('/workers/:id', (schema, request)=> {
  return schema.db.workers.find(request.params.id);
});
this.post('/workers', (schema, request)=> {
  var params = JSON.parse(request.requestBody);
  var saved = schema.workers.create(params);
  return saved;
});
this.patch('/workers/:id', (schema,request)=> {
   var params = JSON.parse(request.requestBody);
   var worker = schema.db.workers.find(request.params.id);
   var updated =  schema.db.workers.update(worker, params);
   if(updated.length > 0) return updated[0];
   else return updated;
});
this.del('/workers/:id', (schema, request)=> {
  // console.log(schema);
  var deleted = schema.db.workers.remove(request.params.id);
  console.log(deleted);
  return deleted; 
});

}
