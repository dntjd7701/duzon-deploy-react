import React from 'react';

const Card = ({ modules }) => {
  const handlButtonClick = (e) => {
    console.log(e.target.id);
  };
  return (
    <div className='card-wrapper'>
      {modules.map((module, idx) => {
        return (
          <div
            key={idx}
            className='card'>
            <label>{module}</label>
            <div className='card-button'>
              {['front', 'back'].map((target) => {
                return (
                  <button
                    key={target}
                    id={target}
                    onClick={handlButtonClick}>
                    {target}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Card;
