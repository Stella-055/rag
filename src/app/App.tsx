import { useState, useEffect } from "react";
import { Header } from "./components/Header";
import { ConversationZone } from "./components/ConversationZone";
import { LiveAnalysis } from "./components/LiveAnalysis";
import { ConversionGauge } from "./components/ConversionGauge";
import { StrategicRecommendation } from "./components/StrategicRecommendation";
import { BehaviorPatterns } from "./components/BehaviorPatterns";
import { RelationshipMemory } from "./components/RelationshipMemory";
import { InsightNotification } from "./components/InsightNotification";
import { Routes, Route } from "react-router-dom";
import { ChatMessage } from "./components/ChatMessage";
interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AnalysisState {
  intent: string;
  sentiment: number;
  objection: string | null;
  stage: string;
  conversion: number;
  shouldPulse: boolean;
}

interface RecommendationState {
  action: string;
  reasoning: string;
  outcome: string;
}

// AI Intelligence Engine - Analyzes messages and generates insights
const analyzeMessage = (message: string, previousState: AnalysisState): AnalysisState => {
  const lowerMessage = message.toLowerCase();
  
  let intent = previousState.intent;
  let sentiment = previousState.sentiment;
  let objection: string | null = null;
  let stage = previousState.stage;
  let conversion = previousState.conversion;

  // Intent detection
  if (lowerMessage.includes("price") || lowerMessage.includes("cost") || lowerMessage.includes("expensive")) {
    intent = "Pricing Inquiry";
    objection = "Price Concern";
    sentiment = Math.max(sentiment - 15, 30);
    conversion = Math.max(conversion - 10, 25);
  } else if (lowerMessage.includes("recommend") || lowerMessage.includes("suggestion")) {
    intent = "Product Discovery";
    sentiment = Math.min(sentiment + 10, 95);
    conversion = Math.min(conversion + 15, 85);
    stage = "Consideration";
  } else if (lowerMessage.includes("delivery") || lowerMessage.includes("shipping")) {
    intent = "Logistics Query";
    sentiment = Math.min(sentiment + 5, 90);
    conversion = Math.min(conversion + 5, 80);
  } else if (lowerMessage.includes("available") || lowerMessage.includes("stock")) {
    intent = "Availability Check";
    sentiment = Math.min(sentiment + 8, 92);
    conversion = Math.min(conversion + 12, 82);
    stage = "Decision";
  } else if (lowerMessage.includes("buy") || lowerMessage.includes("purchase") || lowerMessage.includes("order")) {
    intent = "Purchase Intent";
    sentiment = Math.min(sentiment + 20, 98);
    conversion = Math.min(conversion + 25, 95);
    stage = "Ready to Buy";
  } else if (lowerMessage.includes("help") || lowerMessage.includes("question")) {
    intent = "Support Request";
    sentiment = Math.min(sentiment + 5, 85);
  } else {
    intent = "General Inquiry";
  }

  return {
    intent,
    sentiment,
    objection,
    stage,
    conversion,
    shouldPulse: true,
  };
};

// Generate strategic recommendations based on conversation state
const generateRecommendation = (analysis: AnalysisState, messageCount: number): RecommendationState => {
  if (analysis.objection === "Price Concern") {
    return {
      action: "Offer Value Comparison & Payment Options",
      reasoning: "Customer expressed price sensitivity. Emphasize ROI and provide flexible payment terms to reduce friction.",
      outcome: "+18% conversion by reframing value proposition",
    };
  }

  if (analysis.stage === "Ready to Buy" && analysis.conversion > 80) {
    return {
      action: "Present Limited-Time Incentive",
      reasoning: "High purchase intent detected. Create urgency with exclusive offer to close the sale now.",
      outcome: "+32% immediate conversion probability",
    };
  }

  if (analysis.stage === "Consideration" && messageCount > 3) {
    return {
      action: "Provide Social Proof & Case Study",
      reasoning: "Customer is evaluating options. Strengthen trust with testimonials and success stories.",
      outcome: "+24% movement to decision stage",
    };
  }

  if (analysis.intent === "Product Discovery") {
    return {
      action: "Deploy Personalized Product Quiz",
      reasoning: "Customer needs guidance. Interactive quiz increases engagement and reveals preferences.",
      outcome: "+40% product match accuracy, +15% conversion",
    };
  }

  if (analysis.sentiment < 50) {
    return {
      action: "Escalate to Human Expert",
      reasoning: "Declining sentiment detected. Personal attention from specialist can recover the opportunity.",
      outcome: "+28% recovery rate for at-risk conversations",
    };
  }

  return {
    action: "Continue Nurturing with Educational Content",
    reasoning: "Customer is engaged but needs more information. Provide targeted resources to build confidence.",
    outcome: "+12% progression to next stage",
  };
};

// Mock AI responses based on user message
const generateAIResponse = (userMessage: string): string => {
  const lowerMessage = userMessage.toLowerCase();

  if (lowerMessage.includes("price") || lowerMessage.includes("cost")) {
    return "Our premium plan starts at $199/month, but I'd love to understand your specific needs first. What's most important to you: features, scalability, or ROI? We also offer flexible payment options including quarterly billing with a 15% discount.";
  }

  if (lowerMessage.includes("recommend") || lowerMessage.includes("suggestion")) {
    return "Based on typical use cases, I'd recommend our Growth Suite. It includes AI-powered analytics, automated workflows, and priority support. Over 2,000 companies saw 40% revenue increase in their first quarter. Would you like to see how it compares to your current solution?";
  }

  if (lowerMessage.includes("delivery") || lowerMessage.includes("shipping")) {
    return "Great question! Since this is a cloud-based platform, you'll get instant access once you sign up. Our onboarding team can have you fully operational within 24 hours, and we provide white-glove migration support at no extra cost.";
  }

  if (lowerMessage.includes("available") || lowerMessage.includes("stock")) {
    return "Yes, we have immediate availability! All our plans are ready to deploy. We're currently running a special offer for new customers - 20% off your first 3 months plus free implementation support. Would you like me to reserve a spot for you?";
  }

  return "I'm here to help you find the perfect solution! Our platform is designed to transform customer conversations into actionable business intelligence. What specific challenges are you looking to solve?";
};

export default function App() {
  const [isDark, setIsDark] = useState(true);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Hello! I'm your AI-powered customer assistant. I can help you explore our solutions, answer questions, and find the perfect fit for your needs. What brings you here today?",
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisState>({
    intent: "Initial Contact",
    sentiment: 65,
    objection: null,
    stage: "Awareness",
    conversion: 35,
    shouldPulse: false,
  });
  const [recommendation, setRecommendation] = useState<RecommendationState>({
    action: "Establish Rapport & Understand Needs",
    reasoning: "First interaction with customer. Focus on building trust and identifying pain points.",
    outcome: "+35% engagement when rapport is established early",
  });
  const [notificationMessage, setNotificationMessage] = useState("");
  const [showNotification, setShowNotification] = useState(false);

  // Behavior tracking data
  const [objectionData, setObjectionData] = useState([
    { name: "Price", count: 2 },
    { name: "Features", count: 1 },
    { name: "Timeline", count: 1 },
    { name: "Support", count: 0 },
  ]);

  const [sentimentData, setSentimentData] = useState([
    { time: "Start", value: 65 },
  ]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const handleSendMessage = (userMessage: string) => {
    // Add user message
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);

    // Show typing indicator
    setIsTyping(true);

    // Analyze message and update intelligence
    setTimeout(() => {
      const newAnalysis = analyzeMessage(userMessage, analysis);
      setAnalysis(newAnalysis);

      // Update behavior patterns
      if (newAnalysis.objection === "Price Concern") {
        setObjectionData(prev =>
          prev.map(item =>
            item.name === "Price" ? { ...item, count: item.count + 1 } : item
          )
        );
      }

      setSentimentData(prev => [
        ...prev,
        { time: `Msg ${newMessages.length}`, value: newAnalysis.sentiment },
      ]);

      // Generate new recommendation
      const newRecommendation = generateRecommendation(newAnalysis, newMessages.length);
      setRecommendation(newRecommendation);

      // Show insight notification
      setNotificationMessage(`AI detected: ${newAnalysis.intent} - Updating strategy...`);
      setShowNotification(true);
      setTimeout(() => setShowNotification(false), 4000);

      // Reset pulse
      setTimeout(() => {
        setAnalysis(prev => ({ ...prev, shouldPulse: false }));
      }, 600);
    }, 500);

    // Generate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(userMessage);
      setMessages([...newMessages, { role: "assistant", content: aiResponse }]);
      setIsTyping(false);
    }, 2000);
  };

  return (<>
    <Routes>
        <Route path="/chat" element={<ChatMessage />} />
       
      </Routes>
    <div className=" bg-background">
      <Header isDark={isDark} onToggleTheme={() => setIsDark(!isDark)} />

      <InsightNotification
        message={notificationMessage}
        isVisible={showNotification}
        onClose={() => setShowNotification(false)}
      />

      <main className="container mx-auto p-6">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 ">
          {/* Conversation Zone - 40% */}
          <div className="lg:col-span-2 h-full min-h-[500px] lg:min-h-0">
            <ConversationZone
              messages={messages}
              onSendMessage={handleSendMessage}
              isTyping={isTyping}
            />
          </div>

          {/* Intelligence Zone - 60% */}
          <div className="lg:col-span-3 space-y-4 overflow-y-auto max-h-[700px] pb-6">
            <LiveAnalysis
              intent={analysis.intent}
              sentiment={analysis.sentiment}
              objection={analysis.objection}
              stage={analysis.stage}
              shouldPulse={analysis.shouldPulse}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-center bg-card border rounded-lg p-6">
                <ConversionGauge value={analysis.conversion} />
              </div>
              <div className="flex flex-col justify-center">
                <StrategicRecommendation
                  action={recommendation.action}
                  reasoning={recommendation.reasoning}
                  outcome={recommendation.outcome}
                />
              </div>
            </div>

            <BehaviorPatterns
              objectionData={objectionData}
              sentimentData={sentimentData}
            />

            <RelationshipMemory
              isReturning={messages.length > 5}
              previousObjections={objectionData.filter(d => d.count > 0).map(d => d.name)}
              recentProducts={["AI Growth Suite", "Analytics Dashboard", "Automation Platform"]}
              engagementScore={Math.min(Math.floor(messages.length * 0.8), 10)}
            />
          </div>
        </div>
      </main>
    </div></>
  );
}