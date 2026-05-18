export default function Header() {
  return (
    <header className="text-center mb-10">
      <h1 className="text-4xl md:text-5xl font-bold text-gray-900">
        Legal AI Assistance
      </h1>

      <p className="mt-4 text-gray-600 text-lg max-w-2xl mx-auto">
        Upload legal documents and receive AI-powered summaries,
        risk analysis, and important clause insights.
      </p>

      <p className="mt-4 text-sm text-gray-500 max-w-xl mx-auto">
        AI-generated legal analysis may contain inaccuracies and
        should not substitute professional legal advice.
      </p>
    </header>
  );
}