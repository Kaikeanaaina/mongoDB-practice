//first run mongod in one terminal
//open another terminal
//run mongo




{ "_id" : ObjectId("56b404d9c83e6535d425044a"), "title" : "Fight Club", "writer" : "Chuck Palahniuk", "year" : 1999, "actors" : [ "Brad Pitt", "Edward Norton" ] }
{ "_id" : ObjectId("56b4065ec83e6535d425044b"), "title" : "Pulp Fiction", "writer" : "Quentin Taratino", "year" : 1994, "actors" : [ "John Travolta", "Uma Thurman" ] }
{ "_id" : ObjectId("56b406d1c83e6535d425044c"), "title" : "Inglorious Basterds", "writer" : "Quentin Tarantino", "year" : 2009, "actors" : [ "Brad Pitt", "Diane Kruger", "Eli Roth" ] }
{ "_id" : ObjectId("56b40879c83e6535d425044e"), "title" : "The Hobbit: An Unexpected Journey", "writer" : "J.R.R. Tolkein", "year" : 2012, "franchise" : "The Hobbit" }
{ "_id" : ObjectId("56b408cfc83e6535d425044f"), "title" : "The Hobbit: The Desolation of Smaug", "writer" : "J.R.R. Tolkein", "year" : 2013, "franchise" : "The Hobbit" }
{ "_id" : ObjectId("56b4095ac83e6535d4250450"), "title" : "The Hobbit: The Battle of the Five Armies", "writer" : "J.R.R. Tolkein", "year" : 2012, "franchise" : "The Hobbit", "synopsis" : "Bilbo and Company are forced to engage in a war against an array of combatants and keep the Lonely Mountain from falling into the hands of a rising darkness." }
{ "_id" : ObjectId("56b409a6c83e6535d4250451"), "title" : "Pee Wee Herman's Big Adventure" }
{ "_id" : ObjectId("56b409b3c83e6535d4250452"), "title" : "Avatar" }

//example
//db.users.insert({name: "charlie", age:4});

db.createCollection("movies");

//1
db.movies.find();
//2
db.movies.find({writer:"Quentin Tarantino"});
//3
db.movies.createIndex( { actors: "text" } )
db.movies.find( { $text: { $search: "Brad Pitt" } } )
//4
db.movies.find({franchise:"The Hobbit"});
//5
db.movies.find( { year: { $gt: 1989, $lt: 2000 } } )
//6
db.movies.find({$or:[{year:{$lt:2000}},{year:{$gt:2010}}]});

//=======================

//1
db.movies.save(
   { "_id" : ObjectId("56b40879c83e6535d425044e")},
   {
    "synopsis" : "A reluctant hobbit, Bilbo Bagginsm sets out to the Lonely Mountain with a spirited group of dwayves to reclaim their mountain home - and the gold within it - from the dragon Smaug."
    },
   { upsert: true }
)

//2
db.movies.save(
   { "_id" : ObjectId("56b408cfc83e6535d425044f")},
   {
    "synopsis" : "The dwarves, along with Bilbo Baggins and Gandalf the Grey, continue their quest to reclaim Erebor, their homeland, from Smaug. Bilbo Baggins is in possession of a mysterious and magical ring."
     },
   { upsert: true }
)

//3
db.movies.update(
   { "title" : "Pulp Fiction"},
   {
    "actors" : [ "John Travolta", "Uma Thurman", "Samuel L. Jackson" ] },
   { upsert: true }
)

//==================================

//TEXT SEARCH

//1
db.movies.find( { $text: { $search: "Bilbo" } } )

//2
db.movies.find( { $text: { $search: "Gandalf" } } )

//3
db.movies.find( { $text: { $search: "Bilbo  -Gandalf" } } )

//4
db.movies.find( { $text: { $search: "dwarves hobbit" } } )

//5
db.movies.find( { $text: { $search: "gold +dragon" } } )


//==========================

//DELETE

//1
db.movies.remove({ "title" : "Pee Wee Herman's Big Adventure"});

//2
db.movies.remove({ "title" : "Avatar"});


//===============================

//Relationship
db.createCollection("users");

//1
db.users.insert({username: "GoodGuyGreg", first_name:"Good Guy", last_name: "Greg"});

//2
db.users.insert({username: "ScumbagSteve", full_name: {first:"Scumbag", last: "Steve"}});


//===============================

//POST COLLECTION
db.createCollection("posts");

//1
db.posts.insert({username : "GoodGuyGreg", title : "Passes out at party", body : "Wakes up early and cleans house"  });

//2
db.posts.insert({username : "GoodGuyGreg", title : "Steals your identity", body : "Raises your credit score"  });

//3
db.posts.insert({username : "GoodGuyGreg", title : "Reports a bug in your code", body : "Sends you a Pull Request"  });

//4
db.posts.insert({username : "ScumbagSteve", title : "Borrows something", body : "Sells it"  });

//5
db.posts.insert({username : "ScumbagSteve", title : "Borrows everything", body : "The end"  });

//6
db.posts.insert({username : "ScumbagSteve", title : "Forks your repo on github", body : "Sets to private"  });



//==========================

//COMMENTS COLLECTION
db.createCollection("comments");

//1
var borrowSomething = db.posts.find({ "title":"Borrows something"}).next()._id;
db.comments.insert({username : "GoodGuyGreg", comment : "Hope you got a good deal!", post : borrowSomething  });

//2
var borrowEverything = db.posts.find({ "title":"Borrows everything"}).next()._id;
db.comments.insert({username : "GoodGuyGreg", comment : "What's mine is yours!", post : borrowEverything  });

//3
var forksYourRepo = db.posts.find({ "title":"Forks your repo on github"}).next()._id;
db.comments.insert({username : "GoodGuyGreg", comment : "Don't violate the licensing agreement!", post : forksYourRepo  });

//4
var passesOutAtParty = db.posts.find({ "title":"Passes out at party"}).next()._id;
db.comments.insert({username : "ScumbagSteve", comment : "It still isn't clean", post : passesOutAtParty });

//5
var reportsABugInYourCode = db.posts.find({ "title":"Reports a bug in your code"}).next()._id;
db.comments.insert({username : "ScumbagSteve", comment : "Denied your PR cause I found a hack", post : reportsABugInYourCode });


//===================================

//QUERYING RELATED CONDITIONS

//1
db.users.find();

//2
db.posts.find();

//3
db.posts.find({username:"GoodGuyGreg"});

//4
db.posts.find({username:"ScumbagSteve"});

//5
db.comments.find();

//6
db.comments.find({username:"GoodGuyGreg"});

//7
db.comments.find({username:"ScumbagSteve"});

//8
db.comments.find({post: reportsABugInYourCode});






db.movies.remove({ "_id" : ObjectId("56b4065ec83e6535d425044b")});



