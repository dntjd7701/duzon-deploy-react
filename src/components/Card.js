import React, { useContext, useState } from 'react';
import './Card.css';
import axios from 'axios';
import { Context } from '../context/Context';

const Card = ({ module }) => {
  const { url } = useContext(Context);

  const handlButtonClick = async (e) => {
    const { data } = await axios.post(`${url}/build`, {
      module,
      target: e.target.id,
    });
  };

  return (
    <div
      key={module}
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
};

export default Card;
