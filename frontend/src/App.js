import { Route, Routes } from 'react-router-dom';
import { Calendar } from './pages/Calendar/Calendar';
import { Register } from './pages/Register/Register';
import {Login} from './pages/Login/Login'

import { Token } from './pages/Token/Token';

export const App = () => {
  return (
    <div className="container mx-auto max-w-screen-[1440px]">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/calendar" element={<Calendar />} /> 
        <Route path = "/login" element={<Login/>}/>
        <Route path="/token" element={<Token/>}/>
      </Routes>
    </div>
  );
}
