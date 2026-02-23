
import React, { useState } from 'react';
import { useMessages } from '../src/hooks/useData';
import { apiService } from '../src/services/api';

const AdminMessages: React.FC = () => {
  const { messages, loading, error, refetch } = useMessages();
  const [selectedMsg, setSelectedMsg] = useState<any | null>(null);
  const [updating, setUpdating] = useState(false);

  React.useEffect(() => {
    if (messages.length > 0 && !selectedMsg) {
      setSelectedMsg(messages[0]);
    }
  }, [messages, selectedMsg]);

  const markAsRead = async (messageId: string) => {
    setUpdating(true);
    try {
      await apiService.updateMessage(messageId, { isRead: true });
      refetch();
    } catch (error) {
      console.error('Failed to mark message as read:', error);
    } finally {
      setUpdating(false);
    }
  };

  const deleteMessage = async (messageId: string) => {
    if (!confirm('Are you sure you want to delete this message?')) return;
    
    setUpdating(true);
    try {
      await apiService.deleteMessage(messageId);
      if (selectedMsg?._id === messageId) {
        setSelectedMsg(null);
      }
      refetch();
    } catch (error) {
      console.error('Failed to delete message:', error);
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex h-full min-h-0 bg-background-dark border border-border-dark rounded-2xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full min-h-0 bg-background-dark border border-border-dark rounded-2xl overflow-hidden">
        <div className="flex-1 flex items-center justify-center text-center p-8">
          <div>
            <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-red-400 text-2xl">error</span>
            </div>
            <h3 className="text-white text-xl font-bold mb-2">Failed to load messages</h3>
            <p className="text-text-secondary">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 bg-background-dark border border-border-dark rounded-2xl overflow-hidden shadow-2xl animate-in fade-in duration-300">
      <div className="w-full max-w-sm flex flex-col border-r border-border-dark bg-background-dark/30">
        <div className="p-4 flex flex-col gap-4 border-b border-border-dark">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Inbox</h2>
            <span className="bg-primary text-background-dark text-xs font-bold px-2 py-0.5 rounded-full">3 New</span>
          </div>
          <div className="flex w-full items-center rounded-lg bg-surface-dark border border-border-dark focus-within:border-primary transition-colors h-10">
            <div className="text-text-secondary flex items-center justify-center pl-3">
              <span className="material-symbols-outlined text-[20px]">search</span>
            </div>
            <input className="w-full bg-transparent border-none text-sm text-white focus:ring-0 px-3" placeholder="Search messages..." />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto no-scrollbar">
          {messages.length === 0 ? (
            <div className="p-8 text-center">
              <div className="w-12 h-12 bg-slate-500/10 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="material-symbols-outlined text-slate-400">mail</span>
              </div>
              <p className="text-text-secondary text-sm">No messages yet</p>
            </div>
          ) : (
          messages.map((msg) => (
            <div 
              key={msg._id}
              onClick={() => setSelectedMsg(msg)}
              className={`cursor-pointer flex items-start gap-3 p-4 transition-colors ${
                selectedMsg?._id === msg._id ? 'bg-primary/10 border-l-4 border-primary' : 'border-b border-border-dark/50 hover:bg-surface-dark'
              }`}
            >
              <div className="h-10 w-10 rounded-full shrink-0 bg-primary/20 flex items-center justify-center text-primary font-bold text-sm">
                {msg.senderName.charAt(0).toUpperCase()}
              </div>
              <div className="flex flex-col flex-1 min-w-0 gap-1">
                <div className="flex justify-between items-baseline">
                  <p className={`text-sm font-semibold truncate ${selectedMsg?._id === msg._id ? 'text-primary' : 'text-white'}`}>{msg.senderName}</p>
                  <span className="text-text-secondary text-[10px]">{new Date(msg.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-white text-sm font-medium truncate">{msg.subject}</p>
                <p className="text-text-secondary text-xs line-clamp-2">{msg.content}</p>
                {!msg.isRead && (
                  <div className="w-2 h-2 bg-primary rounded-full mt-1"></div>
                )}
              </div>
            </div>
          ))
          )}
        </div>
      </div>

      <div className="flex-1 flex flex-col bg-surface-dark h-full">
        {selectedMsg ? (
          <div className="flex flex-col h-full animate-in fade-in duration-500">
            <header className="flex items-center justify-between p-6 border-b border-border-dark bg-background-dark/20">
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold border border-border-dark">
                  {selectedMsg.senderName.charAt(0).toUpperCase()}
                </div>
                <div className="flex flex-col">
                  <h2 className="text-lg font-bold text-white">{selectedMsg.senderName}</h2>
                  <p className="text-sm text-text-secondary">{selectedMsg.senderEmail}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => markAsRead(selectedMsg._id)}
                  disabled={updating || selectedMsg.isRead}
                  className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-border-dark transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">
                    {selectedMsg.isRead ? 'mark_email_read' : 'mark_email_unread'}
                  </span>
                </button>
                <button className="p-2 rounded-lg text-text-secondary hover:text-white hover:bg-border-dark transition-colors"><span className="material-symbols-outlined">archive</span></button>
                <button 
                  onClick={() => deleteMessage(selectedMsg._id)}
                  disabled={updating}
                  className="p-2 rounded-lg text-text-secondary hover:text-red-400 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                >
                  <span className="material-symbols-outlined">delete</span>
                </button>
              </div>
            </header>
            <div className="flex-1 overflow-y-auto p-8 lg:px-12 bg-surface-dark">
              <div className="max-w-3xl flex flex-col gap-6">
                <div className="flex justify-between items-center">
                  <h1 className="text-2xl font-bold text-white">{selectedMsg.subject}</h1>
                  <span className="text-sm text-text-secondary">{new Date(selectedMsg.createdAt).toLocaleString()}</span>
                </div>
                <div className="text-slate-300 leading-relaxed space-y-4 text-lg">
                  {selectedMsg.content}
                </div>
              </div>
            </div>
            <div className="p-6 bg-background-dark border-t border-border-dark">
              <div className="max-w-4xl mx-auto flex flex-col gap-3">
                <div className="relative rounded-xl border border-border-dark bg-surface-dark p-2 focus-within:border-primary transition-all">
                  <textarea className="w-full bg-transparent border-none focus:ring-0 p-4 min-h-[120px] text-white placeholder-text-secondary resize-none" placeholder="Write your reply here..."></textarea>
                  <div className="flex justify-between items-center px-2 py-1">
                    <div className="flex gap-2">
                       <button className="text-text-secondary hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">attach_file</span></button>
                       <button className="text-text-secondary hover:text-white transition-colors"><span className="material-symbols-outlined text-[20px]">image</span></button>
                    </div>
                    <button className="px-6 py-2 rounded-lg bg-primary text-background-dark font-bold hover:brightness-110 transition-all flex items-center gap-2">
                      <span>Send Reply</span>
                      <span className="material-symbols-outlined text-sm">send</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center text-text-secondary">
            <p>Select a message to read</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminMessages;
