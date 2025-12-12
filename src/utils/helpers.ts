// Helper function to validate URL
export function isValidUrl(urlString: string): boolean {
  try {
    new URL(urlString);
    return true;
  } catch {
    return false;
  }
}

// Helper function to format JSON
export function formatResponse(
  response: string,
  status: 'idle' | 'loading' | 'success' | 'error'
): string {
  if (status === 'success' || status === 'error') {
    try {
      const parsed = JSON.parse(response);
      return JSON.stringify(parsed, null, 2);
    } catch {
      return response;
    }
  }
  return response;
}

// Helper function to truncate URL for display
export function truncateUrl(url: string, maxLength: number = 40): string {
  if (url.length <= maxLength) return url;
  return url.substring(0, maxLength - 3) + '...';
}