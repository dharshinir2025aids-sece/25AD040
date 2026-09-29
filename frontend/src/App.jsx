import { useState } from "react";
import "./App.css";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const menuItems = ["Dashboard", "Rooms", "Tenants", "Payments"];

  return (
      <div className="app">
        {/* Sidebar */}
        <aside className="sidebar">
          <div className="logo">
            <div className="logo-icon">R</div>
            <div>
              <h2>RentEasy</h2>
              <span>PG Management</span>
            </div>
          </div>

          <nav>
            {menuItems.map((item) => (
                <button
                    key={item}
                    className={activePage === item ? "menu active" : "menu"}
                    onClick={() => setActivePage(item)}
                >
              <span>
                {item === "Dashboard" && "▦"}
                {item === "Rooms" && "⌂"}
                {item === "Tenants" && "♙"}
                {item === "Payments" && "₹"}
              </span>
                  {item}
                </button>
            ))}
          </nav>

          <div className="sidebar-bottom">
            <div className="admin">
              <div className="avatar">D</div>
              <div>
                <strong>Admin</strong>
                <small>RentEasy</small>
              </div>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="main">
          <header className="topbar">
            <div>
              <h1>{activePage}</h1>
              <p>Manage your PG operations easily.</p>
            </div>

            <div className="top-actions">
              <span className="notification">🔔</span>
              <div className="profile">D</div>
            </div>
          </header>

          {activePage === "Dashboard" && (
              <>
                {/* Stats */}
                <section className="stats">
                  <div className="card">
                    <div className="card-icon blue">⌂</div>
                    <div>
                      <p>Total Rooms</p>
                      <h2>10</h2>
                      <span className="green">Available: 4</span>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-icon purple">♙</div>
                    <div>
                      <p>Active Tenants</p>
                      <h2>6</h2>
                      <span className="green">Currently staying</span>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-icon orange">₹</div>
                    <div>
                      <p>Monthly Collection</p>
                      <h2>₹48,000</h2>
                      <span className="green">September 2026</span>
                    </div>
                  </div>

                  <div className="card">
                    <div className="card-icon red">!</div>
                    <div>
                      <p>Pending Dues</p>
                      <h2>₹8,000</h2>
                      <span className="red-text">Needs attention</span>
                    </div>
                  </div>
                </section>

                {/* Lower section */}
                <section className="dashboard-grid">
                  <div className="panel">
                    <div className="panel-header">
                      <div>
                        <h2>Room Overview</h2>
                        <p>Current room availability</p>
                      </div>
                      <button onClick={() => setActivePage("Rooms")}>
                        View Rooms →
                      </button>
                    </div>

                    <div className="room-status">
                      <div className="room-box available">
                        <span>Available</span>
                        <strong>4</strong>
                      </div>

                      <div className="room-box occupied">
                        <span>Occupied</span>
                        <strong>6</strong>
                      </div>
                    </div>
                  </div>

                  <div className="panel">
                    <div className="panel-header">
                      <div>
                        <h2>Recent Payments</h2>
                        <p>Latest rent transactions</p>
                      </div>
                      <button onClick={() => setActivePage("Payments")}>
                        View All →
                      </button>
                    </div>

                    <div className="payment">
                      <div>
                        <strong>Dharshini</strong>
                        <small>September 2026</small>
                      </div>
                      <div className="payment-right">
                        <strong>₹8,000</strong>
                        <span>PAID</span>
                      </div>
                    </div>

                    <div className="payment">
                      <div>
                        <strong>priya</strong>
                        <small>September 2026</small>
                      </div>
                      <div className="payment-right">
                        <strong>₹8,000</strong>
                        <span className="pending">PENDING</span>
                      </div>
                    </div>
                  </div>
                </section>
              </>
          )}

          {activePage === "Rooms" && (
              <section className="page-panel">
                <div className="panel-header">
                  <div>
                    <h2>Room Management</h2>
                    <p>View and manage PG rooms.</p>
                  </div>
                  <button className="primary-btn">+ Add Room</button>
                </div>

                <div className="table">
                  <div className="table-head">
                    <span>Room</span>
                    <span>Monthly Rent</span>
                    <span>Status</span>
                  </div>

                  <div className="table-row">
                    <span>101</span>
                    <span>₹8,500</span>
                    <span className="status occupied-status">OCCUPIED</span>
                  </div>

                  <div className="table-row">
                    <span>102</span>
                    <span>₹8,000</span>
                    <span className="status available-status">AVAILABLE</span>
                  </div>

                  <div className="table-row">
                    <span>103</span>
                    <span>₹7,500</span>
                    <span className="status available-status">AVAILABLE</span>
                  </div>
                </div>
              </section>
          )}

          {activePage === "Tenants" && (
              <section className="page-panel">
                <div className="panel-header">
                  <div>
                    <h2>Tenant Management</h2>
                    <p>View registered tenants.</p>
                  </div>
                  <button className="primary-btn">+ Add Tenant</button>
                </div>

                <div className="table">
                  <div className="table-head">
                    <span>Name</span>
                    <span>Phone</span>
                    <span>Room</span>
                  </div>

                  <div className="table-row">
                    <span>Dharshini</span>
                    <span>9876543210</span>
                    <span>101</span>
                  </div>

                  <div className="table-row">
                    <span>priya</span>
                    <span>9876543211</span>
                    <span>102</span>
                  </div>
                </div>
              </section>
          )}

          {activePage === "Payments" && (
              <section className="page-panel">
                <div className="panel-header">
                  <div>
                    <h2>Rent Payments</h2>
                    <p>Track monthly rent payments and dues.</p>
                  </div>
                  <button className="primary-btn">+ Record Payment</button>
                </div>

                <div className="table">
                  <div className="table-head">
                    <span>Tenant</span>
                    <span>Month</span>
                    <span>Amount</span>
                    <span>Status</span>
                  </div>

                  <div className="table-row">
                    <span>Dharshini</span>
                    <span>September 2026</span>
                    <span>₹8,000</span>
                    <span className="status paid-status">PAID</span>
                  </div>

                  <div className="table-row">
                    <span>priya</span>
                    <span>September 2026</span>
                    <span>₹8,000</span>
                    <span className="status pending-status">PENDING</span>
                  </div>
                </div>
              </section>
          )}
        </main>
      </div>
  );
}

export default App;