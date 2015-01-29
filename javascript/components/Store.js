/** @jsx React.DOM */
var React = require('react');

var Store = React.createClass({
	getInitialState: function(){
		return {check: true}
	},
	render: function(){
		return <b>{this.props.status}</b>;
	}
});

var StoreItem = React.createClass({
	render: function(){
		return (
			<td>
				{this.props.count}
			</td>
			);
	}
});


module.exports.Store = Store;
module.exports.StoreItem = StoreItem;