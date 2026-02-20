import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Lightbulb, ArrowRight } from "lucide-react";

interface StrategicRecommendationProps {
  action: string;
  reasoning: string;
  outcome: string;
}

export function StrategicRecommendation({ action, reasoning, outcome }: StrategicRecommendationProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20, scale: 0.95 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="border-amber-500/30 bg-gradient-to-br from-amber-500/10 to-orange-500/10 shadow-lg shadow-amber-500/20">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Lightbulb className="w-5 h-5 text-amber-500" />
            </motion.div>
            Strategic Recommendation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div>
            <h4 className="font-semibold text-lg text-amber-700 dark:text-amber-400 mb-1">
              {action}
            </h4>
          </div>

          <div className="space-y-2">
            <div>
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                Why
              </span>
              <p className="text-sm mt-1">{reasoning}</p>
            </div>

            <div className="flex items-start gap-2 pt-2 border-t border-amber-500/20">
              <ArrowRight className="w-4 h-4 text-emerald-500 mt-0.5 flex-shrink-0" />
              <div>
                <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400 uppercase tracking-wider">
                  Expected Impact
                </span>
                <p className="text-sm mt-1 text-emerald-700 dark:text-emerald-300">
                  {outcome}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
