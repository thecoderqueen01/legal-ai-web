"use client";

import { Upload } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { useState } from "react";

interface AnalysisData {
  summary: string;
  key_risks: string[];
  important_obligations: string[];
  important_clauses: string[];
  termination_conditions: string[];
}

export default function UploadBox() {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [analysis, setAnalysis] = useState<AnalysisData | null>(null);
  const [error, setError] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setError("");
    }
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
    },
    multiple: false,
  });

  const handleAnalyze = async () => {

    if (!file) return;

    setLoading(true);
    setError("");
    setAnalysis(null);

    try {

      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(
        "https://legal-ai-backend-1-bbmp.onrender.com/analyze",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.success) {
        setAnalysis(data.analysis);
      } else {
        setError(data.error);
      }

    } catch (err) {

      setError("Something went wrong.");

    } finally {

      setLoading(false);

    }
  };

  return (
    <div className="space-y-8">

      {/* Upload Card */}
      <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">

        <div
          {...getRootProps()}
          className="border-2 border-dashed border-gray-300 rounded-xl p-10 text-center cursor-pointer hover:border-blue-500 transition"
        >
          <input {...getInputProps()} />

          <Upload
            className="mx-auto mb-4 text-gray-500"
            size={40}
          />

          <h2 className="text-xl font-semibold text-gray-800">
            Upload Legal Document
          </h2>

          <p className="text-gray-500 mt-2">
            Drag & drop your PDF here, or click to browse
          </p>

          <p className="text-sm text-gray-400 mt-3">
            PDF only • Max 10MB
          </p>

          {file && (
            <div className="mt-6 text-sm text-blue-600 font-medium">
              Selected File: {file.name}
            </div>
          )}
        </div>

        <button
          onClick={handleAnalyze}
          disabled={!file || loading}
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-3 rounded-xl font-medium transition"
        >
          {loading ? "Analyzing..." : "Analyze Document"}
        </button>

        {error && (
          <div className="mt-4 text-red-500 text-sm">
            {error}
          </div>
        )}
      </div>

      {/* Analysis Results */}
      {analysis && (

        <div className="space-y-6">

          {/* Summary */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Summary
            </h3>

            <p className="text-gray-700 leading-7">
              {analysis.summary}
            </p>
          </div>

          {/* Key Risks */}
          <div className="bg-white border border-red-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-red-600 mb-4">
              Key Risks
            </h3>

            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              {analysis.key_risks.map((risk, index) => (
                <li key={index}>{risk}</li>
              ))}
            </ul>
          </div>

          {/* Obligations */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Important Obligations
            </h3>

            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              {analysis.important_obligations.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Clauses */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Important Clauses
            </h3>

            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              {analysis.important_clauses.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

          {/* Termination */}
          <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">
              Termination Conditions
            </h3>

            <ul className="list-disc pl-5 space-y-3 text-gray-700">
              {analysis.termination_conditions.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>

        </div>
      )}
    </div>
  );
}