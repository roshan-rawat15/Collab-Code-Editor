"use client";

import { useCodeEditorStore } from "@/store/useCodeEditorStore";
import { useEffect, useState } from "react";
import { defineMonacoThemes, LANGUAGE_CONFIG } from "../_constants";
import { Editor } from "@monaco-editor/react";
import { motion } from "framer-motion";
import Image from "next/image";
import { RotateCcwIcon, ShareIcon, TypeIcon } from "lucide-react";
import { useClerk } from "@clerk/nextjs";
import { EditorPanelSkeleton } from "./EditorPanelSkeleton";
import ShareSnippetDialog from "./ShareSnippetDialog";
import { useSocket } from "@/hooks/useSocket";
// import type { Monaco } from "@monaco-editor/react";

// Fallback useMounted
const useMounted = () => {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
};

function EditorPanel() {
  const clerk = useClerk();
  const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
  const { language, theme, fontSize, editor, setFontSize, setEditor } =
    useCodeEditorStore();
  const mounted = useMounted();
  const [isRealTime, setIsRealTime] = useState(false);
  const { emitCodeChange, emitCursorMove, isConnected, error } =
    useSocket(isRealTime);

  useEffect(() => {
    const savedCode = localStorage.getItem(`editor-code-${language}`);
    const newCode = savedCode ?? LANGUAGE_CONFIG[language]?.defaultCode ?? "";
    if (editor) editor.setValue(newCode);
  }, [language, editor]);

  useEffect(() => {
    const savedFontSize = localStorage.getItem("editor-font-size");
    if (savedFontSize) setFontSize(parseInt(savedFontSize, 10));
  }, [setFontSize]);

  const handleRefresh = () => {
    const defaultCode = LANGUAGE_CONFIG[language]?.defaultCode ?? "";
    if (editor) editor.setValue(defaultCode);
    localStorage.removeItem(`editor-code-${language}`);
  };

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      localStorage.setItem(`editor-code-${language}`, value);
      emitCodeChange(value);
    }
  };

  const handleFontSizeChange = (newSize: number) => {
    const size = Math.min(Math.max(newSize, 12), 24);
    setFontSize(size);
    localStorage.setItem("editor-font-size", size.toString());
  };

  if (!mounted) return null;

  return (
    <div className="relative">
      <div className="relative bg-[#12121a]/90 backdrop-blur rounded-xl border border-white/[0.05] p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-[#1e1e2e] ring-1 ring-white/5">
              <Image
                src={LANGUAGE_CONFIG[language]?.logoPath ?? "/javascript.png"}
                alt={`${LANGUAGE_CONFIG[language]?.label ?? "Language"} logo`}
                width={24}
                height={24}
              />
            </div>
            <div>
              <h2 className="text-sm font-medium text-white">Code Editor</h2>
              <p className="text-xs text-gray-500">
                Write and execute your code
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsRealTime(!isRealTime)}
                className={`px-4 py-2 rounded-lg transition-all ${
                  isRealTime
                    ? error
                      ? "bg-red-600"
                      : isConnected
                        ? "bg-green-600"
                        : "bg-yellow-600"
                    : "bg-gray-600"
                }`}
                title={error || ""}
              >
                <span className="flex items-center gap-2">
                  {isRealTime ? (
                    <>
                      <div
                        className={`w-2 h-2 rounded-full ${
                          error
                            ? "bg-red-300"
                            : isConnected
                              ? "bg-green-300"
                              : "bg-yellow-300"
                        } animate-pulse`}
                      />
                      {error
                        ? "Connection Error"
                        : isConnected
                          ? "Connected"
                          : "Connecting..."}
                    </>
                  ) : (
                    "Individual Mode"
                  )}
                </span>
              </motion.button>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 bg-[#1e1e2e] rounded-lg ring-1 ring-white/5">
              <TypeIcon className="size-4 text-gray-400" />
              <div className="flex items-center gap-3">
                <input
                  type="range"
                  min="12"
                  max="24"
                  value={fontSize}
                  onChange={(e) =>
                    handleFontSizeChange(parseInt(e.target.value, 10))
                  }
                  className="w-20 h-1 bg-gray-600 rounded-lg cursor-pointer accent-blue-500"
                />
                <span className="text-sm font-medium text-gray-400 min-w-[2rem] text-center">
                  {fontSize}
                </span>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleRefresh}
              className="p-2 bg-[#1e1e2e] hover:bg-[#2a2a3a] rounded-lg ring-1 ring-white/5 transition-colors"
              aria-label="Reset to default code"
            >
              <RotateCcwIcon className="size-4 text-gray-400" />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsShareDialogOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-lg overflow-hidden bg-gradient-to-r
              from-blue-500 to-blue-600 opacity-90 hover:opacity-100 transition-opacity"
            >
              <ShareIcon className="size-4 text-white" />
              <span className="text-sm font-medium text-white">Share</span>
            </motion.button>
          </div>
        </div>
        <div className="relative group rounded-xl overflow-hidden ring-1 ring-white/[0.05]">
          {clerk.loaded ? (
            <Editor
              height="600px"
              language={
                LANGUAGE_CONFIG[language]?.monacoLanguage ?? "javascript"
              }
              value={LANGUAGE_CONFIG[language]?.defaultCode ?? ""}
              onChange={handleEditorChange}
              theme={theme}
              beforeMount={(monaco) => {
                try {
                  defineMonacoThemes(monaco);
                } catch (error) {
                  console.error("Failed to define Monaco themes:", error);
                }
              }}
              onMount={(editor) => {
                setEditor(editor);
                const savedCode = localStorage.getItem(
                  `editor-code-${language}`
                );
                editor.setValue(
                  savedCode ?? LANGUAGE_CONFIG[language]?.defaultCode ?? ""
                );

                // Add cursor position change listener
                editor.onDidChangeCursorPosition((e) => {
                  emitCursorMove({
                    lineNumber: e.position.lineNumber,
                    column: e.position.column,
                  });
                });
              }}
              options={{
                minimap: { enabled: false },
                fontSize: fontSize,
                automaticLayout: true,
                scrollBeyondLastLine: false,
                padding: { top: 16, bottom: 16 },
                renderWhitespace: "selection",
                fontFamily: '"Fira Code", "Cascadia Code", Consolas, monospace',
                fontLigatures: true,
                cursorBlinking: "smooth",
                smoothScrolling: true,
                contextmenu: true,
                renderLineHighlight: "all",
                lineHeight: 1.6,
                letterSpacing: 0.5,
                roundedSelection: true,
                scrollbar: {
                  verticalScrollbarSize: 8,
                  horizontalScrollbarSize: 8,
                },
              }}
            />
          ) : (
            <EditorPanelSkeleton />
          )}
        </div>
      </div>
      {isShareDialogOpen && (
        <ShareSnippetDialog onClose={() => setIsShareDialogOpen(false)} />
      )}
    </div>
  );
}

export default EditorPanel;
