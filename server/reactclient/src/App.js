
import './App.css';
import Login from './components/login';
import Home from './components/user/home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import { AuthProvider } from './context/authContext';
import ProtectedRoutes from './components/protectedRoutes';


function App() {
  return (
    <div className="App">
      <AuthProvider>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<ProtectedRoutes><Home/></ProtectedRoutes>}/>
      </Routes>

      </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
