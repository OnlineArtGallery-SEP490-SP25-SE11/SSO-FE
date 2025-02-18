'use client';
import React, { useState, useEffect, useRef } from 'react';

export default function ChatComponent() {
	const [messages, setMessages] = useState([
		{ id: 1, sender: 'bot', text: 'Hello! How can I help you today?' }
	]);
	const [input, setInput] = useState('');
	const chatEndRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		if (chatEndRef.current) {
			chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
		}
	}, [messages]);

	const sendMessage = () => {
		if (input.trim() === '') return;

		const newMessage = {
			id: messages.length + 1,
			sender: 'user',
			text: input
		};
		setMessages([...messages, newMessage]);
		setInput('');

		// Fake bot response after 1s
		setTimeout(() => {
			setMessages((prev) => [
				...prev,
				{
					id: prev.length + 1,
					sender: 'bot',
					text: 'I received: ' + input
				}
			]);
		}, 1000);
	};

    return (
        <div className="flex flex-col w-full h-[calc(100vh-200px)] mx-auto border rounded-lg shadow-lg bg-white dark:bg-gray-800">
            {/* Chat Header */}
            <div className="p-4 border-b dark:border-gray-700">
                <div className="flex items-center gap-3">
                    <div className="relative h-10 w-10 rounded-full overflow-hidden">
                        <img src="https://res.cloudinary.com/djvlldzih/image/upload/v1739204028/gallery/arts/occjr92oqgbd5gyzljvb.jpg" alt="User" className="object-cover" />
                        <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white dark:border-gray-800 bg-green-500"></span>
                    </div>
                    <div>
                        <h5 className="font-medium text-dark dark:text-white">
                            Thuy Nguyen
                        </h5>
                        <span className="text-xs text-gray-500">Active Now</span>
                    </div>
                </div>
            </div>

			{/* Chat Messages */}
			<div className='flex-1 overflow-y-auto p-4 space-y-4'>
				{messages.map((msg) => (
					<div
						key={msg.id}
						className={`flex ${
							msg.sender === 'user'
								? 'justify-end'
								: 'justify-start'
						}`}
					>
						<div
							className={`p-3 rounded-2xl max-w-[80%] ${
								msg.sender === 'user'
									? 'bg-blue-500 text-white rounded-tr-none'
									: 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded-tl-none'
							}`}
						>
							{msg.text}
						</div>
					</div>
				))}
				<div ref={chatEndRef} />
			</div>

			{/* Chat Input */}
			<div className='p-4 border-t dark:border-gray-700'>
				<div className='flex gap-2'>
					<input
						type='text'
						className='flex-1 p-3 border rounded-full dark:bg-gray-700 dark:text-white dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500'
						value={input}
						onChange={(e) => setInput(e.target.value)}
						onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
						placeholder='Type a message...'
					/>
					<button
						className='px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors'
						onClick={sendMessage}
					>
						Send
					</button>
				</div>
			</div>
		</div>
	);
}
