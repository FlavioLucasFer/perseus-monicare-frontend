import './index.css';

import React from 'react';

import { Timeline } from 'antd';

const Measurements = () => {
  const measurements = [{
    type: 'Teste',
    value: 35.5,
    measuredAt: '29/09/2021 00:00'
  },
  {
    type: 'Teste',
    value: 35.5,
    measuredAt: '29/09/2021 00:00'
  },
  {
    type: 'Teste',
    value: 35.5,
    measuredAt: '29/09/2021 00:00'
  }, 
  {
    type: 'Teste',
    value: 35.5,
    measuredAt: '29/09/2021 00:00'
  }
  ];

  return (
    <div className='container'>
      <div className='col-sm-12'>
        <div className='row'>
          <div className='col-sm-6'>
            <Timeline mode='left'> 
              {measurements.map(e => (
                <Timeline.Item label={e.type}
                  color='green'>
                  <p> {e.value} </p>

                  <span> <b> Medido em: </b> {e.measuredAt} </span>
                </Timeline.Item>
                // <MeasurementStatus />
              ))}
            </Timeline>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Measurements;