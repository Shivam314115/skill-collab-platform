import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { mockUsers, mockMessages } from '../../api/mockData';

export default function ChatPage() {
    const [activeChat, setActiveChat] = useState(2); // Default to chat with Bob
    const { user } = useAuth();
    const contacts = mockUsers.filter(u => u.id !== user.id);
    const messages = mockMessages[activeChat] || [];
    const activeContact = mockUsers.find(u => u.id === activeChat);

    return (
        <div className="p-8 h-full">
            <div className="h-full flex bg-[#212121] rounded-lg border border-zinc-700 overflow-hidden">
                {/* Contact List */}
                <div className="w-1/3 border-r border-zinc-700 flex flex-col">
                    <div className="p-4 border-b border-zinc-700">
                        <h2 className="font-bold text-xl text-white">Messages</h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {contacts.map(contact => (
                            <div key={contact.id} onClick={() => setActiveChat(contact.id)} className={`flex items-center gap-4 p-4 cursor-pointer border-l-4 ${activeChat === contact.id ? 'bg-zinc-700 border-green-500' : 'border-transparent hover:bg-zinc-800'}`}>
                                <div className="w-12 h-12 rounded-full bg-zinc-600 flex-shrink-0 flex items-center justify-center text-white font-bold text-xl">{contact.avatar}</div>
                                <div className="flex-1 overflow-hidden">
                                    <h3 className="font-semibold text-white truncate">{contact.name}</h3>
                                    <p className="text-sm text-gray-400 truncate">{mockMessages[contact.id]?.slice(-1)[0]?.text || "No messages yet"}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                
                {/* Conversation Area */}
                <div className="w-2/3 flex flex-col">
                    {activeChat && activeContact ? (
                        <>
                            <div className="p-4 border-b border-zinc-700 flex items-center gap-4">
                                <div className="w-10 h-10 rounded-full bg-zinc-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{activeContact.avatar}</div>
                                <h3 className="font-bold text-white">{activeContact.name}</h3>
                            </div>
                            <div className="flex-1 p-6 overflow-y-auto space-y-4">
                                {messages.map(msg => (
                                    <div key={msg.id} className={`flex items-end gap-3 ${msg.sender === user.id ? 'justify-end' : 'justify-start'}`}>
                                        {msg.sender !== user.id && <div className="w-8 h-8 rounded-full bg-zinc-600 flex-shrink-0 flex items-center justify-center text-white font-bold">{mockUsers.find(u=>u.id===msg.sender)?.avatar}</div>}
                                        <div className={`max-w-xs lg:max-w-md p-3 rounded-2xl ${msg.sender === user.id ? 'bg-[#36B083] text-black font-medium rounded-br-lg' : 'bg-zinc-700 text-white rounded-bl-lg'}`}>
                                            <p>{msg.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="p-4 border-t border-zinc-700">
                                <input type="text" placeholder="Type a message..." className="w-full bg-[#2C2C2C] text-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-[#36B083]" />
                            </div>
                        </>
                    ) : <div className="flex-1 flex items-center justify-center text-gray-500">Select a conversation to start chatting</div>}
                </div>
            </div>
        </div>
    );
}