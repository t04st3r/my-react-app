import { useState } from 'react';
import './App.scss';
import ResponseDisplay from './components/ResponseDisplay';
import InputField from './components/InputField';
import HistoryPanel from './components/HistoryPanel';
import type { ApiRequest } from './types/ApiRequest';
import { isValidUrl } from './utils/helpers';

function App() {
  const [url, setUrl] = useState<string>('');
  const [response, setResponse] = useState<string>('No data yet. Enter an API endpoint and click Fetch.');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const [history, setHistory] = useState<ApiRequest[]>([]);
  const [currentRequestId, setCurrentRequestId] = useState<number | null>(null);

  async function handleFetch() {
    if (!url || !isValidUrl(url)) return;

    setStatus('loading');
    setResponse('Fetching data...');

    try {
      const res = await fetch(url);
      const data = await res.json();
      const responseText = JSON.stringify(data, null, 2);

      setResponse(responseText);
      setStatus('success');

      // Add to history (immutability: create new array)
      const newRequest: ApiRequest = {
        id: Date.now(),
        url: url,
        response: responseText,
        status: 'success',
        timestamp: new Date().toLocaleTimeString()
      };

      setHistory([...history, newRequest]);
      setCurrentRequestId(newRequest.id);

    } catch (error) {
      const errorText = `Error: ${error instanceof Error ? error.message : 'Unknown error'}`;
      setResponse(errorText);
      setStatus('error');

      // Add error to history too
      const newRequest: ApiRequest = {
        id: Date.now(),
        url: url,
        response: errorText,
        status: 'error',
        timestamp: new Date().toLocaleTimeString()
      };

      setHistory([...history, newRequest]);
      setCurrentRequestId(newRequest.id);
    }
  }

  function handleSelectRequest(request: ApiRequest) {
    setUrl(request.url);
    setResponse(request.response);
    setStatus(request.status);
    setCurrentRequestId(request.id);
  }

  function handleClearHistory() {
    setHistory([]);
    setCurrentRequestId(null);
    setResponse('History cleared. Enter an API endpoint and click Fetch.');
    setStatus('idle');
  }

  return (
    <div className="app">
      <div className="main-panel">
        <h1>REST API Explorer</h1>
        <InputField
          value={url}
          onChange={setUrl}
          onSubmit={handleFetch}
          disabled={status === 'loading'}
        />
        <ResponseDisplay response={response} status={status} />
      </div>
      <HistoryPanel
        history={history}
        currentRequestId={currentRequestId}
        onSelectRequest={handleSelectRequest}
        onClearHistory={handleClearHistory}
      />
    </div>
  );
}

export default App;