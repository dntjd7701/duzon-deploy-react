import axios from 'axios';
import { useEffect, useState } from 'react';
import backgroundImage from './assets/1.jpg';
import CardWrapper from './components/Card/CardWrapper';
import { Context } from './context/Context';
import Modal from './components/Modal/Modal';

function Main() {
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState('');
  const [url, setUrl] = useState('');
  const [responseData, setResponseData] = useState({});
  const [modal, setModal] = useState({
    open: false,
    title: '',
    state: 0,
    data: [],
    module: '',
    target: '',
  });

  const fetchModules = async () => {
    try {
      if (!url) return;
      const { data } = await axios.get(`https://${url}/modules`);
      setModules(data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const host = process.env.REACT_APP_HOST;
    setFormData(host);
    setUrl(host);
  }, []);

  useEffect(() => {
    fetchModules();
  }, [url]);

  const handleChange = (event) => {
    const { value } = event.target;
    setFormData(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    setUrl(formData);
  };

  return (
    <Context.Provider
      value={{
        url,
        responseData,
        setResponseData,
      }}>
      <div class='background'>
        <img
          src={backgroundImage}
          id='bg-img'
          alt=''
        />
      </div>

      {/* form */}
      <form
        className={'form'}
        onSubmit={handleSubmit}>
        <div>
          <label>
            HOST:
            <input
              type='text'
              name='host'
              value={formData}
              onChange={handleChange}
            />
          </label>
          <button type='submit'>Submit</button>
        </div>
        <button
          onClick={async () => {
            console.debug('url:', url);
            const { data } = await axios.post(`https://${url}/ssh`, {});
            setModal((prevState) => {
              return {
                ...prevState,
                open: true,
                title: data.state === 0 ? 'Connection on' : 'Connection off',
                state: data.state,
                data: data.data,
              };
            });
          }}>
          connection check
        </button>
        <a
          className='Amaranth10-manager'
          href={`https://dev.amaranth10.co.kr/devservermanager/`}
          target='_blank'
          rel='noreferrer'>
          Amaranth10 개발 서버 매니저
        </a>
      </form>
      {/* form */}

      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', marginBottom: '50px' }}>
        <h3>1. 동시성 문제 해결 필요</h3>
        <h3>2. 테스트 필요</h3>
      </div>

      {/* CARD */}
      <CardWrapper modules={modules} />

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
    </Context.Provider>
  );
}

export default Main;
