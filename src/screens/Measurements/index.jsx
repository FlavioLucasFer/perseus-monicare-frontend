import './index.css';
import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { Button, Timeline, Tooltip, Typography } from 'antd';

import OxigenacaoImg from './oxigenacao.jpg';
import TemperaturaImg from './temperatura.jpg';

import { Auth, Patient } from 'api';

const { Item } = Timeline;
const { Title } = Typography;

function Measurements() {
	const [patient, setPatient] = useState(new Patient());
	const [tab, setTab] = useState('timeline');

	useEffect(async () => {
		try {
			await Auth.login('ami', '1234568a9');

			const patient = await Patient.find(2);

			await patient.allMeasurements();

			setPatient(patient);
		} catch (err) {
			console.log('err:', err);
		}
	}, []);

	function renderTimeLineItem(e) {
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
			<Item className="mt-2 mb-2"
				key={id} 
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

	function renderTimeLine() {
		return (
			<Timeline mode='left'
				reverse
				style={{ 
					overflowY: 'auto', 
					overflowX: 'hidden',
					height: '100%',
				}}>
				{patient.measurements.map(renderTimeLineItem)}
			</Timeline>
		);
	}

	function renderCharts() {
		return (
			<div className="d-flex justify-content-evenly">
				<img src={TemperaturaImg} />
				<img src={OxigenacaoImg} />
			</div>
		);
	}

	function handleTabButtonClick(tab) {
		setTab(tab);
	}

	return (
		<div className='container' style={{ height: '100%' }}>
			<div className='col-sm-12' style={{ height: '100%' }}>
				<Title className="text-center mb-2"
					level={2}>
					{patient.name}
				</Title>

				<div className="row justify-content-center mb-4">
					<div className="col-sm-1">
						<Button type="primary"
							disabled={tab === 'timeline'}
							onClick={handleTabButtonClick.bind(null, 'timeline')}>
							Timeline
						</Button>
					</div>
					<div className="col-sm-1">
						<Button type="primary"
							disabled={tab === 'charts'}
							onClick={handleTabButtonClick.bind(null, 'charts')}>
							Gráficos
						</Button>
					</div>
				</div>

				<div style={{ height: '85%' }}>
					{tab === 'timeline' ?
						renderTimeLine()
					: 
						renderCharts()
					}
				</div>
			</div>
		</div>
	);
}

export default Measurements;