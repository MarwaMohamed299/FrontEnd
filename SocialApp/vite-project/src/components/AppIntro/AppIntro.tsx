import React from 'react';

const statsData = [
  { id: 1, value: "2002", label: "Movie Released", colClass: "col-span-4" },
  { id: 2, value: "626", label: "Experiment Number", colClass: "col-span-5" },
  { id: 3, value: "4", label: "Movies", colClass: "col-span-3" },
  { id: 4, value: "65+", label: "Episodes", colClass: "col-span-4" },
  { id: 5, value: "20+", label: "Years of Ohana", colClass: "col-span-8" }
];

export default function AppIntro() {
  return (
    <div className="flex flex-col w-full max-w-xl">
      <h1 className="text-5xl font-extrabold text-primary mb-4 tracking-tight">Stitch Posts</h1>
      <p className="text-lg text-gray-800 mb-8 font-medium">
        Connect with friends and share your favorite Stitch moments.
      </p>

      <div className="bg-white rounded-2xl p-6 shadow-[0_0_20px_rgba(0,0,0,0.03)] border border-gray-100">
        <h3 className="text-primary text-xs font-bold uppercase tracking-widest mb-2">
          About Stitch World
        </h3>
        <h2 className="text-xl font-bold text-gray-900 mb-3">
          Your Ultimate Stitch Community
        </h2>
        <p className="text-gray-600 text-sm mb-6 leading-relaxed">
          Welcome to Stitch World, a place for fans to discover Stitch adventures, share their favorite moments, discuss characters, and connect with other Stitch fans from around the world.
        </p>

        <div className="grid grid-cols-12 gap-3">
          {statsData.map((stat) => (
            <div key={stat.id} className={`${stat.colClass} bg-slate-50 border border-slate-200 rounded-xl p-3`}>
              <div className="text-primary font-bold text-lg leading-none mb-1">{stat.value}</div>
              <div className="text-slate-600 text-[10px] font-bold uppercase tracking-wide">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
