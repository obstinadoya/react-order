/** @jsx DOM */
var React = require('react'),
	Order = require('./components/Order');

React.render(
	<Order apiUrl="http://private-ef554-order7.apiary-mock.com/order" orderId="1" />,
	document.body
	);