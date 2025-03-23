export const fetchAlerts = async () => {
    const response = await fetch('https://vmaapi.sr.se/alerts/feed.json');
    if (!response.ok) {
      throw new Error('Failed to fetch alerts');
    }
    const data = await response.json();
    return data;
  };
  