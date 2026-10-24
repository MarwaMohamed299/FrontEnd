import { useContext, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import {
  HiOutlineArrowRightOnRectangle,
  HiOutlineBell,
  HiOutlineChevronDown,
  HiOutlineHome,
  HiOutlineSparkles,
  HiOutlineUserCircle,
} from 'react-icons/hi2';
import { AuthContext } from '../../../context/AuthContext';

export default function NavBar() {
  const { token, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menu, setMenu] = useState('');

  function toggleMenu(name: string) {
    setMenu(menu === name ? '' : name);
  }

  function handleLogout() {
    logout();
    setMenu('');
    navigate('/auth/login', { replace: true });
  }

  const links = [
    { path: '/', label: 'Feed', icon: HiOutlineHome },
    { path: '/profile', label: 'My profile', icon: HiOutlineUserCircle },
  ];

  return (
    <header
      className="sticky top-0 z-40 border-b border-slate-200 bg-white shadow-sm"
      onKeyDown={(event) => event.key === 'Escape' && setMenu('')}
    >
      {menu && (
        <button type="button" aria-label="Close menu" tabIndex={-1}
          className="fixed inset-0" onClick={() => setMenu('')} />
      )}

      <div className="relative mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <Link to="/" onClick={() => setMenu('')} className="flex items-center gap-2 text-lg font-bold text-blue-600">
          <HiOutlineSparkles className="size-10 rounded-xl bg-blue-600 p-2 text-white" />
          StitchPosts
        </Link>

        <nav aria-label="Main navigation" className="order-3 flex w-full justify-center gap-2 lg:order-none lg:w-auto">
          {links.map(({ path, label, icon: Icon }) => (
            <NavLink key={path} to={path} end onClick={() => setMenu('')}
              className={({ isActive }) => `flex items-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold ${isActive ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:bg-slate-100'}`}>
              <Icon className="size-5" aria-hidden="true" />
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="relative flex items-center gap-3">
          {token ? (
            <>
              <button type="button" aria-label="Notifications" aria-expanded={menu === 'notifications'}
                onClick={() => toggleMenu('notifications')} className="rounded-full bg-slate-100 p-2.5 text-slate-600 hover:bg-blue-50">
                <HiOutlineBell className="size-5" />
              </button>

              <button type="button" aria-label="Account options" aria-expanded={menu === 'account'}
                onClick={() => toggleMenu('account')} className="flex items-center gap-2 rounded-full p-1 hover:bg-slate-100">
                <HiOutlineUserCircle className="size-9 text-blue-600" />
                <span className="hidden text-sm font-semibold text-slate-700 sm:block">Welcome back</span>
                <HiOutlineChevronDown className="size-4 text-slate-500" />
              </button>

              {menu && (
                <div className="absolute right-0 top-full z-10 mt-3 w-64 rounded-xl border border-slate-200 bg-white p-3 shadow-lg">
                  {menu === 'notifications' ? (
                    <>
                      <h2 className="mb-2 font-semibold text-slate-800">Notifications</h2>
                      <p className="py-4 text-center text-sm text-slate-500">No notifications to show.</p>
                    </>
                  ) : (
                    <>
                      <Link to="/profile" onClick={() => setMenu('')} className="flex items-center gap-2 rounded-lg p-3 text-sm text-slate-700 hover:bg-slate-100">
                        <HiOutlineUserCircle className="size-5" /> View profile
                      </Link>
                      <button type="button" onClick={handleLogout} className="flex w-full items-center gap-2 rounded-lg p-3 text-sm text-red-600 hover:bg-red-50">
                        <HiOutlineArrowRightOnRectangle className="size-5" /> Logout
                      </button>
                    </>
                  )}
                </div>
              )}
            </>
          ) : (
            <Link to="/auth/login" className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white hover:bg-blue-700">Log in</Link>
          )}
        </div>
      </div>
    </header>
  );
}
