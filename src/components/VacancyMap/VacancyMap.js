import React from "react";
import {YMaps, Map, Placemark} from 'react-yandex-maps';

const VacancyMap = (props) => {
	return (
		<YMaps>
			<div>
				<Map style={{width: "100%", height: 400}} defaultState={{ center: [props.x, props.y], zoom: 15 }}>
					<Placemark geometry={[props.x, props.y]} />
				</Map>

			</div>
		</YMaps>
	)
}

export default VacancyMap
