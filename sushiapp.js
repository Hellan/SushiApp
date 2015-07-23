var App =  Ember.Application.create({

  LOG_TRANSITIONS: true


});

App.Router.map(function() {
  this.route('credits', { path: '/thanks' });
  this.resource('products', function() {
    this.resource('product', { path: '/:product_id' });
    this.route('onsale');
    this.route('deals');
  
  });
  this.resource('contacts', function() {
    this.resource('contact', { path: '/:contact_id' });
  });

});

App.IndexController = Ember.ArrayController.extend({
  productsCount: Ember.computed.alias('length'),
  logo: 'images/logo-small.jpg',
  time: function() {
    return (new Date()).toDateString();
  }.property(),
  onSale: function(){
  return this.filterBy('isOnSale').slice(0,3);
}.property('@each.isOnSale')
});



App.ContactsIndexController = Ember.ObjectController.extend({
  contactName: 'Yoya Takahashi',
  avatar: 'images/logo-small.jpg',
  open: function(){
    if( (new Date()).getDay() === 0){
      return "The restaurant is closed on Sundays";}
    else {return "The shop is open right now!";}}.property()
});

App.ContactsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('contact');
  }
});

App.Product = DS.Model.extend({
  title: DS.attr('string'),
  price: DS.attr('number'),
  description: DS.attr('string'),
  isOnSale: DS.attr('boolean'),
  image: DS.attr('string'),
  reviews: DS.hasMany('review', {async: true}),
  crafter: DS.belongsTo('contact', { async: true })
});
App.Product.FIXTURES = [
 {  id: 1,
    title: 'California Roll',
    price: 0.99,
    description: 'This California roll includes real crabmeat, creamy avocado and crunchy cucumber rolled inside-out on a bed of sushi rice.',
    isOnSale: true,
    image: 'images/products/california_roll.jpg',
    reviews: [100,101],
    crafter: 200
  },
  {
    id: 2,
    title: 'Ika Nigiri',
    price: 0.88,
    description: 'Ika Nigiri has a fantastic mild sweet flavor along with a slightly chewy sticky texture. Ika Nigiri is usually cut from the body of the squid and to make it more tender sushi chefs will make slit marks across one side.',
    isOnSale: false,
    image: 'images/products/ika_sushi.jpg',
    reviews: [],
    crafter: 201
  },
  {
    id: 3,
    title: 'Ikura Maki',
    price: 0.89,
    description: 'Gunkan maki, also known as Battleship maki, is a common, more traditional type of sushi. It is topped with ikura (fish eggs, larger than tobiko).',
    isOnSale: true,
    reviews: [],
    image: 'images/products/ikura_maki.jpg',
    crafter: 202
  },
  {
    id: 4,
    title: 'Kappa Maki',
    price: 0.79,
    description: 'A kappa maki consists of just cucumbers although it is not uncommon to find them prepared with a few sesame seeds.',
    isOnSale: false,
    reviews: [],
    image: 'images/products/kappa_maki.jpg',
    crafter: 200
  },
  {
    id: 5,
    title: 'Saba',
    price: 0.78,
    description: 'It is very rich in oil and has a slight dry aftertaste. Very high in omega-3 oils and Vitamin E. Considered one of the healthiest sushi, but not the most popular. ',
    isOnSale: true,
    reviews: [],
    image: 'images/products/saba.jpg',
    crafter: 200
  },
  {
    id: 6,
    title: 'Sake',
    price: 0.99,
    description: 'Nigiri is a kind of sushi made with vinegared sushi rice (shari), and a slices of fish, seafood, or vegetable. ',
    isOnSale: true,
    reviews: [],
    image: 'images/products/sake.jpg',
    crafter: 200
  }
];
App.ApplicationAdapter = DS.FixtureAdapter.extend();


App.Contact = DS.Model.extend({
  name: DS.attr('string'),
  about: DS.attr('string'),
  avatar: DS.attr('string'),
  products: DS.hasMany('product', {async: true}) 
});

App.Contact.FIXTURES = [
  {
    id: 200,
    name: "Hiroyuki Urasawa",
    about: "Urasawa is one of the most expensive restaurants in the United States, with checks reaching well over $1,000 for a party of two. That may seem extravagant to some, but to those seeking the ultimate sushi experience, it would be hard to do better. This the type of place that Jiro dreams of and with the best fish flown in daily from around the world, the price is almost justified. Toro, uni, wagyu beef, gold leaf — it's all here.",
    avatar: 'images/contacts/HiroyukiUrasawa.jpg',
    products: [1,4,5,6]
  },
   {
    id: 201,
    name: "Keizo Seki",
    about: "Keizo Seki was born in Osaka, Japan, and began mastering the art of making sushi at a young age in Tokyo before moving to Los Angeles. With over 30 years of experience in both Japan and the United States, he opened the sushi restaurant SUSHI ZO in West Los Angeles in March 2006. The finest quality fish is hand selected by Keizo each morning and served in the traditional omakase style. In 2009, SUSHI ZO was awarded a prestigious 1-star Michelin review.Keizo-san is known for serving tiny portions of fish on top of rice that mimics the body's internal temperature. ",
    avatar: 'images/contacts/KeizoSeki.jpg',
    products: [2]
  },
{
    id: 202,
    name: "Yoya Takahashi",
    about: "Yoya is awesome. If you've ever sat at his bar, you know that. He shops for the best fish from all over the world every day and, in his spare time, gets down to The Grateful Dead. Allow him to do his thing and you'll be sure to wind up with tiny firefly squid with a creamy miso or a king crab leg cracked open in front of you, covered in butter, and seared with a blowtorch. ",
    avatar: 'images/contacts/YoyaTakahashi.jpg',
    products: [3]
  }
  ];

 App.Review = DS.Model.extend({
  text: DS.attr('string'),
  reviewedAt: DS.attr('date'),
  product: DS.belongsTo('product')
}); 

  App.Review.FIXTURES = [
  {
    id: 100,
    text: "Best sushi I have ever tasted!"
  },
  {
    id: 101,
    text: "Both the food and service were excellent. Even though I wasn`t sure what I as eating, it was yummy."
  }
];

App.ProductsController = Ember.ArrayController.extend({
 sortProperties: ['title']
});

App.ProductsRoute = Ember.Route.extend({
  model: function() {
    return this.store.findAll('product');
  }
});


App.IndexRoute = Ember.Route.extend({
  model: function(){
    return this.store.findAll('product');
  }
});


App.ContactsController = Ember.ArrayController.extend({
 sortProperties: ['name']
});



App.ContactsIndexRoute = Ember.Route.extend({
  model: function() {
    return this.store.find('contact', 200);
  }
});



App.ProductsIndexRoute = Ember.Route.extend({ 
model: function() {
    return this.store.findAll('product');
  }
}); 

App.ProductsOnsaleRoute = Ember.Route.extend({
 model: function(){
 return this.modelFor('products').filterBy('isOnSale');
 } 
});


App.ProductsDealsRoute = Ember.Route.extend({
  model: function(){
    return this.modelFor('products').filter(function(product) {
      return product.get('price') < 0.8;    
    });
  }
});



App.ProductDetailsComponent = Ember.Component.extend({
reviewsCount: Ember.computed.alias('product.reviews.length'),
hasReviews: function() {
return this.get('reviewsCount') > 0;
}.property('reviewsCount')
});

App.ContactDetailsComponent = Ember.Component.extend({
  productsCount: Ember.computed.alias('contact.products.length'),
  isProductive: function() {
    return this.get('productsCount') > 3;
  }.property('productsCount')
});

App.ProductView = Ember.View.extend({
classNames: ['row '],
classNameBindings: ['isOnSale'],
isOnSale: Ember.computed.alias('controller.isOnSale')
});

App.ReviewsController = Ember.ArrayController.extend({
  sortProperties: ['reviewedAt'],
  sortAscending: false
});

App.ContactProductsController = Ember.ArrayController.extend({
  sortProperties: ['title'],
  sortAscending: false
});

App.ProductController = Ember.ObjectController.extend({
  
  ratings: [1,2,3,4,5],
  isNotReviewed: Ember.computed.alias('review.isNew'),
  review: function(){
    return this.store.createRecord('review',{
      product: this.get('model')
    });
  }.property('model'),
  actions: {
    createReview: function(){
      var controller = this;
      this.get('review').set('reviewedAt', new Date());
      this.get('review').save().then(function(review){
        controller.get('model.reviews')
                  .addObject(review);
      });
    }
    
  }
});

App.ReviewView = Ember.View.extend({
  isExpanded: false,
  classNameBindings: ['isExpanded', 'readMore'],
  click: function(){
    this.toggleProperty('isExpanded');
  },
  readMore: function(){
    return this.get('length') > 140;
  }.property('length')
});




















