import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import { Home } from './pages/Home';

const XRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
  );
};

export { XRoutes };