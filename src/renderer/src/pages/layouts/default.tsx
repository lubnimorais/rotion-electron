import { Outlet } from 'react-router-dom';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';

const DefaultLayout = () => {
  return (
    <div className="w-screen h-screen text-rotion-100 flex">
      <Sidebar />

      <div className="flex flex-1 flex-col max-h-screen">
        <Header />

        <Outlet />
      </div>
    </div>
  );
};

export { DefaultLayout };
