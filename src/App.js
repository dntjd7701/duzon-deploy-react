import axios from 'axios';
import { useEffect, useState } from 'react';
import backgroundImage from './assets/1.jpg';
import Card from './components/Card';

function App() {
  const [modules, setModules] = useState([]);
  const [formData, setFormData] = useState({
    host: '',
    port: '',
  });
  const [url, setUrl] = useState('');

  const fetchModules = async () => {
    try {
      const modules = await axios.get(`${url}/modules`);
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
    const host = window.localStorage.getItem('HOST') || '';
    const port = +window.localStorage.getItem('PORT') || '';

    setFormData({
      host,
      port,
    });
    setUrl(`http://${host}:${port}`);
  }, []);

  useEffect(() => {
    fetchModules();
  }, [url]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    window.localStorage.setItem('HOST', `${formData.host}`);
    window.localStorage.setItem('PORT', `${formData.port}`);
    setUrl(`http://${formData.host}:${formData.port}`);
  };

  return (
    <>
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
            value={formData.host}
            onChange={handleChange}
          />
        </label>
        <label>
          PORT:
          <input
            type='number'
            name='port'
            value={formData.port}
            onChange={handleChange}
          />
        </label>
        <button type='submit'>Submit</button>
      </form>

      {/* CARD */}
      <Card modules={modules} />
    </>
  );
}

export default App;
