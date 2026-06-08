"use client";

import React, { useState, useRef, useEffect } from "react";
import { useDocuments } from "@/context/DocumentContext";
import { Send, FileText, Bot, User, CheckSquare, Square, Info } from "lucide-react";

interface Message {
  id: string;
  sender: "user" | "assistant";
  text: string;
  timestamp: string;
}

export default function ChatPage() {
  const { documents, addActivity } = useDocuments();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "m1",
      sender: "assistant",
      text: "Hello! I am your Atlas AI Assistant. Ask me anything about your uploaded documents, and I'll retrieve the relevant sections for you.",
      timestamp: "Just now",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [selectedDocs, setSelectedDocs] = useState<Record<string, boolean>>({});

  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Select all documents by default on load
    const initialSelection: Record<string, boolean> = {};
    documents.forEach((doc) => {
      initialSelection[doc.id] = true;
    });
    setSelectedDocs(initialSelection);
  }, [documents]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const toggleDocSelection = (id: string) => {
    setSelectedDocs((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const getContextualResponse = (query: string): string => {
    const activeDocNames = documents
      .filter((d) => selectedDocs[d.id])
      .map((d) => d.name);

    if (activeDocNames.length === 0) {
      return "It looks like you haven't selected any source documents for this search. Please check at least one document in the sidebar to enable search capabilities.";
    }

    const lowerQuery = query.toLowerCase();

    // Check if they ask about HR/leave
    const hasHR = activeDocNames.some((name) => name.toLowerCase().includes("hr") || name.toLowerCase().includes("policy"));
    if (lowerQuery.includes("leave") || lowerQuery.includes("vacation") || lowerQuery.includes("hr") || lowerQuery.includes("holiday")) {
      if (hasHR) {
        return `According to **HR Policy.pdf** (Section 4: Benefits & Time Off):
- Employees are eligible for **25 days of paid annual leave** per calendar year.
- Leave requests must be submitted through the portal at least **2 weeks in advance**.
- Unused leave up to **5 days** can be rolled over to the next year, expiring on March 31st.

Would you like me to extract the policy on sick leave or parental leave as well?`;
      }
    }

    // Check if they ask about finance/revenue
    const hasFinance = activeDocNames.some((name) => name.toLowerCase().includes("financial") || name.toLowerCase().includes("report"));
    if (lowerQuery.includes("financial") || lowerQuery.includes("revenue") || lowerQuery.includes("earnings") || lowerQuery.includes("money") || lowerQuery.includes("profit") || lowerQuery.includes("quarter")) {
      if (hasFinance) {
        return `Based on the latest **Financial Report.pdf** (Q1 Financial Summary):
- **Total Revenue**: **$12.4M**, representing a **14% Year-over-Year (YoY) increase**.
- **Operating Margin**: **24.5%**, up by 120 basis points compared to last quarter.
- **Key growth driver**: Substantial expansion of the cloud services subscription tier.

Let me know if you need specific breakdowns on expenditures or regional performance charts.`;
      }
    }

    // Generic response referencing active documents
    return `I've analyzed the query: "${query}" across your active sources: **${activeDocNames.join(", ")}**.

From the indexed document vectors, here is what I found:
1. The documents mention several procedural guidelines relevant to your question.
2. Section 2 highlights compliance protocols and standard operating procedures.
3. System parameters are configured for optimal retrieval.

Please let me know if you'd like me to perform a deeper OCR scan on any specific page range!`;
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      sender: "user",
      text: inputValue,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    addActivity(`Asked "${userMsg.text.slice(0, 30)}${userMsg.text.length > 30 ? "..." : ""}"`, "message");

    // Simulate AI response
    setTimeout(() => {
      const replyText = getContextualResponse(userMsg.text);
      const assistantMsg: Message = {
        id: (Date.now() + 1).toString(),
        sender: "assistant",
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, assistantMsg]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <main className="flex-1 flex overflow-hidden text-slate-900">
      {/* Dynamic Sidebar - Document Picker */}
      <div className="w-80 bg-white border-r border-slate-200 p-6 flex flex-col justify-between hidden md:flex">
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-1">Source Documents</h2>
          <p className="text-xs text-gray-500 mb-6">Select which PDFs the AI will search for answers.</p>
          
          {documents.length === 0 ? (
            <div className="border-2 border-dashed border-slate-200 rounded-xl p-6 text-center text-gray-400">
              <FileText size={32} className="mx-auto mb-2 opacity-50" />
              <p className="text-xs">No documents uploaded yet. Upload PDFs to search.</p>
            </div>
          ) : (
            <div className="space-y-2 max-h-[400px] overflow-y-auto pr-1">
              {documents.map((doc) => {
                const isChecked = !!selectedDocs[doc.id];
                return (
                  <div
                    key={doc.id}
                    onClick={() => toggleDocSelection(doc.id)}
                    className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition duration-150 ${
                      isChecked 
                        ? "border-blue-200 bg-blue-50/30" 
                        : "border-slate-200 hover:bg-slate-50"
                    }`}
                  >
                    {isChecked ? (
                      <CheckSquare className="text-blue-600 flex-shrink-0" size={18} />
                    ) : (
                      <Square className="text-gray-400 flex-shrink-0" size={18} />
                    )}
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-semibold text-slate-900 truncate">
                        {doc.name}
                      </p>
                      <p className="text-xs text-gray-500">
                        {doc.collection} • {doc.size}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="bg-slate-50 rounded-xl p-4 border flex gap-3 items-start">
          <Info size={16} className="text-slate-500 mt-0.5 flex-shrink-0" />
          <p className="text-xs text-gray-500 leading-relaxed">
            Atlas uses semantic chunking and dense vectors to query matching page contexts instantly.
          </p>
        </div>
      </div>

      {/* Main Chat Interface */}
      <div className="flex-1 flex flex-col bg-slate-50">
        {/* Header */}
        <div className="bg-white border-b border-slate-200 px-8 py-4 flex items-center gap-3">
          <div className="h-10 w-10 bg-blue-600 text-white rounded-xl flex items-center justify-center font-bold">
            <Bot size={22} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900">Document Knowledge Assistant</h1>
            <p className="text-xs text-green-600 font-semibold flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-green-500 animate-pulse" />
              Retrieval Model Active
            </p>
          </div>
        </div>

        {/* Message Log */}
        <div className="flex-1 overflow-y-auto p-8 space-y-6">
          {messages.map((msg) => {
            const isAI = msg.sender === "assistant";
            return (
              <div
                key={msg.id}
                className={`flex gap-3 max-w-3xl animate-fadeIn ${
                  isAI ? "mr-auto" : "ml-auto flex-row-reverse"
                }`}
              >
                <div
                  className={`h-9 w-9 rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm ${
                    isAI ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"
                  }`}
                >
                  {isAI ? <Bot size={18} /> : <User size={18} />}
                </div>

                <div>
                  <div
                    className={`rounded-2xl p-4 shadow-sm border leading-relaxed text-sm ${
                      isAI
                        ? "bg-white text-slate-900 border-slate-200 rounded-tl-none whitespace-pre-line"
                        : "bg-blue-600 text-white border-blue-500 rounded-tr-none"
                    }`}
                  >
                    {msg.text}
                  </div>
                  <p className={`text-[10px] text-gray-400 mt-1 ${isAI ? "text-left" : "text-right"}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            );
          })}

          {/* Thinking Indicator */}
          {isTyping && (
            <div className="flex gap-3 max-w-xs mr-auto animate-fadeIn">
              <div className="h-9 w-9 bg-blue-600 text-white rounded-xl flex items-center justify-center flex-shrink-0 shadow-sm">
                <Bot size={18} />
              </div>
              <div className="bg-white text-slate-900 border border-slate-200 rounded-2xl rounded-tl-none p-4 flex items-center justify-center gap-1 shadow-sm">
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="h-2 w-2 bg-blue-600 rounded-full animate-bounce" />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="bg-white border-t border-slate-200 p-6">
          <form onSubmit={handleSend} className="relative flex items-center">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask a question about your documents..."
              className="w-full pl-5 pr-14 py-4 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:bg-white focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition duration-150 text-sm placeholder:text-gray-400"
              disabled={isTyping}
            />
            <button
              type="submit"
              disabled={isTyping || !inputValue.trim()}
              className="absolute right-3.5 p-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition disabled:opacity-40 disabled:hover:bg-blue-600 cursor-pointer shadow-md shadow-blue-500/10"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
