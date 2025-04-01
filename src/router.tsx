import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Redirect from './pages/redirect';

export default function Router() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/redirect/:shortUrl' element={<Redirect />} />
      </Routes>
    </BrowserRouter>
  )
}