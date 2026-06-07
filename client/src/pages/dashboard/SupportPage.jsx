import React, { useEffect, useRef, useState } from 'react';
import { BookOpen, ChevronDown, HelpCircle, MessageSquare, Send } from 'lucide-react';
import { sendAIChatMessage } from '../../lib/api';
import { useAuth } from '../../hooks/useAuth';
import { AtlasButton, AtlasCard, PageFrame, PageHeader } from '../../components/common/AgileUI';

const tabs = [
  { id: 'chat', label: 'Live Chat', icon: MessageSquare },
  { id: 'faq', label: 'FAQs', icon: HelpCircle },
  { id: 'tickets', label: 'Support Tickets', icon: BookOpen },
];

export default function SupportPage() {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('chat');
  const [chatMessages, setChatMessages] = useState([
    { id: 1, sender: 'agent', text: 'Hi! How can I assist you today?', timestamp: Date.now() },
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messageEndRef = useRef(null);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { id: Date.now(), sender: 'user', text: input.trim(), timestamp: Date.now() };
    setChatMessages((messages) => [...messages, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      const response = await sendAIChatMessage(userMessage.text, user?.id);
      const botMessage = {
        id: Date.now() + 1,
        sender: 'agent',
        text: response.data.content || response.data.response || 'No response received.',
        timestamp: Date.now(),
      };
      setChatMessages((messages) => [...messages, botMessage]);
    } catch (error) {
      console.error('Error fetching bot response:', error);
      setChatMessages((messages) => [
        ...messages,
        { id: Date.now() + 1, sender: 'agent', text: "Sorry, I'm having trouble connecting. Please try again later.", timestamp: Date.now() },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages]);

  return (
    <PageFrame className="p-4 md:p-7">
      <PageHeader eyebrow="Help desk" title="Support Center" description="Get help with projects, account access, and collaboration workflows.">
        <nav className="flex flex-wrap gap-2" role="tablist">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              type="button"
              onClick={() => setActiveTab(id)}
              className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-black transition ${
                activeTab === id ? 'bg-[#3fbe8c] text-[#111]' : 'bg-[#303030] text-white hover:bg-[#3a3a3a]'
              }`}
              role="tab"
              aria-selected={activeTab === id}
            >
              <Icon className="h-4 w-4" />
              {label}
            </button>
          ))}
        </nav>
      </PageHeader>

      <AtlasCard className="min-h-[660px] overflow-hidden">
        {activeTab === 'chat' ? (
          <div className="flex h-[660px] flex-col">
            <div className="min-h-0 flex-1 space-y-4 overflow-auto p-5">
              {chatMessages.map(({ id, sender, text }) => (
                <div key={id} className={`flex ${sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[78%] rounded-2xl px-4 py-3 ${sender === 'user' ? 'bg-[#3fbe8c] text-[#111]' : 'bg-[#242424] text-white'}`}>
                    <p className="text-sm font-semibold leading-relaxed">{text}</p>
                  </div>
                </div>
              ))}
              {isTyping ? (
                <div className="flex justify-start">
                  <div className="rounded-2xl bg-[#242424] px-4 py-3 text-sm font-semibold text-white">Typing...</div>
                </div>
              ) : null}
              <div ref={messageEndRef} />
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-3 border-t border-white/10 p-4"
            >
              <textarea
                rows={1}
                placeholder="Type your message..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    handleSendMessage();
                  }
                }}
                className="atlas-input min-h-11 resize-none"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="rounded-xl bg-[#3fbe8c] p-3 text-[#111] transition hover:bg-[#62d4a5] disabled:cursor-not-allowed disabled:opacity-50"
                aria-label="Send message"
              >
                <Send className="h-5 w-5" />
              </button>
            </form>
          </div>
        ) : null}

        {activeTab === 'faq' ? (
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-black">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { question: 'How do I reset my password?', answer: 'Use the recovery flow from the login screen and follow the email instructions.' },
                { question: 'How do I join a project?', answer: 'Browse projects, inspect the skill brief, and request access from the project owner.' },
                { question: 'How are skills verified?', answer: 'AgileAtlas combines profile data, repository signals, and collaborator endorsements.' },
              ].map(({ question, answer }) => (
                <details key={question} className="group rounded-2xl bg-[#242424] p-4">
                  <summary className="flex cursor-pointer items-center justify-between gap-4 text-lg font-black">
                    <span>{question}</span>
                    <ChevronDown className="h-5 w-5 text-[#999] transition group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm font-semibold leading-relaxed text-[#aaa]">{answer}</p>
                </details>
              ))}
            </div>
          </div>
        ) : null}

        {activeTab === 'tickets' ? (
          <div className="p-6">
            <h2 className="mb-6 text-2xl font-black">Your Support Tickets</h2>
            <div className="space-y-4">
              {[
                { id: 1, subject: 'Issue logging in', status: 'Open', updated: '2 hours ago' },
                { id: 2, subject: 'Project sync error', status: 'Closed', updated: '3 days ago' },
              ].map(({ id, subject, status, updated }) => (
                <div key={id} className="flex items-center justify-between gap-4 rounded-2xl bg-[#242424] p-4">
                  <div>
                    <h3 className="font-black">{subject}</h3>
                    <p className="mt-1 text-sm font-semibold text-[#999]">Last updated {updated}</p>
                  </div>
                  <span className={`rounded-full px-3 py-1 text-xs font-black ${status === 'Open' ? 'bg-[#173d2d] text-[#67dba9]' : 'bg-[#3a3a3a] text-[#bbb]'}`}>
                    {status}
                  </span>
                </div>
              ))}
            </div>
            <AtlasButton className="mt-7" showIcon={false}>
              Create New Ticket
            </AtlasButton>
          </div>
        ) : null}
      </AtlasCard>
    </PageFrame>
  );
}
