import React from 'react';
import { MenuItem, InputGroup, DropdownButton, Image, Col, Row,Well, Panel, FormControl, FormGroup, ControlLabel, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { postBooks, deleteBook } from '../../actions/booksAction';
import { findDOMNode } from 'react-dom';
import axios from 'axios';

class BookForm extends React.Component {
	constructor() {
		super();
		this.state = {
			images : [],
			img : ''
		};
	}

	componentDidMount() {
		let self = this;
		axios.get('/api/get/images')
			.then(function(response) {
				self.setState({images : response.data})
			})
			.catch(function(err) {
				self.setState({images : 'error loading images', img : ''});
			});
	}

	handleSubmit() {
		const book = {
			'title' : findDOMNode(this.refs.title).value,
			'description' : findDOMNode(this.refs.description).value,
			'price' : findDOMNode(this.refs.price).value,
			'images' : findDOMNode(this.refs.image).value
		};
		this.props.postBooks(book);
	}

	handleSelect(image) {
		this.setState({
			img: `/images/${image.name}`
		});
	}

	onDelete() {
		this.props.deleteBook({'_id' : findDOMNode(this.refs.delete).value});
	}

	render() {
		let imgList;
		const booksList = this.props.books.map(function(book) {
			return <option key={book._id}>{book._id}</option>
		});

		if (this.state.images !== []) {
			imgList = this.state.images.map(function(image, i) {
				return <MenuItem key={i} eventKey={image.name} onClick={this.handleSelect.bind(this, image)}>{image.name}</MenuItem>
			}, this);
		}

		return(
			<Well>
				<Row>
					<Col xs={12} sm={6}>
 						<Panel>
 							<InputGroup>
 								<FormControl type="text" ref="image" value={this.state.img} />
 								<DropdownButton componentClass={InputGroup.Button} id="input-dropdown-addon" title="Select an image" bsStyle="primary">
 									{imgList}
 								</DropdownButton>
 							</InputGroup>
 							<Image src={this.state.img} responsive/>
 						</Panel>
 					</Col>
 					<Col xs={12} sm={6}>
 						<Panel>
 							<FormGroup controlId="title">
								<ControlLabel>Title</ControlLabel>
 								<FormControl type="text" placeholder="Enter Title" ref="title" />
 							</FormGroup>
 							<FormGroup controlId="description">
								<ControlLabel>Description</ControlLabel>
 								<FormControl type="text" placeholder="Enter Description" ref="description" />
 							</FormGroup>
 							<FormGroup controlId="price">
								<ControlLabel>Price</ControlLabel>
 								<FormControl type="text" placeholder="Enter Price" ref="price" />
 							</FormGroup>
 							<Button onClick={this.handleSubmit.bind(this)} bsStyle="primary">Save book</Button>
 						</Panel>
						<Panel>
							<FormGroup controlId="formControlsSelect">
 								<ControlLabel>Select a book id to delete</ControlLabel>
 								<FormControl ref="delete" componentClass="select" placeholder="select">
 									<option value="select">select</option>
 									{booksList}
 								</FormControl>
 							</FormGroup>
 							<Button onClick={this.onDelete.bind(this)} bsStyle="danger">Delete book</Button>
 						</Panel>
 					</Col>
 				</Row>
			</Well>
		);
	}
}

function mapStateToProps(state) {
	return {
		books : state.books.books
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		postBooks : postBooks,
		deleteBook : deleteBook
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookForm);
