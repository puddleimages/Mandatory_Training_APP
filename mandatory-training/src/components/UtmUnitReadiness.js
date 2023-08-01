import React, { useState, useEffect } from 'react';
import useUserCheck from '../hooks/useUserCheck';
import UtmReadinessTable from './UtmReadinessTable';
import '../stylesheets/UtmUnitReadiness.css';

export default function UtmUnitReadiness() {
  const [unitReadinessData, setUnitReadinessData] = useState(null);
  const { unitID } = useUserCheck();
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUnitReadinessData = async () => {
      try {
        if (!unitID) {
          return;
        }
        const response = await fetch(`http://localhost:4000/unit/status/${unitID}`);
        if (response.ok) {
          const data = await response.json();
          setUnitReadinessData(data);
        } else {
          const errorData = await response.text();
          console.error('Error fetching unit readiness data:', errorData);
          throw new Error('Failed to fetch unit readiness data');
        }
      } catch (error) {
        console.error('Error fetching unit readiness data:', error);
        setError(error.message);
      }
    };

    fetchUnitReadinessData();
  }, [unitID]);

  const handleDownloadReport = () => {
    // Implement the logic to generate and download the CSV report here
  };

  return (
    <div className="readiness-container">
      <div>
        <h2>Unit Readiness Section</h2>
        <UtmReadinessTable unitReadinessData={unitReadinessData} />
      </div>
      <div>
        <button onClick={handleDownloadReport}>Download Report</button>
      </div>
    </div>
  );
}
