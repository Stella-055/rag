import { motion } from "motion/react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Badge } from "./ui/badge";
import { History, Eye, MessageSquare } from "lucide-react";

interface RelationshipMemoryProps {
  isReturning: boolean;
  previousObjections: string[];
  recentProducts: string[];
  engagementScore: number;
}

export function RelationshipMemory({
  isReturning,
  previousObjections,
  recentProducts,
  engagementScore,
}: RelationshipMemoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.3 }}
    >
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-base">
            <History className="w-5 h-5 text-purple-500" />
            Relationship Memory
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {isReturning && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Customer Type</span>
              <Badge className="bg-purple-500/20 text-purple-700 dark:text-purple-300 border-purple-500/30">
                Returning Customer
              </Badge>
            </div>
          )}

          {previousObjections.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <MessageSquare className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Previous Objections</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {previousObjections.map((obj, i) => (
                  <Badge key={i} variant="outline" className="text-xs">
                    {obj}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {recentProducts.length > 0 && (
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium">Recently Viewed</span>
              </div>
              <div className="space-y-1">
                {recentProducts.map((product, i) => (
                  <div key={i} className="text-sm text-muted-foreground">
                    • {product}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Engagement Score</span>
              <span className="text-sm font-bold text-purple-600 dark:text-purple-400">
                {engagementScore}/10
              </span>
            </div>
            <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(engagementScore / 10) * 100}%` }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-full bg-gradient-to-r from-purple-500 to-pink-500"
              />
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
