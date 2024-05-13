import React from 'react';
import './Card.css';
import CardButton from './CardButton';

const Card = ({ module }) => {
  return (
    <div
      key={module}
      className='card'>
      <a
        className='card-label'
        href={`http://14.41.55.45:8089/?utf8=%E2%9C%93&name=${module}`}
        target='_blank'
        rel='noreferrer'>
        {module}
      </a>
      <div className='card-button-wrapper'>
        {['front', 'back', 'restart'].map((target) => {
          return (
            <CardButton
              key={target}
              module={module}
              target={target}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Card;
