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
    state: 0,
    data: [],
    module: '',
    target: '',
  });

  const fetchModules = async () => {
    try {
      if (!url) return;
      const modules = await axios.get(`https://${url}/modules`);
      setModules(modules.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    // const host = window.localStorage.getItem('HOST') || process.env.REACT_APP_HOST;
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
    // window.localStorage.setItem('HOST', `${formData}`);
    setUrl(formData);
  };

  return (
    <Context.Provider
      value={{
        url,
        responseData,
        setResponseData,
        modal,
        setModal,
      }}>
      <div class='background'>
        <img
          src={backgroundImage}
          id='bg-img'
          alt=''
        />
      </div>

      <form
        className={'form'}
        onSubmit={handleSubmit}>
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
        <button
          onClick={async () => {
            await axios.post(`https://${url}/ssh`, {});
          }}>
          connection check
        </button>
        <a
          style={{ textDecoration: 'none', color: 'white', cursor: 'pointer' }}
          className='card-label'
          href={`https://dev.amaranth10.co.kr/devservermanager/`}
          target='_blank'
          rel='noreferrer'>
          Amaranth10 개발 서버 매니저
        </a>
      </form>

      {/* CARD */}
      <CardWrapper modules={modules} />

      <Modal />
    </Context.Provider>
  );
}

export default Main;
