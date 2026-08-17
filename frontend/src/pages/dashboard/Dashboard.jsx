
import React from "react";
import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-page">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <div className="overview-label">OVERVIEW</div>
          <h1>Dashboard</h1>
          <p>Monitor your recurring billing platform</p>
        </div>

        <div className="dashboard-date">
          <span>●</span> System Online
        </div>
      </div>

      {/* Statistics */}
      <div className="stats-grid">

        {/* Customers */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon blue">
              👥
            </div>
            <span className="stat-arrow">↗</span>
          </div>

          <div className="stat-title">Customers</div>
          <div className="stat-number">4</div>
          <div className="stat-description">Total customers</div>
        </div>

        {/* Plans */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon purple">
              📋
            </div>
            <span className="stat-arrow">↗</span>
          </div>

          <div className="stat-title">Plans</div>
          <div className="stat-number">7</div>
          <div className="stat-description">Available plans</div>
        </div>

        {/* Subscriptions */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon cyan">
              🔄
            </div>
            <span className="stat-arrow">↗</span>
          </div>

          <div className="stat-title">Subscriptions</div>
          <div className="stat-number">2</div>
          <div className="stat-description">Active subscriptions</div>
        </div>

        {/* Invoices */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon orange">
              🧾
            </div>
            <span className="stat-arrow">↗</span>
          </div>

          <div className="stat-title">Invoices</div>
          <div className="stat-number">14</div>
          <div className="stat-description">Generated invoices</div>
        </div>

        {/* Payments */}
        <div className="stat-card">
          <div className="stat-top">
            <div className="stat-icon green">
              💳
            </div>
            <span className="stat-arrow">↗</span>
          </div>

          <div className="stat-title">Payments</div>
          <div className="stat-number">4</div>
          <div className="stat-description">Payment transactions</div>
        </div>

      </div>

      {/* Billing Overview */}
      <div className="billing-section">

        <div className="billing-header">
          <div>
            <div className="section-label">ANALYTICS</div>
            <h2>Billing Overview</h2>
            <p>Quick overview of your recurring billing platform.</p>
          </div>

          <div className="analytics-icon">
            📊
          </div>
        </div>

        {/* Billing Cards */}
        <div className="billing-grid">

          <div className="billing-card">
            <div className="billing-card-icon blue">
              👥
            </div>

            <div className="billing-info">
              <span>Total Customers</span>
              <strong>4</strong>
              <small>Registered customers</small>
            </div>
          </div>

          <div className="billing-card">
            <div className="billing-card-icon cyan">
              🔄
            </div>

            <div className="billing-info">
              <span>Total Subscriptions</span>
              <strong>2</strong>
              <small>Currently active</small>
            </div>
          </div>

          <div className="billing-card">
            <div className="billing-card-icon green">
              💳
            </div>

            <div className="billing-info">
              <span>Total Payments</span>
              <strong>4</strong>
              <small>Successful transactions</small>
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;