import React, { useContext, useState, useRef, useEffect } from 'react';
import { WorkspaceContext } from '../../context/WorkspaceContext';
import { Send, Bot, User, Sparkles, Loader2, ArrowRight } from 'lucide-react';

const SUGGESTED_PROMPTS = [
  "What is my current cash balance?",
  "How much runway do we have left?",
  "Show me my total overdue invoices.",
  "What is our revenue this month?",
  "How many transactions need review?"
];

export default function AIAssistant() {
  const { activeCompany } = useContext(WorkspaceContext);
  const [messages, setMessages] = useState([
    {
      id: 1,
      role: 'assistant',
      content: 'Hello! I am your FINPILOT AI Assistant. I can analyze your transactions, calculate your runway, or give you a summary of your outstanding invoices. What would you like to know?',
      timestamp: new Date().toISOString()
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSend = async (text) => {
    const messageText = text || input;
    if (!messageText.trim() || !activeCompany) return;

    // Add user message
    const newUserMessage = {
      id: Date.now(),
      role: 'user',
      content: messageText,
      timestamp: new Date().toISOString()
    };
    
    setMessages(prev => [...prev, newUserMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch(`http://localhost:5001/api/companies/${activeCompany._id}/ai/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify({ message: messageText })
      });

      const data = await response.json();
      
      if (data.success) {
        setMessages(prev => [...prev, {
          id: Date.now() + 1,
          role: 'assistant',
          content: data.data.text,
          timestamp: new Date().toISOString()
        }]);
      } else {
        throw new Error(data.error?.message || 'Failed to get response');
      }
    } catch (error) {
      console.error(error);
      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        role: 'assistant',
        content: "I'm sorry, I encountered an error communicating with the server.",
        timestamp: new Date().toISOString()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!activeCompany) return null;

  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-8rem)] flex flex-col animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-md shadow-blue-600/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">FINPILOT AI</h1>
            <p className="text-slate-500 text-sm font-medium">
              Financial intelligence for <span className="text-slate-700 font-bold">{activeCompany.displayName}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Chat Container */}
      <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden flex flex-col relative">
        
        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto p-6 scroll-smooth">
          <div className="flex flex-col gap-6">
            {messages.map((msg) => (
              <div 
                key={msg.id} 
                className={`flex gap-4 max-w-[85%] ${msg.role === 'user' ? 'self-end flex-row-reverse' : 'self-start'}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1 ${
                  msg.role === 'user' 
                    ? 'bg-slate-100 text-slate-600' 
                    : 'bg-blue-600 text-white shadow-md shadow-blue-600/20'
                }`}>
                  {msg.role === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                
                <div className={`px-5 py-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-slate-900 text-white rounded-tr-sm' 
                    : 'bg-slate-50 border border-slate-100 text-slate-800 rounded-tl-sm'
                }`}>
                  {/* Basic markdown parsing for bold text */}
                  <div className="text-[15px] leading-relaxed" 
                    dangerouslySetInnerHTML={{ 
                      __html: msg.content.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-blue-600">$1</strong>')
                    }} 
                  />
                  <div className={`text-[10px] font-bold mt-2 tracking-wider ${
                    msg.role === 'user' ? 'text-slate-400' : 'text-slate-400'
                  }`}>
                    {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                  </div>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-4 max-w-[85%] self-start">
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white shadow-md shadow-blue-600/20 flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4" />
                </div>
                <div className="px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 rounded-tl-sm flex items-center gap-2">
                  <Loader2 className="w-4 h-4 text-blue-600 animate-spin" />
                  <span className="text-sm font-medium text-slate-500">Analyzing data...</span>
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 bg-white border-t border-slate-100">
          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {SUGGESTED_PROMPTS.map((prompt, i) => (
                <button
                  key={i}
                  onClick={() => handleSend(prompt)}
                  className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-full text-xs font-semibold text-slate-600 hover:bg-slate-100 hover:text-slate-900 hover:border-slate-300 transition-all flex items-center gap-1.5"
                >
                  {prompt}
                  <ArrowRight className="w-3 h-3 text-slate-400" />
                </button>
              ))}
            </div>
          )}
          
          <div className="relative flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20 transition-all">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyPress}
              placeholder="Ask FINPILOT anything about your finances..."
              className="w-full max-h-32 min-h-[44px] bg-transparent resize-none outline-none py-2.5 px-3 text-sm font-medium text-slate-900 placeholder:text-slate-400"
              rows={1}
            />
            <button
              onClick={() => handleSend()}
              disabled={!input.trim() || isLoading}
              className={`p-3 rounded-xl flex-shrink-0 transition-all ${
                input.trim() && !isLoading 
                  ? 'bg-blue-600 text-white shadow-md hover:bg-blue-700 shadow-blue-600/20' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
          <div className="text-center mt-2">
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
              AI responses are generated based on your live financial data
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
