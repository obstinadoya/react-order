/** @jsx React.DOM */
var React = require('react');

var InputWrapper = React.createClass({
	propTypes: {
		min: React.PropTypes.number,
		max: React.PropTypes.number
	},
	getDefaultProps: function(){
		return {
			className: 'inp-store-order',
			min: 0,
			max: Number.POSITIVE_INFINITY,
			defaultValue: 0
		}
	},
	componentDidMount: function(){
		if(this.props.onInit) this.props.onInit(this.props.defaultValue);
	},
	handleKey: function(e){
		var value = parseInt(''+e.target.value+e.key);
		
		if(isNaN(value) || value > this.props.max || value < this.props.min){
			e.preventDefault();
		}
		return;
	},
	handleChange: function(e){
		if(this.props.onChange) this.props.onChange(e.target.value);
	},
	render: function(){
		return (
			<input onChange={this.handleChange} onKeyPress={this.handleKey} className={this.props.className} defaultValue={this.props.defaultValue} />
		);
	}
});

module.exports = InputWrapper;