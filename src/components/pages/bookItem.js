import React from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addToCart } from '../../actions/cartAction';

class BookItem extends React.Component {
	constructor() {
		super();
		this.state = {
			readMore : false
		};
	}

	handleItemSubmit() {
		const book = {
			'_id' : this.props._id,
			'title' : this.props.title,
			'description' : this.props.description,
			'price' : this.props.price,
			'quantity' : 1,
			'images' : this.props.images
		};

		this.props.addToCart(book);
	}

	onToggle() {
		this.setState({readMore : !this.state.readMore});
	}

	render() {
		return(
			<Well>
				<Row>
					<Col xs={12} sm={4}>
 						<Image src={this.props.images} responsive />
 					</Col>
					<Col xs={6} sm={8}>
						<h6>{this.props.title}</h6>
						<p>{this.props.description.length > 50 && !this.state.readMore ? (this.props.description.substring(0, 50)) : (this.props.description)}</p>
						<button className='link' onClick={this.onToggle.bind(this)}>
							{this.props.description != null && this.props.description.length > 50 && !this.state.readMore ? ('...read more') : ('')}
							{this.props.description != null && this.props.description.length > 50 && this.state.readMore ? ('...read less') : ('')}
						</button>
						<h6>Rs. {this.props.price}</h6>
						<Button
						onClick={this.handleItemSubmit.bind(this)}
						bsStyle="primary">Buy Now</Button>
					</Col>
				</Row>
			</Well>
		);
	}
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		addToCart : addToCart
	}, dispatch);
}

export default connect(null, mapDispatchToProps)(BookItem);