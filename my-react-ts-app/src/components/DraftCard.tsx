import { useState } from 'react';
import { Check, Copy } from 'lucide-react';
import type { EmailDraft } from '../types/email';
import { copyToClipboard } from '../utils/clipboard';

interface DraftCardProps {
  draft: EmailDraft;
  index: number;
}

export default function DraftCard({ draft, index }: DraftCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await copyToClipboard(draft);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // clipboard errors are non-critical; failure is silent to the user
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Draft {index + 1}
        </h3>
        <button
          onClick={handleCopy}
          aria-label={copied ? 'Copied to clipboard' : `Copy draft ${index + 1} to clipboard`}
          className="px-4 py-2 bg-indigo-100 text-indigo-700 rounded-lg hover:bg-indigo-200 transition-colors text-sm font-medium flex items-center gap-2"
        >
          {copied ? (
            <>
              <Check className="w-4 h-4" />
              Copied!
            </>
          ) : (
            <>
              <Copy className="w-4 h-4" />
              Copy
            </>
          )}
        </button>
      </div>

      <div className="space-y-3">
        <div>
          <span className="text-sm font-medium text-gray-500">Subject:</span>
          <p className="text-gray-800 mt-1 font-medium">{draft.subject}</p>
        </div>

        <div>
          <span className="text-sm font-medium text-gray-500">Body:</span>
          <p className="text-gray-800 mt-1 whitespace-pre-line leading-relaxed">
            {draft.body}
          </p>
        </div>
      </div>
    </div>
  );
}
