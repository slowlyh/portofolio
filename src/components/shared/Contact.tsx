'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Github, Instagram, Send, X, Minus, Square } from 'lucide-react';
import { portfolioData } from '@/lib/data';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsTyping(true);
    
    // Simulate terminal output
    const outputs = [
      '$ Sending message...',
      '✓ Validating input data...',
      '✓ Connecting to server...',
      '✓ Message sent successfully!',
      '',
      `Message details:`,
      `  From: ${formData.name} (${formData.email})`,
      `  Message: ${formData.message.substring(0, 50)}${formData.message.length > 50 ? '...' : ''}`,
      '',
      '$ Ready for next command...'
    ];

    for (let i = 0; i < outputs.length; i++) {
      setTimeout(() => {
        setTerminalOutput(prev => [...prev, outputs[i]]);
        if (i === outputs.length - 1) {
          setIsTyping(false);
        }
      }, i * 300);
    }

    // Reset form after delay
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setTerminalOutput([]);
    }, outputs.length * 300 + 2000);
  };

  return (
    <section id="contact" className="min-h-screen bg-zinc-950 text-zinc-100 py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Get In Touch
          </h2>
          <p className="text-zinc-400 text-lg">Feel free to reach out for collaborations or just a friendly hello</p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Contact Info</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <Mail className="w-5 h-5 text-indigo-400" />
                  <a href={`mailto:${portfolioData.contact.email}`} className="text-zinc-300 hover:text-indigo-400 transition-colors">
                    {portfolioData.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-indigo-400" />
                  <span className="text-zinc-300">{portfolioData.contact.location}</span>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Social Media</h3>
              <div className="space-y-3">
                <a 
                  href={`https://github.com/${portfolioData.contact.github.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-indigo-400 transition-colors"
                >
                  <Github className="w-5 h-5" />
                  <span>{portfolioData.contact.github}</span>
                </a>
                <a 
                  href={`https://t.me/${portfolioData.contact.telegram.replace('@', '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-zinc-300 hover:text-indigo-400 transition-colors"
                >
                  <Send className="w-5 h-5" />
                  <span>{portfolioData.contact.telegram}</span>
                </a>
              </div>
            </div>

            <div className="bg-zinc-900/50 backdrop-blur-sm rounded-lg p-6 border border-zinc-800">
              <h3 className="text-xl font-semibold mb-4 text-indigo-400">Quick Stats</h3>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-indigo-400">2+</div>
                  <div className="text-sm text-zinc-400">Years</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-400">10+</div>
                  <div className="text-sm text-zinc-400">Projects</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-indigo-400">15+</div>
                  <div className="text-sm text-zinc-400">Tech</div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* VS Code Style Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-zinc-900 rounded-lg overflow-hidden border border-zinc-800">
              {/* VS Code Title Bar */}
              <div className="bg-zinc-800 px-4 py-2 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex gap-1">
                    <button className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors" />
                    <button className="w-3 h-3 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors" />
                    <button className="w-3 h-3 rounded-full bg-green-500 hover:bg-green-600 transition-colors" />
                  </div>
                  <span className="text-zinc-400 text-sm ml-2">contact.tsx</span>
                </div>
                <div className="flex items-center gap-2">
                  <Minus className="w-4 h-4 text-zinc-400" />
                  <Square className="w-4 h-4 text-zinc-400" />
                  <X className="w-4 h-4 text-zinc-400" />
                </div>
              </div>

              {/* Editor Content */}
              <div className="p-4 font-mono text-sm">
                <div className="text-zinc-500">
                  <span className="text-purple-400">import</span>
                  <span className="text-green-400"> React</span>
                  <span className="text-purple-400"> from</span>
                  <span className="text-green-400"> 'react'</span>;
                </div>
                <div className="text-zinc-500">
                  <span className="text-purple-400">import</span>
                  <span className="text-green-400"> {'{'} Mail, MapPin {'}'}</span>
                  <span className="text-purple-400"> from</span>
                  <span className="text-green-400"> 'lucide-react'</span>;
                </div>
                <br />
                <div className="text-zinc-500">
                  <span className="text-purple-400">const</span>
                  <span className="text-blue-400"> ContactForm</span>
                  <span className="text-purple-400"> =</span>
                  <span className="text-purple-400"> ()</span>
                  <span className="text-purple-400"> {'=>'}</span>
                  <span className="text-purple-400"> {'{'}</span>
                </div>
                <div className="ml-4">
                  <div className="text-zinc-500">
                    <span className="text-purple-400">const</span>
                    <span className="text-blue-400"> [formData, setFormData]</span>
                    <span className="text-purple-400"> =</span>
                    <span className="text-purple-400"> useState</span>
                    <span className="text-purple-400">({'{'}</span>
                  </div>
                  <div className="ml-4">
                    <div className="text-zinc-500">
                      <span className="text-orange-400">name</span>
                      <span className="text-zinc-400">: </span>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-zinc-100 w-48 outline-none focus:border-indigo-500"
                        placeholder="Your name"
                      />
                    </div>
                    <div className="text-zinc-500 mt-2">
                      <span className="text-orange-400">email</span>
                      <span className="text-zinc-400">: </span>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-zinc-100 w-48 outline-none focus:border-indigo-500"
                        placeholder="your@email.com"
                      />
                    </div>
                    <div className="text-zinc-500 mt-2">
                      <span className="text-orange-400">message</span>
                      <span className="text-zinc-400">: </span>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleInputChange}
                        className="bg-zinc-800 border border-zinc-700 rounded px-2 py-1 text-zinc-100 w-64 h-20 outline-none focus:border-indigo-500 resize-none"
                        placeholder="Your message..."
                      />
                    </div>
                  </div>
                  <div className="text-zinc-500">
                    <span className="text-purple-400">{'}'})</span>;
                  </div>
                </div>
                <br />
                <div className="ml-4">
                  <button
                    onClick={handleSubmit}
                    className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded flex items-center gap-2 transition-colors"
                  >
                    <Send className="w-4 h-4" />
                    Send Message
                  </button>
                </div>
                <div className="text-purple-400">{'}'}</div>
              </div>

              {/* Terminal Output */}
              {terminalOutput.length > 0 && (
                <div className="border-t border-zinc-800 bg-black p-4 font-mono text-sm">
                  <div className="text-green-400 mb-2">$ Terminal Output:</div>
                  {terminalOutput.map((line, index) => (
                    <div key={index} className="text-zinc-300">
                      {line}
                    </div>
                  ))}
                  {isTyping && (
                    <div className="inline-block w-2 h-4 bg-green-400 animate-pulse" />
                  )}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}