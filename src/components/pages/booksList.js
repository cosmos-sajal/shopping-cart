import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getBooks } from '../../actions/booksAction';
import BookItem from './bookItem';
import BookForm from './bookForm';
import Cart from './cart';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';

class BooksList extends React.Component {
	componentDidMount() {
		this.props.getBooks();
	}

	render() {
		const booksList = this.props.books.map(function(book, index) {
			return(
				<Col xs={12} sm={6} md={6} key={book._id}>
					<BookItem
						_id={book._id}
						images={book.images}
						description={book.description}
						title={book.title}
						price={book.price}
						key={index}
					/>
				</Col>
			);
		});

		return(
			<Grid>
				<Row>
 					<Carousel>
 						<Carousel.Item>
 							<img width={900} height={300} alt="900x300" src="/images/home1.jpeg"/>
 							<Carousel.Caption>
 								<h3>The Cosmic Bookstore!</h3>
 								<p>A stop beyond the galaxy.</p>
 							</Carousel.Caption>
 						</Carousel.Item>
 						<Carousel.Item>
 							<img width={900} height={300} alt="900x300" src="/images/home2.jpg"/>
 							<Carousel.Caption>
 								<h3>The books of all civilizations!</h3>
 								<p>The first of its kind, come and watch for yourself.</p>
 							</Carousel.Caption>
 						</Carousel.Item>
 					</Carousel>
 				</Row>
				<Row style={{marginTop : '15px'}}>
					<Cart />
				</Row>
				<Row style={{marginTop : '15px'}}>
					{booksList}
				</Row>
			</Grid>
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
		getBooks : getBooks
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BooksList);
