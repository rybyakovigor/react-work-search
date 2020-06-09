import React, {Component} from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

export default class Layout extends Component {
	render() {
		return (
			<Container>
				<Row>
					<Col>{this.props.children}</Col>
				</Row>
			</Container>
		)
	}
}
