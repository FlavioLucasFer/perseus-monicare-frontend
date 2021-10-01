import './index.css';
import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Timeline, Tooltip } from 'antd';

import { Auth, Patient } from 'api';

const { Item } = Timeline;

const Measurements = () => {
	const [patient, setPatient] = useState(new Patient());

	useEffect(async () => {
		try {
			await Auth.login('crkmkjlknnrllçloooop', 'abcdefgh19');

			const patient = await Patient.find(3);

			await patient.allMeasurements();

			setPatient(patient);
		} catch (err) {
			console.log('err:', err);
		}
	}, []);

	function renderTimeLine(e) {
		const {
			id,
			value,
			measuredAt,
			status,
			measurementType,
		} = e;

		let color = '#33f587';
		let dotTooltip = 'Tudo bem!';

		switch (status) {
			case 'bad':
				color = '#f53933';
				dotTooltip = 'Perigoso!'
				break;
				
				case 'caution':
					color = '#ffcc00';
					dotTooltip = 'Cuidado!'
				break;
		}

		const Dot = styled.div`
			height: 15px;
			width: 15px;
			background-color: transparent;
			border: 3px solid ${color};
			border-radius: 50%;
		`;

		const Value = styled.span`
			color: ${status === 'bad' ? color : '#000'};
		`;

		return (
			<Item key={id} 
				label={<span className="fs-6"><b>{measurementType.name}</b></span>}
				dot={
					<Tooltip title={dotTooltip}>
						<Dot />
					</Tooltip>
				}>
				<Value className={`fs-5 ${status === 'bad' && 'fw-bold'}`}> {value} </Value>
				<br />
				<small> <b> Medido em: </b> {measuredAt} </small>
			</Item>
		);
	}

  return (
    <div className='container'>
      <div className='col-sm-12'>
				<Timeline mode='left'> 
					{patient.measurements.map(renderTimeLine)}
				</Timeline>
      </div>
    </div>
  );
}

export default Measurements;