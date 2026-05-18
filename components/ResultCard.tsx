export default function ResultCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm mt-8">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">
        AI Analysis
      </h2>

      <div className="space-y-6">
        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Summary
          </h3>

          <p className="text-gray-600">
            The uploaded agreement outlines contractual obligations,
            payment terms, and termination conditions between parties.
          </p>
        </div>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">
            Key Risks
          </h3>

          <ul className="list-disc pl-5 text-gray-600 space-y-2">
            <li>Automatic renewal clause detected.</li>
            <li>Late payment penalties may apply.</li>
            <li>Limited termination flexibility.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}