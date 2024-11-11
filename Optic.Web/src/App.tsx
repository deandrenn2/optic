import { ToastContainer } from 'react-toastify';
import './App.css';
import Root from './routes/Root';

const App = () => {
   return (
      <>
         <Root />
         <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            style={{ fontSize: '1.5rem !important' }}
         />
      </>
   );
};

export default App;
