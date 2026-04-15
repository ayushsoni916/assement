import React, { useState } from 'react';
import { Search, Sparkles, Car, Fuel, ShieldCheck, Users, ChevronDown, ChevronUp } from 'lucide-react';
import { cars } from './data/cars';
import { findBestCars } from './utils/algo'; // We'll create this logic

const App = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = () => {
    const topMatches = findBestCars(query, cars);
    setResults(topMatches);
    console.log(topMatches)
  };

  // Separate component for individual car cards
  const CarCard = ({ car }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    return (
      <div
        key={car.id}
        className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 hover:shadow-md transition-all duration-300 flex flex-col h-fit"
      >
        {/* 1. Top Section (Always Visible) */}
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="text-xl font-bold text-slate-800">{car.make} {car.model}</h3>
            <p className="text-sm text-slate-500">{car.type} • {car.variant || 'Standard'}</p>
          </div>
          <span className="bg-blue-50 text-blue-700 text-xs font-bold px-2 py-1 rounded-lg">
            {car.score} Match Pts
          </span>
        </div>

        <div className="text-2xl font-black text-blue-600 mb-4">
          ₹{(car.price / 100000).toFixed(1)} Lakh
        </div>

        {/* 2. Quick Specs (Always Visible) */}
        <div className="grid grid-cols-3 gap-2 mb-4 text-slate-600 text-xs font-medium">
          <div className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl justify-center">
            <Fuel className="w-3 h-3 text-blue-500" /> {car.mileage} {car.type === 'EV' ? 'km' : 'kmpl'}
          </div>
          <div className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl justify-center">
            <ShieldCheck className="w-3 h-3 text-green-500" /> {car.safety}/5
          </div>
          <div className="flex items-center gap-1 bg-slate-50 p-2 rounded-xl justify-center">
            <Users className="w-3 h-3 text-purple-500" /> {car.seats} Seater
          </div>
        </div>

        {/* 3. AI Insights (Always Visible) */}
        <div className="bg-amber-50 border border-amber-100 rounded-xl p-3 mb-4">
          <div className="flex items-center gap-2 mb-1">
            <Sparkles className="w-3 h-3 text-amber-600" />
            <p className="text-[10px] font-bold text-amber-700 uppercase tracking-wider">AI Recommendation</p>
          </div>
          <p className="text-sm text-amber-900 leading-snug">
            {car.description}
          </p>
        </div>

        {/* 4. Collapsible Detailed Specs */}
        <div className={`overflow-hidden transition-all duration-500 ease-in-out ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}`}>
          <div className="pt-4 border-t border-dashed border-slate-200 mt-2 space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-500">Match Reasons</span>
              <div className="flex gap-1">
                {car.matchReasons.map(reason => (
                  <span key={reason} className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded-md text-[10px] font-medium italic">
                    #{reason}
                  </span>
                ))}
              </div>
            </div>

            {/* Detailed Specs Table */}
            <div className="bg-slate-50 rounded-xl p-3 space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-semibold">User Reviews</span>
                <span className="text-slate-800 font-bold">★ {car.reviews}/5</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-semibold">Engine/Power</span>
                <span className="text-slate-800 font-bold">1.2L DualJet</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-500 font-semibold">Transmission</span>
                <span className="text-slate-800 font-bold">Manual/AMT</span>
              </div>
            </div>
          </div>
        </div>

        {/* 5. Toggle Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="w-full mt-4 py-2 text-sm font-semibold text-slate-500 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-colors flex items-center justify-center gap-1"
        >
          {isExpanded ? (
            <>Show Less <ChevronUp className="w-4 h-4" /></>
          ) : (
            <>View Full Specs <ChevronDown className="w-4 h-4" /></>
          )}
        </button>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      {/* 1. Header & Hero */}
      <header className="max-w-6xl mx-auto pt-16 px-4 text-center">
        <div className="flex justify-center items-center gap-2 mb-4">
          <Sparkles className="text-blue-600 w-8 h-8" />
          <h1 className="text-4xl font-extrabold tracking-tight">CarFinder AI</h1>
        </div>
        <p className="text-slate-500 text-lg mb-10">Describe your life, we'll find your drive.</p>

        {/* 2. Search Bar Section */}
        <div className="max-w-2xl mx-auto relative group">
          <div className="flex gap-2 p-2 bg-white rounded-2xl shadow-xl border border-slate-200 group-focus-within:border-blue-400 transition-all">
            <div className="flex items-center pl-3 flex-1">
              <Search className="text-slate-400 mr-2 w-5 h-5" />
              <input
                type="text"
                placeholder="e.g. I have 2 kids, want safety and a low budget..."
                className="w-full outline-none text-slate-700 placeholder:text-slate-400"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
              />
            </div>
            <button
              onClick={handleSearch}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
            >
              Analyze
            </button>
          </div>
        </div>
      </header>

      {/* 3. Results Section */}
      <main className="max-w-6xl mx-auto py-16 px-4">
        {results.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {results.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20 border-2 border-dashed border-slate-200 rounded-3xl">
            <p className="text-slate-400">Your matches will appear here...</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;