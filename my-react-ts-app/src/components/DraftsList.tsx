import type { EmailDraft } from '../types/email';
import DraftCard from './DraftCard';

interface DraftsListProps {
  drafts: EmailDraft[];
}

export default function DraftsList({ drafts }: DraftsListProps) {
  if (drafts.length === 0) {
    return null;
  }

  return (
    <div className="space-y-4">
      {drafts.map((draft, index) => (
        <DraftCard key={index} draft={draft} index={index} />
      ))}
    </div>
  );
}
