import { useState, useEffect } from 'react';

export default function UtmUnitReadiness() {
  const [unitReadinessData, setUnitReadinessData] = useState(null);

  // Fetch the unit readiness data when the component mounts
  useEffect(() => {
    const fetchUnitReadinessData = async () => {
      const unitId = 123; // Replace with the actual unitId or get it from props or state
      try {
        const response = await fetch(`/status/${unitId}`);
        if (response.ok) {
          const data = await response.json();
          setUnitReadinessData(data);
        } else {
          throw new Error('Failed to fetch unit readiness data');
        }
      } catch (error) {
        console.error(error);
        // Handle any error if necessary
      }
    };

    fetchUnitReadinessData();
  }, []);

  // Function to handle downloading the full report as a CSV file
  const handleDownloadReport = () => {
    // Implement the logic to generate and download the CSV report here
  };

  return (
    <div>
      <div>
        <h2>Unit Readiness Section</h2>
        {/* Add the fetched data to display the unit's readiness regarding the personnels' training status */}
        {unitReadinessData ? (
          <div>
            {/* Display the data */}
            <pre>{JSON.stringify(unitReadinessData, null, 2)}</pre>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
      <div>
        {/* Add the download button to download the full report */}
        <button onClick={handleDownloadReport}>Download Report</button>
      </div>
    </div>
  );
}