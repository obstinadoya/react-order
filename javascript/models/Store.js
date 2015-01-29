var Backbone = require('backbone');

var Store = Backbone.Model.extend({
	defaults: function() {
		return {
			order: [],
			isFrozen: false,
			isActive: false
		};
	},
	getProductCount: function(productId){
		var availItems = this.get('avail'),
			l = availItems.length;

		for(var i=0; i < l; i++) {
			if(availItems[i]['id'] == productId) {
				return availItems[i]['qt'];
			}
		}
		return 0;
	},
	getOrderForProduct: function(productId){
		var order;
		this.get('order').forEach(function(item){
			if(item.id == productId){
				order = item;
			}
		});
		if(!order){
			order = {id: productId};
			this.get('order').push(order);
		}
		return order;
	},
	productQuantity: function(productId){
		return this.getOrderForProduct(productId).quantity;
	},
	activate: function(){
		this.set({isActive: true});
		this.trigger('activated');
	},
	isActive: function(){
		return this.get('isActive');
	},
	saveOrder: function(){
		this.get('order').forEach(function(p){
			p.model.set({remain: p.model.get('remain') - p.quantity});
		});
		this.set({isFrozen: true, isActive: false});
		this.trigger('saved');
	},
	cancelOrder: function(){
		this.get('order').forEach(function(p){
			p.quantity = 0;
		});
		this.set({isActive: false});
		this.trigger('canceled');
	},
	updateOrder: function(product, quantity){
		var order = this.getOrderForProduct(product.get('id')),
			oldVal = order.quantity ? order.quantity : 0;
		order.quantity = quantity;
		order.model = product;
	}
});

var StoreCollection = Backbone.Collection.extend({
	model: Store
});

module.exports.Store = Store;
module.exports.StoreCollection = StoreCollection;