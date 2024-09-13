"use client";
import React, { useEffect, useState } from "react";
import MarkdownRenderer from "../common/MarkdownRenderer";
import { Spinner } from "@nextui-org/react";

function MarkdownTutorialContainer() {
  const [isLoading, setIsLoading] = useState(true);
  const [markdownTutorial, setMarkdownTutorial] = useState("");
  const getMarkdownTutorial = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        "https://flmlczkwdmnqilqdhmxn.supabase.co/storage/v1/object/public/files/markdown_tutorial.md"
      );
      if (res) {
        const buffer = await res.arrayBuffer();
        const decoder = new TextDecoder("utf-8");
        const content = decoder.decode(buffer);
        setMarkdownTutorial(content);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    getMarkdownTutorial();
  }, []);
  return (
    <div>
      {isLoading ? (
        <div className="py-10 flex flex-col items-center justify-center w-full">
          <Spinner />
        </div>
      ) : (
        <MarkdownRenderer content={markdownTutorial} />
      )}
    </div>
  );
}

export default MarkdownTutorialContainer;
