import { HomeIcon, UserIcon, Cog6ToothIcon } from '@heroicons/react/24/solid';
import { Link } from 'react-router-dom';

export default function BottomNav() {
  return (
    <nav className="fixed bottom-0 left-0 w-full bg-blue-500 border-t p-2 flex justify-around md:hidden">
      <Link to="/" className="flex flex-col items-center text-sm">
        <HomeIcon className="w-6 h-6" />
        <span>Inicio</span>
      </Link>
      <Link to="/about" className="flex flex-col items-center text-sm">
        <UserIcon className="w-6 h-6" />
        <span>Perfil</span>
      </Link>
      <Link to="/settings" className="flex flex-col items-center text-sm">
        <Cog6ToothIcon className="w-6 h-6" />
        <span>Ajustes</span>
      </Link>
    </nav>
  );
}
