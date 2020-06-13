import React from "react";
import {Modal} from "react-bootstrap";

const RegionListModal = (props) => {

	return (
		<React.Fragment>
			<Modal show={props.open} onHide={props.closeList} centered size={"xl"}>

				<Modal.Header closeButton>
					<Modal.Title>
						Выберите регион:
					</Modal.Title>
				</Modal.Header>

				<Modal.Body>
					<ul className="regionList">
						{props.renderRegions()}
					</ul>
				</Modal.Body>

			</Modal>
		</React.Fragment>
	)
}
export default RegionListModal
