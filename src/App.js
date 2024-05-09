import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [modules, setModules] = useState([]);

  const fetchModules = async () => {
    try {
      const modules = await axios.get(`http://${process.env.REACT_APP_HOST}:${process.env.REACT_APP_PORT}/modules`);
      setModules(modules.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className='App'>
      {modules.map((module) => {
        return <h1>{module}</h1>;
      })}
    </div>
  );
}

export default App;
