import { Route, Routes } from 'react-router-dom';
import { Login } from './components/Login';
import Signup from './components/Signup';
import Root from './components/Root';
import './App.css';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/root' element={<Root/>} />
      </Routes>
      {/* <Root /> */}
      {/* <Signup /> */}
      {/* <Login /> */}
    </div>
  );
}

export default App;
