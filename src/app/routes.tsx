import { Route, Routes } from 'react-router-dom';
import Layout from './Layout';

import Login from 'pages/Login';
import Home from 'pages/Home';
import Survey from 'pages/Survey';
import OAuth from 'pages/OAuth';
import Mail from 'pages/Mail';

export default function Router() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/mail" element={<Mail />} />
      </Route>
      <Route path="/login" element={<Login />} />
      <Route path="/survey" element={<Survey />} />
      <Route path="/google/callback" element={<OAuth />} />
    </Routes>
  );
}
