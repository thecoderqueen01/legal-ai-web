"use client";

import Header from "@/components/Header";
import UploadBox from "@/components/UploadBox";
import ResultCard from "@/components/ResultCard";

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        <Header />

        <UploadBox />

        <ResultCard />
      </div>
    </main>
  );
}