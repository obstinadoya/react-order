var Backbone = require('backbone');

var Product = Backbone.Model.extend({
	constructor: function(){
		arguments[0].remain = arguments[0].count;
		Backbone.Model.apply(this, arguments);
	}
});

var ProductCollection = Backbone.Collection.extend({
	model: Product,
	remains: function(){
		return this.some(function(product){
			return product.get('remain') > 0;
		});
	}
});

module.exports.Product = Product;
module.exports.ProductCollection = ProductCollection;