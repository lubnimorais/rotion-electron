import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import './styles/globa.css';

const App = () => {
  return (
    <div className="w-screen h-screen text-rotion-100 flex">
      <Sidebar />

      <div className="flex flex-1 flex-col max-h-screen">
        <Header />

        <main className="flex flex-1 items-center justify-center text-rotion-400">
          Selecione ou crie um documento
        </main>
      </div>
    </div>
  );
};

export { App };
