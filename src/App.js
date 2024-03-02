import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Home, Active, Complete } from './components/Page/index.js';
import Navigation from './components/Header.js';
import Page404 from './components/Page404.js';

function App() {
  return (
     <BrowserRouter>
        <Navigation/>
        <Routes>
           <Route path='/' element={<Home/>}/>
           <Route path='/active' element={<Active/>}/>
           <Route path='/complete' element={<Complete/>}/>
           <Route path='/*' element={<Page404/>}/>
        </Routes>
     </BrowserRouter>
  );
}

export default App;
