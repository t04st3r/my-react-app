import './HistoryPanel.scss';
import type { ApiRequest } from '../types/ApiRequest';
import HistoryItem from './HistoryItem';

interface HistoryPanelProps {
  history: ApiRequest[];
  currentRequestId: number | null;
  onSelectRequest: (request: ApiRequest) => void;
  onClearHistory: () => void;
}

function HistoryPanel({ history, currentRequestId, onSelectRequest, onClearHistory }: HistoryPanelProps) {
  if (history.length === 0) {
    return (
      <div className="history-panel">
        <h2>Request History</h2>
        <p className="empty-history">No requests yet</p>
      </div>
    );
  }

  return (
    <div className="history-panel">
      <div className="history-header">
        <h2>Request History ({history.length})</h2>
        <button onClick={onClearHistory} className="clear-button">
          Clear
        </button>
      </div>
      <div className="history-list">
        {history.map((request) => (
          <HistoryItem
            key={request.id}
            request={request}
            onClick={() => onSelectRequest(request)}
            isActive={request.id === currentRequestId}
          />
        ))}
      </div>
    </div>
  );
}

export default HistoryPanel;