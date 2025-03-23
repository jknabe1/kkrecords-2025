"use client"
import React, { useEffect, useState } from 'react';

interface Alert {
  id: string;
  title: string;
  description: string;
  area: string;
  date: string;
}

const AlertBanner: React.FC = () => {
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAlerts = async () => {
      try {
        const response = await fetch('https://vmaapi.sr.se/alerts/feed.json');
        const data = await response.json();
          
        // Filter alerts for Örebro (case-insensitive check)
        const orebroAlerts = data.alerts.filter((alert: any) =>
          alert.area?.toLowerCase().includes('örebro')
        );

        setAlerts(orebroAlerts);
      } catch (err) {
        setError('Kunde inte hämta VMA-meddelanden.');
      }
    };

    fetchAlerts();
  }, []);

  if (alerts.length === 0) return null;

  return (
    <div className="bg-yellow-300 p-4 border-b-2 border-yellow-500  pt-12 top-0 left-0 right-0 z-[999999]">
      <h1 className="text-lg font-bold">Viktigt meddelande till allmänheten i Örebro</h1>
      {alerts.map((alert) => (
        <div key={alert.id} className="mb-2">
          <h2 className="text-lg font-bold">{alert.title}</h2>
          <p>{alert.description}</p>
          <p className="text-sm text-gray-600">{new Date(alert.date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
};

export default AlertBanner;
