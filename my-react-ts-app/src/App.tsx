import { useState } from 'react';
import type { EmailDraft, ToneType } from './types/email';
import { generateEmailDrafts } from './services/emailService';
import EmailForm from './components/EmailForm';
import DraftsList from './components/DraftsList';

function DraftSkeleton() {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 animate-pulse">
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-16 bg-gray-200 rounded" />
        <div className="h-8 w-16 bg-gray-200 rounded-lg" />
      </div>
      <div className="space-y-3">
        <div className="h-4 w-24 bg-gray-200 rounded" />
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-4 w-20 bg-gray-200 rounded mt-4" />
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 bg-gray-200 rounded" />
          <div className="h-4 w-5/6 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [description, setDescription] = useState<string>('');
  const [tone, setTone] = useState<ToneType>('professional');
  const [drafts, setDrafts] = useState<EmailDraft[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const handleGenerateDrafts = async (): Promise<void> => {
    if (!description.trim()) {
      setError('Please describe what your email is about.');
      return;
    }

    setLoading(true);
    setError('');
    setDrafts([]);

    try {
      const generatedDrafts = await generateEmailDrafts({ description, tone });
      setDrafts(generatedDrafts);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error generating drafts. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-6">
      <div className="max-w-4xl mx-auto">
        <EmailForm
          description={description}
          tone={tone}
          loading={loading}
          error={error}
          onDescriptionChange={setDescription}
          onToneChange={setTone}
          onSubmit={handleGenerateDrafts}
        />
        {loading ? (
          <div className="space-y-4">
            <DraftSkeleton />
            <DraftSkeleton />
            <DraftSkeleton />
          </div>
        ) : (
          <DraftsList drafts={drafts} />
        )}
      </div>
    </div>
  );
}
