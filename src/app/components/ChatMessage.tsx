import { motion } from "motion/react";
import { Bot, User } from "lucide-react";
import { Avatar, AvatarFallback } from "./ui/avatar";



export function ChatMessage() {
  return (
    <div className="w-full h-[500px] overflow-y-auto max-w-[400px] mx-auto border rounded-lg  shadow-lg">
      <iframe
        src="https://interfaces.zapier.com/embed/chatbot/cmlu1bnqu008zapztz047cgwg"
        height="100%"
        width="100%"
        allow="clipboard-write *"
        style={{ border: "none "  }}
        title="Zapier Chatbot"
      />
    </div>
  );
}