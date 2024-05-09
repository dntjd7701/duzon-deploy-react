import axios from 'axios';
import { useEffect, useState } from 'react';
import backgroundImage from './assets/1.jpg';
import { Context } from './context/Context';
import CardWrapper from './components/CardWrapper';

function Main() {
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState('');
  const [url, setUrl] = useState('');

  const fetchModules = async () => {
    try {
      if (!url) return;
      const modules = await axios.get(`https://${url}/modules`);
      setModules(modules.data);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * @param {string} moduleName-production|logis..
   * @param {target} target-front|back..
   */
  const createParam = (moduleName, target) => ({
    moduleName,
    target,
  });

  useEffect(() => {
    const host = window.localStorage.getItem('HOST') || '10.51.121.74';
    setFormData(host);
    setUrl(host);
  }, []);

  useEffect(() => {
    fetchModules();
  }, [url]);

  const handleChange = (event) => {
    const { value } = event.target;
    console.debug('value:', value);
    setFormData(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.localStorage.setItem('HOST', `${formData}`);
    setUrl(formData);
  };

  return (
    <Context.Provider
      value={{
        url,
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
      </form>

      {/* CARD */}
      <CardWrapper modules={modules} />
    </Context.Provider>
  );
}

export default Main;
