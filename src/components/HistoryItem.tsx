import './HistoryItem.scss';
import type { ApiRequest } from '../types/ApiRequest';
import { truncateUrl } from '../utils/helpers';


interface HistoryItemProps {
  request: ApiRequest;
  onClick: () => void;
  isActive: boolean;
}

function HistoryItem({ request, onClick, isActive }: HistoryItemProps) {
  return (
    <div
      className={`history-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
    >
      <div className="history-item-header">
        <span className={`history-status ${request.status}`}>
          {request.status === 'success' ? '✓' : '✗'}
        </span>
        <span className="history-url">{truncateUrl(request.url, 35)}</span>
      </div>
      <div className="history-timestamp">{request.timestamp}</div>
    </div>
  );
}

export default HistoryItem;