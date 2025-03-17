"use client";

import { useState, useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { atomOneDark } from "react-syntax-highlighter/dist/esm/styles/hljs";
import CopyButton from "./CopyButton";

const CodeBlock = ({ language, code }: { language: string; code: string }) => {
  const trimmedCode = code
    .split("\n")
    .map((line) => line.trimEnd())
    .join("\n");

  const safeLanguage = language && typeof language === "string" ? language.toLowerCase() : "plaintext";

  // State to manage image source, ensuring it only changes on the client
  const [imgSrc, setImgSrc] = useState(`/${safeLanguage}.png`);

  // Handle image fallback on the client only
  useEffect(() => {
    setImgSrc(`/${safeLanguage}.png`); // Reset src when language changes
  }, [safeLanguage]);

  return (
    <div className="my-4 bg-[#0a0a0f] rounded-lg overflow-hidden border border-[#ffffff0a]">
      <div className="flex items-center justify-between px-4 py-2 bg-[#ffffff08]">
        <div className="flex items-center gap-2">
          <img
            src={imgSrc}
            alt={safeLanguage}
            className="size-4 object-contain"
            onError={(e) => {
              e.currentTarget.src = "/plaintext.png"; // Fallback on client
            }}
          />
          <span className="text-sm text-gray-400">{safeLanguage}</span>
        </div>
        <CopyButton code={trimmedCode} />
      </div>
      <div className="relative">
        <SyntaxHighlighter
          language={safeLanguage}
          style={atomOneDark}
          customStyle={{
            padding: "1rem",
            background: "transparent",
            margin: 0,
          }}
          showLineNumbers={true}
          wrapLines={true}
        >
          {trimmedCode}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default CodeBlock;