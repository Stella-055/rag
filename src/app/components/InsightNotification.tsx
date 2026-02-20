import { motion, AnimatePresence } from "motion/react";
import { Sparkles, X } from "lucide-react";
import { Button } from "./ui/button";

interface InsightNotificationProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

export function InsightNotification({ message, isVisible, onClose }: InsightNotificationProps) {
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: -20, x: 20 }}
          animate={{ opacity: 1, y: 0, x: 0 }}
          exit={{ opacity: 0, y: -20, x: 20 }}
          className="fixed top-20 right-6 z-50 max-w-sm"
        >
          <div className="bg-gradient-to-r from-violet-500 to-purple-600 text-white rounded-lg shadow-lg p-4 flex items-start gap-3">
            <Sparkles className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-sm font-medium">{message}</p>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              className="h-6 w-6 text-white hover:bg-white/20 flex-shrink-0"
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
