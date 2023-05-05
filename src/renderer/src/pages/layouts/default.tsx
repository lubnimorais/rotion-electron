import { Outlet } from 'react-router-dom';

import * as Collapsible from '@radix-ui/react-collapsible';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { useState } from 'react';

const DefaultLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <Collapsible.Root
      defaultOpen
      onOpenChange={setIsSidebarOpen}
      className="w-screen h-screen text-rotion-100 flex"
    >
      <Sidebar />

      <div className="flex flex-1 flex-col max-h-screen">
        <Header isSidebarOpen={isSidebarOpen} />

        <Outlet />
      </div>
    </Collapsible.Root>
  );
};

export { DefaultLayout };
