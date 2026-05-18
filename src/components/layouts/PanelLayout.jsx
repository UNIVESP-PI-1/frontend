import Sidebar from './Sidebar';
import { Outlet } from 'react-router-dom';

export default function PanelLayout() {
  return (

    <div className="flex h-screen bg-gray-100 overflow-hidden">
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet /> 
      </main>
    </div>
  );
}