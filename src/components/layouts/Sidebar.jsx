import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  LogOut,
  Users,
  Settings,
  Church,
  ChevronRight,
  Menu,
  X,
  Building2,
  Layers,
  HandPlatter,
  Files,
} from 'lucide-react';

export default function Sidebar() {
  const [expanded, setExpanded] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);

  const handleLogout = async () => {
    await logout();
    navigate('/auth/signin');
  };

  return (
    <>
      {/* BUTTON HAMBURGUER */}
      <div className="lg:hidden fixed top-4 right-4 z-50">
        <button
          onClick={() => setIsMobileOpen(!isMobileOpen)}
          className="p-2 rounded-lg bg-primary text-white shadow-lg border border-secondary"
        >
          {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* BACKDROP */}
      {isMobileOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setIsMobileOpen(false)}
        />
      )}

      <aside
        className={`
    fixed inset-y-0 right-0 z-40 flex flex-col bg-primary text-white transition-all duration-300 border-l border-secondary/50
    lg:relative lg:left-0 lg:translate-x-0
    ${isMobileOpen ? 'translate-x-0 w-64' : 'translate-x-full w-64'} 
    ${expanded ? 'lg:w-64' : 'lg:w-20'}
  `}
      >
        {/* Header */}
        <div className="p-4 flex items-center justify-between border-b border-secondary h-20">
          {(expanded || isMobileOpen) && (
            <span className="font-bold text-xl overflow-hidden whitespace-nowrap text-white animate-in fade-in duration-500">
              Navegação
            </span>
          )}
          <button
            onClick={() => setExpanded(!expanded)}
            className="hidden lg:flex cursor-pointer p-2 rounded bg-secondary hover:bg-dark/10 mx-auto transition-all"
          >
            {expanded ? <Menu size={20} /> : <ChevronRight size={20} />}
          </button>

          {/* BUTTON CLOSE Mobile */}
          <button onClick={() => setIsMobileOpen(false)} className="lg:hidden p-2">
            <X size={20} />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-3 space-y-2 mt-4 overflow-y-auto">
          <SidebarItem to="/home" icon={<LayoutDashboard size={22} />} label="Home" expanded={expanded} isMobile={isMobileOpen} />

          <SidebarItem to="/account" icon={<Building2 size={22} />} label="Home" expanded={expanded} isMobile={isMobileOpen} />

          <SidebarItem to="/church" icon={<Church size={22} />} label="Igrejas" expanded={expanded} isMobile={isMobileOpen} />

          <SidebarItem to="/members" icon={<Users size={22} />} label="Membros" expanded={expanded} isMobile={isMobileOpen} />
          
          {/* <SidebarItem to="/settings" icon={<Settings size={22} />} label="Configurações" expanded={expanded} isMobile={isMobileOpen} /> */}
        </nav>

        {/* Logout */}
        <button
          onClick={handleLogout}
          className={`group relative flex items-center p-4 border-t border-secondary hover:bg-red-500/10 hover:text-red-500 transition-all cursor-pointer ${(!expanded && !isMobileOpen) ? 'justify-center' : ''
            }`}
        >
          <LogOut size={22} />
          {(expanded || isMobileOpen) ? (
            <span className="ml-3 font-medium overflow-hidden whitespace-nowrap">Sair</span>
          ) : (
            <Tooltip label="Sair do Sistema" color="bg-red-600" />
          )}
        </button>
      </aside>
    </>
  );
}

function SidebarItem({ to, icon, label, expanded, isMobile }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`
        group relative flex items-center p-3 rounded-lg transition-all
        ${(!expanded && !isMobile) ? 'justify-center' : ''} 
        ${isActive ? 'bg-dark text-white' : 'hover:bg-secondary text-gray-400 hover:text-white'}
      `}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>

      {(expanded || isMobile) && (
        <span className="ml-3 font-medium overflow-hidden whitespace-nowrap transition-all">
          {label}
        </span>
      )}

      {/* Tooltip */}
      {!expanded && !isMobile && (
        <Tooltip label={label} color="bg-dark" />
      )}
    </Link>
  );
}

// Sub-componente
function Tooltip({ label, color }) {
  return (
    <div className={`
      absolute left-full rounded-md px-3 py-1.5 ml-6
      ${color} text-white text-sm font-bold
      invisible opacity-0 -translate-x-3 transition-all
      group-hover:visible group-hover:opacity-100 group-hover:translate-x-0
      whitespace-nowrap z-50 shadow-2xl
    `}>
      {label}
      <div className={`absolute -left-1 top-1/2 -translate-y-1/2 w-2 h-2 ${color} rotate-45`}></div>
    </div>
  );
}
