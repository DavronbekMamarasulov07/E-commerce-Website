import './App.css'
import RoutesController from './routes/RoutesController'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <RoutesController/>
      <ToastContainer/>
    </>
  )
}

export default App
