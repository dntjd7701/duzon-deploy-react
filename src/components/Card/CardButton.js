import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { oldServerModules } from '../../Utils/Utils';
import Modal from '../Modal/Modal';

const CardButton = ({ module, target }) => {
  const { url } = useContext(Context);
  const [loading, setLoading] = useState({
    toggle: false,
    target: '',
  });
  const [modal, setModal] = useState({
    open: false,
    title: '',
    state: 0,
    data: [],
    module: '',
    target: '',
  });

  const toggleLoading = (target) => {
    setLoading((prevState) => {
      return {
        toggle: !prevState.toggle,
        target,
      };
    });
  };

  const build = async () => {
    try {
      const { data } = await axios.post(`https://${url}/build`, { module, target });
      if (data.state === 0) {
        await deploy();
      } else {
        setModal((prevState) => {
          return {
            ...prevState,
            open: true,
            title: '빌드 실패',
            state: data.state,
            data: data.data,
            module,
            target,
          };
        });
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deploy = async () => {
    try {
      const { data } = await axios.post(`https://${url}/deploy`, { module, target });
      setModal((prevState) => {
        return {
          ...prevState,
          open: true,
          title: data.state === 0 ? '배포 성공' : '배포 실패',
          state: data.state,
          data: data.data,
          module,
          target,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const restart = async () => {
    try {
      const { data } = await axios.post(`https://${url}/restart`, { module, target: 'restart' });
      setModal((prevState) => {
        return {
          ...prevState,
          open: true,
          title: data.state === 0 ? '재구동 성공' : '재구동 실패',
          state: data.state,
          data: data.data,
          module,
          target,
        };
      });
    } catch (error) {
      console.error(error);
    }
  };

  const handlButtonClick = async (e) => {
    const target = e.target.id;
    toggleLoading(target);
    if (target === 'restart') {
      await restart();
    } else {
      await build();
    }

    toggleLoading(target);
  };
  return (
    <>
      <button
        className='card-button'
        disabled={target === 'restart' && !oldServerModules.includes(module)}
        key={target}
        id={target}
        onClick={handlButtonClick}>
        {loading.toggle && target === loading.target ? <Loading /> : target}
      </button>

      {modal.open && (
        <Modal
          {...modal}
          setModal={(obj = {}) => {
            setModal((prevState) => {
              return {
                ...prevState,
                ...obj,
                open: false,
              };
            });
          }}
        />
      )}
    </>
  );
};

export default CardButton;
