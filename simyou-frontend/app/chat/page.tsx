"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle } from "lucide-react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type UserProfile = {
  user_id: string;
  fullName: string;
  age: number;
  bio: string;
  location: string;
  likes: string;
  hobbies: string;
  habits: string;
  knowledge: string;
  email?: string;
};

export default function ChatPage() {
  const { data: session } = useSession();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function fetchProfile() {
      if (!session?.user?.email) return;
      const res = await fetch(
        `http://localhost:8000/profile/${session.user.email}`
      );
      if (!res.ok) return;
      const data: UserProfile = await res.json();
      setUserProfile(data);
    }
    fetchProfile();
  }, [session]);

  useEffect(() => {
    scrollRef.current?.scrollTo({
      top: scrollRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  async function sendMessage() {
    if (!input.trim() || !userProfile) return;

    const userMessage: ChatMessage = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);

    const profilePrompt = `
You are SimYou, a digital doppelgänger of the user. Your task is to respond exactly how the user would, 
reflecting their personality, preferences, and style. Do not invent traits that are not listed.

User Information:
- Full Name: ${userProfile.fullName}
- Age: ${userProfile.age}
- Bio: ${userProfile.bio}
- Location: ${userProfile.location}
- Likes: ${userProfile.likes}
- Hobbies: ${userProfile.hobbies}
- Habits: ${userProfile.habits}
- Knowledge Areas: ${userProfile.knowledge}

When replying:
- Speak as the user would, keeping tone and style consistent with the user's persona.
- Incorporate their interests and knowledge naturally into responses.
- Be friendly, engaging, and true to the user's traits.
- Do not add unrelated information.

Respond only based on the above user profile.
`;

    setInput("");

    const res = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ userPrompt: input, profilePrompt }),
    });

    const data = await res.json();
    const assistantMessage: ChatMessage = {
      role: "assistant",
      content:
        data.choices[0]?.message?.content || "Sorry, I couldn't respond.",
    };

    setMessages((prev) => [...prev, assistantMessage]);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 flex flex-col h-[500px]">
      <h1 className="text-2xl font-Medium mb-4 text-center">
        <div className="flex justify-center items-center gap-2">
          <MessageCircle className="w-6 h-6 text-indigo-600" /> Chat
        </div>
      </h1>

      <Card className="flex-1 mb-4 overflow-hidden">
        <CardContent className="p-0 h-full">
          <ScrollArea
            ref={scrollRef}
            className="h-full p-4 flex flex-col gap-3"
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${
                  msg.role === "user" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`p-3 rounded-2xl max-w-[70%] break-words ${
                    msg.role === "user"
                      ? "bg-indigo-100 text-gray-900 rounded-tr-none"
                      : "bg-gray-100 text-gray-800 rounded-tl-none"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </ScrollArea>
        </CardContent>
      </Card>

      <div className="flex gap-2">
        <Input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Type a message..."
        />
        <Button onClick={sendMessage}>Send</Button>
      </div>
    </div>
  );
}
