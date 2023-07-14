import { Route, Routes } from 'react-router-dom';
import { Calendar } from './pages/Calendar/Calendar';
import { Register } from './pages/Register/Register';
import {Login} from './pages/Login/Login'

import { Token } from './pages/Token/Token';
import { Header } from './components/Header/Header';
import { Modal } from './components/Modal/Modal';
import { useSelector } from 'react-redux';

export const App = () => {

  const isOpen = useSelector((state) => state.modalReducer.isOpen);

  return (
    <>
      <div
        className={`container mx-auto max-w-screen-[1440px] relative font-next_art ${
          isOpen && "blur-sm"
        }`}
      >
        <Routes>
          <Route path="/" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/token" element={<Token />} />
          <Route path="/calendar" element={<Header />}>
            <Route path="/calendar" element={<Calendar />} />
          </Route>
        </Routes>
      </div>
      {isOpen && <Modal />}
    </>
  );
}
