
import './App.css';
import Login from './components/login';
import Home from './components/user/home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'
import ProtectedRoutes from './components/protectedRoutes';
import Register from './components/register';
import UserCrud from './components/user/userProfile';
import Dashboard from './components/admin/dashboard';
import { useAuth } from './context/authContext';

function App() {

const {user} = useAuth()


  return (
    <div className="App">
      
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<ProtectedRoutes>{user?.role == 'Admin'? <Dashboard/> : <Home/>}</ProtectedRoutes>}/>
        <Route path = '/rigester' element={<Register/>}/>
        <Route path='/userProfile' element={<UserCrud/>}/>
        <Route path='*' element={<h1>404- path/link not found</h1>}/>
      </Routes>

      </BrowserRouter>  
      
    </div>
  );
}

export default App;
