
import './App.css';
import Login from './components/login';
import Home from './components/user/home';
import {BrowserRouter,Route,Routes} from 'react-router-dom'


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>

      </BrowserRouter>
    </div>
  );
}

export default App;
