import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Signup from './pages/signup';
import Login from './pages/login';
import Maps from './pages/maps';

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/register' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/maps' element={<Maps />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
