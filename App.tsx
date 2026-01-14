import React, { useState } from 'react';
import { generatePortfolio } from './services/geminiService';
import { PortfolioData } from './types';
import PortfolioView from './components/PortfolioView';
import Editor from './components/Editor';

const App: React.FC = () => {
  const [prompt, setPrompt] = useState('');
  const [loading, setLoading] = useState(false);
  const [generatedData, setGeneratedData] = useState<PortfolioData | null>(null);

  const handleGenerate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = await generatePortfolio(prompt);
      setGeneratedData(data);
    } catch (err) {
      alert('Error building site.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50">
      {!generatedData ? (
        <div className="flex flex-col items-center justify-center min-h-screen p-6">
          <h1 className="text-6xl font-black mb-4">AI <span className="gradient-text">Portfolio.</span></h1>
          <form onSubmit={handleGenerate} className="w-full max-w-xl">
            <textarea 
              className="w-full p-6 rounded-3xl border shadow-xl mb-4" 
              placeholder="Tell us about yourself..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button className="w-full bg-indigo-600 text-white p-4 rounded-2xl font-bold">
              {loading ? 'Generating...' : 'Create My Site'}
            </button>
          </form>
        </div>
      ) : (
        <>
          <PortfolioView data={generatedData} />
          <Editor data={generatedData} onUpdate={setGeneratedData} />
        </>
      )}
    </div>
  );
};

export default App;
