import { motion } from "motion/react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Progress } from "./ui/progress";
import { Brain, TrendingUp } from "lucide-react";

interface LiveAnalysisProps {
  intent: string;
  sentiment: number;
  objection: string | null;
  stage: string;
  shouldPulse?: boolean;
}

export function LiveAnalysis({ intent, sentiment, objection, stage, shouldPulse = false }: LiveAnalysisProps) {
  const getSentimentColor = (val: number) => {
    if (val >= 70) return "bg-emerald-500";
    if (val >= 40) return "bg-amber-500";
    return "bg-red-500";
  };

  return (
    <motion.div
      animate={shouldPulse ? {
        boxShadow: [
          "0 0 0 0 rgba(139, 92, 246, 0)",
          "0 0 0 8px rgba(139, 92, 246, 0.2)",
          "0 0 0 0 rgba(139, 92, 246, 0)",
        ],
      } : {}}
      transition={{ duration: 0.6 }}
    >
      <Card className="border-violet-500/30 bg-gradient-to-br from-violet-500/5 to-purple-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <Brain className="w-5 h-5 text-violet-500" />
            Live AI Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Intent</span>
              <Badge variant="secondary" className="bg-violet-500/20 text-violet-700 dark:text-violet-300">
                {intent}
              </Badge>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Sentiment</span>
              <span className="text-sm font-medium">{sentiment}%</span>
            </div>
            <div className="relative">
              <Progress value={sentiment} className="h-2" />
              <div
                className={`absolute top-0 left-0 h-2 rounded-full transition-all duration-500 ${getSentimentColor(
                  sentiment
                )}`}
                style={{ width: `${sentiment}%` }}
              />
            </div>
          </div>

          {objection && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Objection Detected</span>
                <Badge variant="destructive" className="bg-red-500/20 text-red-700 dark:text-red-300 border-red-500/30">
                  {objection}
                </Badge>
              </div>
            </motion.div>
          )}

          <div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Customer Stage</span>
              <div className="flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-500" />
                <span className="text-sm font-medium">{stage}</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
