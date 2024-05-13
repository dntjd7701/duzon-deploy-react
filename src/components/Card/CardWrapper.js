import React from 'react';
import Card from './Card';
import './Card.css';

const CardWrapper = ({ modules }) => {
  return (
    <div className='card-wrapper'>
      {modules.map((module) => {
        return (
          <Card
            key={module}
            module={module}
          />
        );
      })}
    </div>
  );
};

export default CardWrapper;
