import { Link, Outlet, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import AppIntro from "../../components/AppIntro/AppIntro";

export default function AuthLayOut() {
  const [mode, setMode] = useState("/auth/login");
  let {pathname} = useLocation();
  useEffect(()=>{
    if(pathname === "/auth/login" || pathname === "/auth/register"){
      setMode(pathname)
    }
  }, [pathname]);

  return (
    <main className="min-h-screen bg-primary-light px-4 py-8 sm:py-12 lg:flex lg:items-center">
      <div className="mx-auto flex w-full max-w-6xl flex-col-reverse items-center gap-6 sm:gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
        
       <AppIntro />

        <section className="w-full max-w-[430px]">
          <div className="rounded-2xl bg-white p-4 sm:p-6 shadow-sm border border-gray-100">

            {/* Login/Register tabs */}
            <div className="mb-5 grid grid-cols-2 rounded-xl bg-slate-100 p-1">
              <Link
                to="/auth/login"
                onClick={() => setMode("/auth/login")}
                className={`rounded-lg p-2 text-center text-sm font-extrabold transition ${
                  mode === "/auth/login"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Login
              </Link>
              <Link
                to="/auth/register"
                onClick={() => setMode("/auth/register")}
                className={`rounded-lg p-2 text-center text-sm font-extrabold transition ${
                  mode === "/auth/register"
                    ? "bg-white text-primary shadow-sm"
                    : "text-slate-500 hover:text-slate-800"
                }`}
              >
                Register
              </Link>
            </div>
            
            <Outlet />
          </div>
        </section>
      </div>
    </main>
  );
}
