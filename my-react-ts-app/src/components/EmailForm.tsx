import { Mail, Loader2, RefreshCw } from 'lucide-react';
import type { ToneType } from '../types/email';
import { TONES } from '../constants/tones';

interface EmailFormProps {
  description: string;
  tone: ToneType;
  loading: boolean;
  error: string;
  onDescriptionChange: (description: string) => void;
  onToneChange: (tone: ToneType) => void;
  onSubmit: () => void;
}

export default function EmailForm({
  description,
  tone,
  loading,
  error,
  onDescriptionChange,
  onToneChange,
  onSubmit
}: EmailFormProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-8 mb-6">
      <div className="flex items-center gap-3 mb-6">
        <Mail className="w-8 h-8 text-indigo-600" />
        <h1 className="text-3xl font-bold text-gray-800">Email Draft Generator</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email-description" className="block text-sm font-medium text-gray-700 mb-2">
            What's your email about?
          </label>
          <textarea
            id="email-description"
            value={description}
            onChange={(e) => onDescriptionChange(e.target.value)}
            placeholder="Example: Need to decline a meeting invitation politely because of a scheduling conflict..."
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Tone
          </label>
          <div className="flex gap-3" role="group" aria-label="Select tone">
            {TONES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onToneChange(t)}
                aria-label={`${t.charAt(0).toUpperCase() + t.slice(1)} tone`}
                aria-pressed={tone === t}
                className={`px-6 py-2 rounded-lg font-medium transition-all ${
                  tone === t
                    ? 'bg-indigo-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div role="alert" className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Generating drafts...
            </>
          ) : (
            <>
              <RefreshCw className="w-5 h-5" />
              Generate Drafts
            </>
          )}
        </button>
      </form>
    </div>
  );
}
