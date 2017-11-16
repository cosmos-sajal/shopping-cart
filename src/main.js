import React from 'react';
import Menu from './components/menu';
import Footer from './components/footer';
import { connect } from 'react-redux';

class Main extends React.Component {
	render() {
		return(
			<div>
				<Menu qty={this.props.quantity} />
					{this.props.children}
				<Footer />
			</div>
		);
	}
}

function mapStateToProps(state) {
	return {
		quantity : state.cart.quantity
	}
};

export default connect(mapStateToProps)(Main);
