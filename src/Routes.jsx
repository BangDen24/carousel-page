import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Page1 from './pages/Page1';
import Page2 from './pages/Page2';
import Page3 from './pages/Page3';
import Page3x from './pages/Page3experimental';
import Page4 from './pages/sldkajsl'

const PageRoute = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Page1 />} />
        <Route path="/page2" element={<Page2 />} />
        <Route path="/page3" element={<Page3 />} />
        <Route path="/x" element={<Page3x />} />
        <Route path='/xx' element={<Page4 />} />
      </Routes>
    </Router>
  );
};

export default PageRoute;
