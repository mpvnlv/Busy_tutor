import { Route, Routes } from 'react-router-dom';
import './App.css';
import { Calendar } from './pages/Calendar/Calendar';
import { Register } from './pages/Register/Register';


export const App = () => {
  return (
    <div className="container mx-auto max-w-screen-[1440px]">
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path="/calendar" element={<Calendar />} /> 
      </Routes>
    </div>
  );
}
