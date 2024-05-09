import React from 'react';
import CardButton from './CardButton';
import './Card.css';

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
      <div className='card-button'>
        {['front', 'back'].map((target) => {
          return (
            <CardButton
              key={target}
              target={target}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Card;
