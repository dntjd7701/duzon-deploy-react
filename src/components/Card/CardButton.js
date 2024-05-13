import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import Loading from '../Loading/Loading';
import { oldServerModules } from '../../Utils/Utils';

const CardButton = ({ module, target }) => {
  const { url, setModal } = useContext(Context);
  const [loading, setLoading] = useState({
    toggle: false,
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
        return deploy();
      } else {
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  };

  const deploy = async () => {
    try {
      const { data } = await axios.post(`https://${url}/deploy`, { module, target });
      return data;
    } catch (error) {
      console.error(error);
    }
  };

  const restart = async () => {
    const { data } = await axios.post(`https://${url}/restart`, { module, target: 'restart' });
    setModal((prevState) => {
      return {
        ...prevState,
        open: true,
        title: `${module} 재구동 ${data.state === 0 ? '성공' : '실패'}`,
        state: data.state,
        data: data.data,
        module,
        target,
      };
    });
    return data;
  };

  const handlButtonClick = async (e) => {
    const target = e.target.id;
    toggleLoading(target);
    let result;
    if (target === 'restart') {
      result = await restart();
    } else {
      result = await build();
      setModal((prevState) => {
        return {
          ...prevState,
          open: true,
          state: result.state,
          data: result.data,
          module,
          target,
        };
      });
    }

    toggleLoading(target);
  };
  return (
    <button
      className='card-button'
      disabled={target === 'restart' && !oldServerModules.includes(module)}
      key={target}
      id={target}
      onClick={handlButtonClick}>
      {loading.toggle && target === loading.target ? <Loading /> : target}
    </button>
  );
};

export default CardButton;
