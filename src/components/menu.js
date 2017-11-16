import React from 'react';
import { Link } from 'react-router';
import { Nav, NavItem, Navbar, Badge } from 'react-bootstrap';

class Menu extends React.Component {
	render() {
		return (
			<Navbar inverse fixedTop>
				<Navbar.Header>
					<Navbar.Brand>
						<Link to={`/`}>Home</Link>
					</Navbar.Brand>
					<Navbar.Toggle />
				</Navbar.Header>
				<Navbar.Collapse>
					<Nav>
						<NavItem eventKey={1} componentClass="span">
							<Navbar.Brand>
								<Link to={`/about`}>
									About
								</Link>
							</Navbar.Brand>
						</NavItem>
						<NavItem eventKey={2} componentClass="span">
							<Navbar.Brand>
								<Link to={`/contact`}>
									Contact Us
								</Link>
							</Navbar.Brand>
						</NavItem>
					</Nav>
					<Nav pullRight>
						<NavItem eventKey={1} componentClass="span">
							<Navbar.Brand>
								<Link to={`/admin`}>
									Admin
								</Link>
							</Navbar.Brand>
						</NavItem>
						<NavItem eventKey={2} componentClass="span">
							<Navbar.Brand>
								<Link to={`/cart`}>
									Your Cart
									<Badge className="badge">
										{this.props.qty}
									</Badge>
								</Link>
							</Navbar.Brand>
						</NavItem>
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		);
	}
}

export default Menu;
