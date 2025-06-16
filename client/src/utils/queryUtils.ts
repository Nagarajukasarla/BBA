/**
 * Builds a query string from an object of parameters
 * @param params Object containing query parameters
 * @returns Query string (e.g., "?param1=value1&param2=value2")
 */
export function buildQueryString(params: Record<string, any>): string {
  // Filter out null, undefined, and empty string values
  const filteredParams = Object.entries(params).filter(
    ([_, value]) => value !== null && value !== undefined && value !== ''
  );

  if (filteredParams.length === 0) {
    return '';
  }

  // Build query string
  const queryString = filteredParams
    .map(([key, value]) => {
      // Handle arrays
      if (Array.isArray(value)) {
        return value
          .map(item => `${encodeURIComponent(key)}=${encodeURIComponent(item)}`)
          .join('&');
      }
      // Handle objects
      if (typeof value === 'object' && value !== null) {
        return `${encodeURIComponent(key)}=${encodeURIComponent(JSON.stringify(value))}`;
      }
      // Handle primitive values
      return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
    })
    .join('&');

  return `?${queryString}`;
}

/**
 * Parses a query string into an object
 * @param queryString Query string to parse
 * @returns Object containing parsed parameters
 */
export function parseQueryString(queryString: string): Record<string, any> {
  if (!queryString || queryString === '?') {
    return {};
  }

  // Remove leading ? if present
  const query = queryString.startsWith('?') ? queryString.substring(1) : queryString;

  // Split into key-value pairs
  return query.split('&').reduce((params, param) => {
    const [key, value] = param.split('=').map(decodeURIComponent);
    
    // Try to parse JSON values
    let parsedValue = value;
    try {
      parsedValue = JSON.parse(value);
    } catch (e) {
      // Not a JSON value, keep as is
    }
    
    return { ...params, [key]: parsedValue };
  }, {});
}
