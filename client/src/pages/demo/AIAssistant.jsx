
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Send, Sparkles } from 'lucide-react';

export default function AIAssistant() {
  const navigate = useNavigate();
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'You can now ask questions about your live data. Try asking: "Show my top expenses this month" or "Which invoices are overdue?"' }
  ]);
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!input.trim()) return;

    setHasInteracted(true);
    const userMsg = input;
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setInput('');
    setLoading(true);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || '${import.meta.env.VITE_API_URL || 'http://localhost:5001'}'}`, {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({ query: userMsg })
      });
      const data = await res.json();
      
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'assistant', content: data.response }]);
        setLoading(false);
      }, 800);
    } catch(err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div className="animate-in fade-in duration-500 h-full flex flex-col relative pb-24">
      <div className="mb-6 flex items-center gap-4">
        <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center flex-shrink-0">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Step 5: Act</h1>
          <p className="text-slate-600 mt-1">Instead of building reports manually, just ask the FinPilot AI.</p>
        </div>
      </div>

      <div className="flex-1 bg-white border border-slate-200 rounded-3xl shadow-lg flex flex-col overflow-hidden relative">
        
        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-slate-50/50">
          {messages.map((m, i) => (
            <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
               <div className={`max-w-[70%] p-5 rounded-2xl shadow-sm ${m.role === 'user' ? 'bg-slate-900 text-white rounded-tr-sm' : 'bg-white border border-slate-200 text-slate-800 rounded-tl-sm'}`}>
                 {m.role === 'assistant' && <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2 flex items-center gap-1"><Sparkles className="w-3 h-3"/> FinPilot AI</div>}
                 <div className="whitespace-pre-wrap text-sm leading-relaxed font-medium">{m.content}</div>
               </div>
            </div>
          ))}
          {loading && (
             <div className="flex justify-start">
               <div className="bg-white border border-slate-200 p-5 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1.5 h-[60px]">
                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></span>
                 <span className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></span>
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
              className="w-full bg-slate-50 border border-slate-200 text-slate-900 font-medium rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:bg-white transition-all shadow-inner"
            />
            <button type="submit" disabled={!input.trim() || loading} className="absolute right-3 p-2.5 bg-blue-600 text-white rounded-lg transition-all hover:bg-blue-700 disabled:opacity-50 disabled:hover:bg-blue-600">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Final CTA */}
      {hasInteracted && (
        <div className="absolute bottom-0 left-0 w-full p-6 animate-in slide-in-from-bottom-4 duration-500 flex justify-end pointer-events-none">
          <button onClick={() => navigate('/')} className="pointer-events-auto px-8 py-4 bg-green-600 hover:bg-green-700 text-white font-bold rounded-xl shadow-xl shadow-green-600/20 transition-all flex items-center justify-center gap-2 group">
            End of Demo. Join Waitlist <Sparkles className="w-5 h-5 group-hover:scale-110 transition-transform" />
          </button>
        </div>
      )}
    </div>
  );
}