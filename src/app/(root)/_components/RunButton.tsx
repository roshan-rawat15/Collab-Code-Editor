"use client";

import { getExecutionResult, useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useUser } from "@clerk/nextjs";
import { useMutation } from "convex/react";
import { motion } from "framer-motion";
import { Loader2, Play } from "lucide-react";
import { api } from "../../../../convex/_generated/api";
import { useState } from "react"; // Added for error state

function RunButton() {
  const { user } = useUser();
  const { runCode, language, isRunning } = useCodeEditorStore();
  const saveExecution = useMutation(api.codeExecutions.saveExecution);
  const [error, setError] = useState<string | null>(null); // Track execution errors

  const handleRun = async () => {
    setError(null); // Reset error state

    try {
      await runCode(); // Ensure the code runs first
      const result = getExecutionResult(); // Get the execution result after it finishes

      if (!user) {
        setError("You must be logged in to save executions.");
        return;
      }

      if (!result || !result.code) {
        setError("No execution result found.");
        return;
      }

      await saveExecution({
        language,
        code: result.code,
        output: result.output || undefined,
        error: result.error || undefined,
      });

    } catch (err) {
      if (err instanceof Error && err.message.includes("Pro subscription required")) {
        setError("This language requires a Pro subscription.");
      } else {
        setError("An error occurred while saving the execution.");
      }
      console.error(err);
    }
  };

  return (
    <motion.button
      onClick={handleRun}
      disabled={isRunning}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group relative flex items-center gap-2 px-3 py-1.5 sm:px-5 sm:py-2.5 rounded-lg 
                 bg-gradient-to-r from-blue-600 to-blue-500 text-white text-xs sm:text-sm font-medium 
                 transition-all duration-300 hover:opacity-90 disabled:cursor-not-allowed"
    >
      {isRunning ? (
        <>
          <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin text-white/80" />
          <span className="text-[10px] sm:text-sm">Executing...</span>
        </>
      ) : (
        <>
          <Play className="w-4 h-4 sm:w-5 sm:h-5 transition-transform group-hover:scale-110" />
          <span className="text-[10px] sm:text-sm">Run Code</span>
        </>
      )}
      {error && (
        <span className="absolute left-1/2 transform -translate-x-1/2 mt-1 sm:mt-2 text-[10px] sm:text-xs text-red-500 text-center w-full">
          {error}
        </span>
      )}
    </motion.button>
  );
}

export default RunButton;
