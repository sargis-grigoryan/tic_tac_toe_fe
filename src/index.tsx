import axios from 'axios';
import ReactDOM from 'react-dom/client';
import App from './App';

axios.defaults.baseURL = process.env.REACT_APP_API_BASE_PATH || "";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <App />
);
