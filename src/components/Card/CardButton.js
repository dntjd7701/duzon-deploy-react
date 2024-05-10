import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import Loading from '../Loading/Loading';

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

  const handlButtonClick = async (e) => {
    const target = e.target.id;
    toggleLoading(target);
    console.log(module, target);
    const { data } = await axios.post(`https://${url}/build`, { module, target });
    setModal((prevState) => {
      return {
        ...prevState,
        open: true,
        state: data.state,
        data: data.data,
        module,
        target,
      };
    });

    console.debug('data:', data);
    toggleLoading(target);
  };
  return (
    <button
      disabled={['logiscustom', 'hospital'].includes(module)}
      key={target}
      id={target}
      onClick={handlButtonClick}>
      {loading.toggle && target === loading.target ? <Loading /> : target}
    </button>
  );
};

export default CardButton;
