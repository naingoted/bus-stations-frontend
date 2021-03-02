import React from "react";
import Card from "../common/Card";

const MonitorStat = () => {
  // to get over all stats data from monitorContext and map through the value
  return (
    <Card>
      <div className="quick-stats">
        <div>
          <div className="text-percentage">100.00%</div>
          <div className="text-muted">Last 24 hours</div>
        </div>
        <div>
          <div className="text-percentage">100.00%</div>
          <div className="text-muted">Last 7 days</div>
        </div>
        <div>
          <div className="text-percentage">99.99%</div>
          <div className="text-muted">Last 30 days</div>
        </div>
        <div>
          <div className="text-percentage">98.9%</div>
          <div className="text-muted">Last 90 days</div>
        </div>
      </div>
    </Card>
  );
};

export default MonitorStat;
