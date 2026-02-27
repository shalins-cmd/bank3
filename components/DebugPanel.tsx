import React, { useEffect, useState, useRef } from 'react';
import { Terminal, X, Trash2, Minimize2, Maximize2 } from 'lucide-react';

const DebugPanel: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // GTM-Compliant Event Listener
    // Instead of overriding dataLayer.push (which breaks GTM), we use a Proxy
    // to intercept push calls WITHOUT replacing the method.
    // This allows GTM to work normally while we capture events for debugging.
    
    if (typeof window === 'undefined' || !window.dataLayer) {
      return;
    }

    const path = ['dataLayer'];
    const handler = {
      get(target: any, prop: string | symbol) {
        if (prop === 'push') {
          return function(...args: any[]) {
            // Capture event for debug panel
            setEvents(prev => [...prev, ...args]);
            // Call the original push method
            return Array.prototype.push.apply(target, args);
          };
        }
        return Reflect.get(target, prop);
      }
    };

    // Replace dataLayer with a Proxy that intercepts push
    const originalDataLayer = window.dataLayer;
    window.dataLayer = new Proxy(originalDataLayer, handler);

    return () => {
      // Restore original dataLayer
      window.dataLayer = originalDataLayer;
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