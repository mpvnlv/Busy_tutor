import './App.css';
import {Header }from './components/Header/Header';
import { Calendar } from './pages/Calendar/Calendar';

export const App = () => {
  return (
    <div className="container mx-auto max-w-screen-[1440px]">
      <Header />
      <Calendar />
    </div>
  );
}
