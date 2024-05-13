import React from 'react';
import CardButton from './CardButton';
import './Card.css';
import { oldServerModules } from '../../Utils/Utils';

const Card = ({ module }) => {
  const handleRestartBtn = () => {};

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
        {['front', 'back'].map((target) => {
          return (
            <CardButton
              key={target}
              module={module}
              target={target}
            />
          );
        })}
        <button
          className='card-button'
          disabled={!oldServerModules.includes(module)}
          key={'restart'}
          id={'restart'}
          onClick={handleRestartBtn}>
          {/* {loading.toggle && target === loading.target ? <Loading /> : target */}
          {/* } */}
          Restart
        </button>
      </div>
    </div>
  );
};

export default Card;
