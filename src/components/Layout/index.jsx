import { Outlet } from 'react-router-dom';
import Navigation from 'components/Navigation';

export default function Layout() {
  return (
    <>
      <Navigation />
      <Outlet />
    </>
  );
}
