import React, { useContext, useState } from 'react';
import './Modal.css';
import { Context } from '../../context/Context';
import axios from 'axios';
import Loading from '../Loading/Loading';

const Modal = () => {
  const { modal, setModal, url } = useContext(Context);
  const [loading, setLoading] = useState(false);

  const isSuccess = () => {
    return modal.state === 0;
  };

  const handleReDeploy = async () => {
    try {
      setLoading(true);
      const { data } = await axios.post(`https://${url}/deploy`, { module: modal.module, target: modal.target });
      setLoading(false);
      setModal((prevState) => {
        return {
          ...prevState,
          open: true,
          state: data.state,
          data: data.data,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  return modal.open ? (
    <div className='modal'>
      <h2> {isSuccess() ? '✅ 배포성공' : modal.state === -1 ? '❗️빌드실패' : '🚫 배포실패'} </h2>
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
          setModal((prevState) => {
            return {
              ...prevState,
              open: false,
            };
          });
        }}>
        ❌
      </button>

      <div className='text-area'>
        {modal.data.map((v) => {
          return <h3>{v}</h3>;
        })}
      </div>
    </div>
  ) : (
    <></>
  );
};

export default Modal;
