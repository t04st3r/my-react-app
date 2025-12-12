export interface ApiRequest {
  id: number;
  url: string;
  response: string;
  status: 'success' | 'error';
  timestamp: string;
}