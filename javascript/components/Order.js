/** @jsx React.DOM */
var React = require('react'),
	$ = require('jquery'),
	StoreCollection = require('../models/Store').StoreCollection,
	ProductCollection = require('../models/Product').ProductCollection,
	InputWrapper = require('./InputWrapper');

var stores = new StoreCollection();
var products = new ProductCollection();

var Order = React.createClass({
	propTypes: {
		apiUrl: React.PropTypes.string.isRequired
	},
	getInitialState: function(){
		return {
			stores: stores,
			products: products
		};
	},
	componentDidMount: function(){
		stores.bind('add remove activated saved canceled', this._onModelsUpdate);
		products.bind('add remove', this._onModelsUpdate);

		$.get(this.props.apiUrl)
			.then(function(data){
				stores.set(data[0].stores);
				products.set(data[0].products);
		});
	},
	_onModelsUpdate: function(){
		this.setState({
			stores: stores,
			products: products
		});
	},
	renderStoreRow: function(product){
		var productId = product.get('id'),
			productRemain = product.get('remain');

		return this.state.stores.map(function(store){
			var productQtInStore = store.getProductCount(productId),
				renderElements = [];

			if(store.isActive() && productQtInStore > 0 && productRemain > 0){
				var maxNumber = Math.min(productQtInStore, product.get('remain')),
					upFunc = store.updateOrder.bind(store, product);
				renderElements.push(<InputWrapper key={'inpFor'+productId} onInit={upFunc} onChange={upFunc} max={maxNumber} defaultValue={maxNumber} />);
			}else if(store.get('isFrozen') && store.productQuantity(product.get('id')) > 0){
				renderElements.push(<b className="orderQt">{store.getOrderForProduct(product.get('id'))['quantity']}</b>);
			}

			return (
					<td className="qt">
						{productQtInStore}
						{renderElements}
					</td>
				);
		}.bind(this));
	},
	renderCtrls: function(store){
		if(store.get('isFrozen') || !this.state.products.remains()) return;
		var btns = [];
		if(!store.get('isActive'))
			btns = btns.concat([
				<button className="ico-pencil" onClick={store.activate.bind(store)}></button>
			]);
		else
			btns = btns.concat([
				<button className="ico-save" onClick={store.saveOrder.bind(store)}></button>,
				<button className="ico-trash" onClick={store.cancelOrder.bind(store)}></button>
			]);

		return btns;
	},
	render: function(){
		return (
			<div>
				<table className="order-manage-table">
					<tr>
						<th rowSpan="2">Товар</th>
						<th rowSpan="2">Кол-во</th>
						<th rowSpan="2">Остаток</th>
						<th colSpan={this.state.stores.length}>Магазины</th>
					</tr>
					<tr>
						{this.state.stores.map(function(store){
							return (
								<th>
									{store.get('title')} <br/>
									{this.renderCtrls(store)}
								</th>
							);
						}.bind(this))}
					</tr>
					{this.state.products.map(function(product){
						return (
							<tr>
								<td>{product.get('title')}</td>
								<td>{product.get('count')}</td>
								<td>{product.get('remain')}</td>
								{this.renderStoreRow(product)}
							</tr>
							)
					}.bind(this))}
				</table>
			</div>
		);
	}
});

module.exports = Order;