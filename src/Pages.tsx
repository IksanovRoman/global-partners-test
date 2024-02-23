import { Route, Routes } from 'react-router-dom';
import Menu from './Components/Menu';
import ErrorPage from './Pages/ErrorPage/ErrorPage';

import MainPage from './Pages/MainPage';

function Pages() {
  return (
    <div className="body">
      <Menu />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </div>
  );
}
export default Pages;
