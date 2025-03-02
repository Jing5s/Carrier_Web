import { Route, Routes, Navigate, Outlet } from 'react-router-dom';
import { Suspense, memo } from 'react';
import Layout from './Layout';
import Login from 'pages/Login';
import Home from 'pages/Home';
import Survey from 'pages/Survey';
import OAuth from 'pages/OAuth';
import Mail from 'pages/Mail';
import useUser from 'entities/user/hooks/useUser';
import { DotLoader } from 'react-spinners';
import theme from 'shared/styles/theme.css';

const LoadingScreen = () => <DotLoader color={theme.blue[500]} />;

const PrivateRoute = memo(
  ({ isLoggedIn, isLoading }: { isLoggedIn: boolean; isLoading: boolean }) => {
    if (isLoading) return <LoadingScreen />;
    if (!isLoggedIn) return <Navigate to="/login" replace />;
    return <Outlet />;
  }
);

const PublicRoute = memo(
  ({ isLoggedIn, isLoading }: { isLoggedIn: boolean; isLoading: boolean }) => {
    if (isLoading) return <LoadingScreen />;
    if (isLoggedIn) return <Navigate to="/" replace />;
    return <Outlet />;
  }
);

export default function Router() {
  const { isLoggedIn, isLoading } = useUser();

  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>
        <Route
          element={
            <PrivateRoute isLoggedIn={isLoggedIn} isLoading={isLoading} />
          }
        >
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/mail" element={<Mail />} />
          </Route>
        </Route>

        <Route
          element={
            <PublicRoute isLoggedIn={isLoggedIn} isLoading={isLoading} />
          }
        >
          <Route path="/login" element={<Login />} />
          <Route path="/google/callback" element={<OAuth />} />
        </Route>

        <Route path="/survey" element={<Survey />} />
      </Routes>
    </Suspense>
  );
}
