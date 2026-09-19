
import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Hi! I am the FinPilot AI Assistant. I can analyze your financial data and answer questions. Try asking: "Show my top expenses this month" or "Which invoices are overdue?"' }
  ]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!input.trim()) return;

    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch('http://localhost:5001/api/demo/assistant', {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: userMsg })
      });
      const data = await res.json();
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        setLoading(false);
      }, 600); // simulated thinking delay
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 h-[calc(100vh-8rem)] flex flex-col">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          AI Assistant <Sparkles className="w-6 h-6 text-blue-500" />
        </h1>
        <p className="text-slate-500 mt-1">Chat directly with your financial data.</p>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-2xl shadow-sm flex flex-col overflow-hidden">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] p-4 rounded-2xl ${m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 shadow-sm rounded-tl-sm'}`}>
                 {m.role === 'assistant' && <div className="text-[10px] font-bold text-blue-500 uppercase tracking-widest mb-2">FinPilot AI</div>}
                 <div className="whitespace-pre-wrap text-sm leading-relaxed">{m.content}</div>
               </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white border border-slate-200 text-slate-400 p-4 rounded-2xl rounded-tl-sm shadow-sm flex gap-1">
                 <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                 <span className="w-2 h-2 bg-slate-300 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
               </div>
             </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask a question about your finances..."
              className="w-full bg-slate-100 border border-slate-200 text-slate-900 rounded-xl pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-blue-600/50 focus:bg-white transition-all"
            />
            <button type="submit" disabled={!input.trim() || loading} className="absolute right-2 p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50">
              <Send className="w-5 h-5" />
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}