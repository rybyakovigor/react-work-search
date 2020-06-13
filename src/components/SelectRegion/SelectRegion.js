import React from "react";

const SelectRegion = (props) => {
	return (
		<span
			onClick={props.openList}
			className="font-italic text-primary regionText text-right mt-n2 mt-md-0 mb-1 mb-md-0"
		>
			{props.currentRegion}
		</span>
	)
}

export default SelectRegion
