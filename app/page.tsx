'use client';

import { useState } from 'react';

export default function Home() {
  const [keyword, setKeyword] = useState('');
  const [titles, setTitles] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const generate = async () => {
    if (!keyword.trim()) return;
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keyword }),
      });
      const data = await res.json();
      setTitles(data.titles || []);
    } catch (err) {
      setTitles(['Error generating titles. Try again.']);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white p-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-bold text-center mt-8 mb-2 text-gray-800">
          Free AI YouTube Title Generator 2025
        </h1>
        <p className="text-center text-gray-600 mb-8">
          Enter keyword → get 3 SEO-optimized, high-CTR titles in seconds. No signup.
        </p>

        <div className="bg-white p-6 rounded-xl shadow-lg">
          <input
            type="text"
            placeholder="e.g., how to learn Python in 2025"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && generate()}
            className="w-full p-4 border border-gray-300 rounded-lg mb-4 text-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={generate}
            disabled={loading || !keyword.trim()}
            className="w-full bg-blue-600 text-white py-4 rounded-lg font-bold text-lg disabled:opacity-50 hover:bg-blue-700 transition"
          >
            {loading ? 'Generating...' : 'Generate Titles'}
          </button>

          {titles.length > 0 && (
            <div className="mt-6 space-y-3">
              {titles.map((title, i) => (
                <div key={i} className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                  <p className="font-semibold text-gray-800">{title}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <p className="text-center text-sm text-gray-500 mt-8">
          Powered by AI • Updated for 2025 YouTube Algorithm
        </p>
      </div>
    </div>
  );
}
