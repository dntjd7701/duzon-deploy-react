import React, { useContext, useState } from 'react';
import { Context } from '../../context/Context';
import axios from 'axios';
import Loading from '../Loading/Loading';

const CardButton = ({ module, target }) => {
  const { url } = useContext(Context);
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
    window.alert(`에러 발생. 강우성 연구원한테 문의 부탁드립니다.${data.state}`);
    toggleLoading(target);
  };
  return (
    <button
      key={target}
      id={target}
      onClick={handlButtonClick}>
      {loading.toggle && target === loading.target ? <Loading /> : target}
    </button>
  );
};

export default CardButton;
