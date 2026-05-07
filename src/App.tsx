import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Database, Code2, Globe, CheckCircle2, ChevronRight, Server } from 'lucide-react';

interface Question {
  id: number;
  question: string;
  options: string[];
}

export default function App() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'preview' | 'code'>('preview');

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch('/api/questions');
        if (!response.ok) throw new Error('Failed to fetch questions');
        const data = await response.json();
        setQuestions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, []);

  const flaskCode = `from flask import Flask, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

questions_data = [
    {
        "id": 1,
        "question": "What is the capital of France?",
        "options": ["London", "Berlin", "Paris", "Madrid"]
    },
    # ... 10 sample questions
]

@app.route('/api/questions', methods=['GET'])
def get_questions():
    return jsonify(questions_data)

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=3000, debug=True)`;

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-sky-400 selection:text-slate-950 antialiased">
      {/* Navbar / Header */}
      <header className="max-w-7xl mx-auto px-6 lg:px-12 pt-12 pb-8 border-b border-slate-800 flex flex-col md:flex-row justify-between items-end gap-6">
        <div>
          <p className="text-sky-400 font-mono text-sm tracking-[0.3em] uppercase mb-4 flex items-center gap-2">
            <Terminal className="w-4 h-4" />
            Backend Technical Specs
          </p>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.8] uppercase mb-2">
            Quiz Master <span className="text-sky-400 italic">API</span>
          </h1>
        </div>
        <div className="text-right w-full md:w-auto">
          <div className="bg-sky-400 text-slate-950 px-4 py-2 font-bold text-xl mb-2 italic inline-block">
            v1.2.0 STABLE
          </div>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-widest">
            Documentation / Endpoint Explorer
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-12">
        <div className="grid lg:grid-cols-12 gap-12">
          
          {/* Left Column - Meta & Info */}
          <div className="lg:col-span-5 space-y-12">
            <div className="space-y-6">
              <h2 className="text-3xl font-black mb-6 tracking-tight uppercase border-l-4 border-sky-500 pl-6">
                The Endpoint
              </h2>
              <div className="flex items-center gap-4 bg-slate-900 border border-slate-800 p-5 rounded-lg">
                <span className="bg-green-500 text-slate-950 font-black px-3 py-1 rounded text-xs">GET</span>
                <code className="font-mono text-sky-400 text-xl tracking-tighter">/api/questions</code>
              </div>
              <p className="text-slate-400 leading-relaxed font-serif italic text-lg opacity-80">
                Returns a structured JSON payload containing a curated list of trivia questions. 
                Features full CORS support and standardized response formatting via Flask's 
                native <span className="text-slate-200 font-mono text-sm non-italic">jsonify()</span> utility.
              </p>
            </div>

            {/* Controls */}
            <div className="bg-slate-900/40 border border-slate-800 p-1 flex">
              <button 
                onClick={() => setActiveTab('preview')}
                className={`flex-1 px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-all ${activeTab === 'preview' ? 'bg-sky-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-100'}`}
              >
                Response Preview
              </button>
              <button 
                onClick={() => setActiveTab('code')}
                className={`flex-1 px-4 py-3 font-mono text-[10px] uppercase tracking-widest transition-all ${activeTab === 'code' ? 'bg-sky-400 text-slate-950 font-bold' : 'text-slate-400 hover:text-slate-100'}`}
              >
                Implementation
              </button>
            </div>

            {/* Meta Cards */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-900/20 border border-slate-800 p-6 space-y-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Rate Limit</p>
                <p className="font-bold text-xl tracking-tight">100 Req/m</p>
              </div>
              <div className="bg-slate-900/20 border border-slate-800 p-6 space-y-2">
                <p className="text-[10px] font-mono text-slate-500 uppercase tracking-widest">Status</p>
                <p className="font-bold text-xl tracking-tight flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                  Nominal
                </p>
              </div>
            </div>
          </div>

          {/* Right Column - Dynamic Content */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              {activeTab === 'preview' ? (
                <motion.div 
                  key="preview"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-4"
                >
                  {loading ? (
                    <div className="flex flex-col items-center gap-4 p-24 justify-center font-mono text-sky-400 animate-pulse border border-slate-800 bg-slate-900/20 rounded-xl">
                      <Database className="w-12 h-12" />
                      <span className="tracking-[0.5em] text-xs uppercase">Initializing_Stream...</span>
                    </div>
                  ) : error ? (
                    <div className="p-8 border border-red-900/50 bg-red-950/20 text-red-400 font-mono text-sm uppercase tracking-widest rounded-xl">
                      CRITICAL_ERROR: {error}
                    </div>
                  ) : (
                    <div className="grid gap-3">
                      <div className="flex justify-between items-center px-4 mb-2">
                        <h3 className="text-[10px] font-mono uppercase tracking-[0.2em] text-slate-500 italic">Curated_Entries_List</h3>
                        <div className="flex gap-1">
                          {[1, 2, 3].map(i => <div key={i} className="w-1.5 h-1.5 rounded-full bg-slate-800" />)}
                        </div>
                      </div>
                      {questions.map((q) => (
                        <motion.div 
                          key={q.id}
                          layoutId={`q-${q.id}`}
                          className="group bg-slate-900/40 border border-slate-800 p-8 hover:border-sky-400/50 hover:bg-slate-900/80 transition-all cursor-pointer relative overflow-hidden rounded-xl"
                        >
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                            <ChevronRight className="w-4 h-4" />
                          </div>
                          <div className="flex flex-col gap-4">
                            <div className="flex items-center gap-4">
                              <span className="font-mono text-sky-400 text-sm font-bold tracking-widest border border-sky-400/30 px-3 py-1 rounded">
                                ID_{q.id < 10 ? `0${q.id}` : q.id}
                              </span>
                              <h4 className="text-xl font-bold tracking-tight">{q.question}</h4>
                            </div>
                            <div className="grid grid-cols-2 gap-2">
                              {q.options.map((opt, i) => (
                                <div key={i} className="text-[10px] uppercase font-mono border border-slate-800 bg-slate-950/50 px-4 py-2 hover:bg-sky-400 hover:text-slate-950 transition-colors">
                                  {opt}
                                </div>
                              ))}
                            </div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="code"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="bg-slate-950 rounded-xl border border-slate-100 p-8 font-mono text-xs relative group overflow-hidden shadow-[0_0_50px_rgba(56,189,248,0.05)]"
                >
                  <div className="absolute top-4 right-4 flex gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                    <div className="w-2.5 h-2.5 rounded-full bg-slate-800" />
                  </div>
                  <div className="flex justify-between items-center mb-10 border-b border-slate-800 pb-4">
                    <p className="text-slate-500 uppercase tracking-widest italic">flask_app_implementation.py</p>
                  </div>
                  <pre className="whitespace-pre-wrap leading-relaxed text-slate-300">
                    {flaskCode.split('\n').map((line, idx) => (
                      <div key={idx} className="flex gap-6 group/line">
                        <span className="text-slate-700 w-4 text-right select-none">{idx + 1}</span>
                        <span className="flex-1">{line}</span>
                      </div>
                    ))}
                  </pre>
                  <Code2 className="absolute bottom-4 right-4 w-12 h-12 text-sky-400 opacity-5 pointer-events-none" />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>

      <footer className="mt-24 border-t border-slate-900 bg-slate-950 flex flex-col md:flex-row justify-between items-center p-12 gap-6">
        <div className="flex flex-wrap justify-center gap-8 text-[11px] font-mono text-slate-600 uppercase tracking-widest">
          <span className="flex items-center gap-2 truncate">
            <Database className="w-3 h-3" /> Rate: 100 req/min
          </span>
          <span className="flex items-center gap-2 truncate">
            <CheckCircle2 className="w-3 h-3" /> Auth: None Required
          </span>
          <span className="flex items-center gap-2 truncate">
            <Globe className="w-3 h-3" /> Format: JSON UTF-8
          </span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-mono text-slate-700 font-bold tracking-tighter uppercase">
            System_Status_Nominal // AI_Explorer_REF_9901
          </p>
          <p className="text-[10px] font-mono text-slate-800 italic">
            Last Synchronized: {new Date().toISOString()}
          </p>
        </div>
      </footer>
    </div>
  );

}
