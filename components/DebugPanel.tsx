import React, { useEffect, useState, useRef } from 'react';
import { Terminal, X, Trash2, Minimize2, Maximize2 } from 'lucide-react';

const DebugPanel: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Monkey patch dataLayer.push to capture events for the debugger
    const originalPush = window.dataLayer.push;
    window.dataLayer.push = function(...args: any[]) {
      setEvents(prev => [...prev, ...args]);
      return originalPush.apply(this, args);
    };

    return () => {
      window.dataLayer.push = originalPush;
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [events, isOpen]);

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 left-4 z-50 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 transition-colors"
        title="Open GTM Debugger"
      >
        <Terminal size={20} />
      </button>
    );
  }

  return (
    <div 
      className={`fixed left-4 z-50 bg-gray-900 text-green-400 rounded-lg shadow-2xl border border-gray-700 transition-all duration-300 flex flex-col ${
        isMinimized ? 'bottom-4 w-64 h-12' : 'bottom-4 w-80 sm:w-96 h-96'
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-800 rounded-t-lg">
        <div className="flex items-center space-x-2">
          <Terminal size={16} />
          <span className="text-xs font-bold text-white uppercase tracking-wider">GTM Event Log</span>
        </div>
        <div className="flex items-center space-x-2">
          <button onClick={() => setEvents([])} className="text-gray-400 hover:text-white" title="Clear">
            <Trash2 size={14} />
          </button>
          <button onClick={() => setIsMinimized(!isMinimized)} className="text-gray-400 hover:text-white">
             {isMinimized ? <Maximize2 size={14} /> : <Minimize2 size={14} />}
          </button>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={14} />
          </button>
        </div>
      </div>

      {/* Content */}
      {!isMinimized && (
        <div 
          ref={scrollRef}
          className="flex-1 overflow-y-auto p-4 font-mono text-xs space-y-3"
        >
          {events.length === 0 ? (
            <p className="text-gray-500 italic">No events fired yet...</p>
          ) : (
            events.map((evt, idx) => (
              <div key={idx} className="border-b border-gray-800 pb-2 last:border-0">
                <div className="flex items-center space-x-2 mb-1">
                   <span className="text-blue-400">[{new Date().toLocaleTimeString()}]</span>
                   <span className="text-yellow-400 font-bold">{evt.event || 'Unknown'}</span>
                </div>
                <pre className="text-gray-300 overflow-x-auto">
                  {JSON.stringify(evt, null, 2)}
                </pre>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};

export default DebugPanel;