import React, { useContext, useState } from 'react';
import './Modal.css';
import { Context } from '../../context/Context';
import axios from 'axios';
import Loading from '../Loading/Loading';

const Modal = ({ title, data = [], setModal, state, module, target }) => {
  const { url } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const isSuccess = () => {
    return state === 0;
  };

  const handleReDeploy = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`https://${url}/deploy`, { module, target });
      setLoading(false);
      setModal((prevState) => {
        return {
          ...prevState,
          state: data.state,
          data: data.data,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='modal'>
      <h2>
        {isSuccess() ? '✅ ' : '❌ '}
        {module && target ? `${module}_${target}::` : ''}
        {title}
      </h2>
      {!isSuccess() && (
        <button
          className='reDeploy-button'
          onClick={handleReDeploy}>
          {loading ? <Loading /> : '재배포 시도하기'}
        </button>
      )}
      <button
        className='close-button'
        onClick={() => {
          setModal();
        }}>
        ❌
      </button>

      <div className='text-area'>
        {data.map((v) => {
          return <h3>{v}</h3>;
        })}
      </div>
    </div>
  );
};

export default Modal;
