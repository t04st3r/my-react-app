import './ResponseDisplay.scss';
import { formatResponse } from '../utils/helpers';

interface ResponseDisplayProps {
  response: string;
  status: 'idle' | 'loading' | 'success' | 'error';
}

function ResponseDisplay({ response, status }: ResponseDisplayProps) {
  const formattedResponse = formatResponse(response, status);

  return (
    <div className="response-container">
      <div className={`status-bar status-${status}`}>
        Status: {status.toUpperCase()}
      </div>
      <div className="response-box">
        <pre>{formattedResponse}</pre>
      </div>
    </div>
  );
}

export default ResponseDisplay;