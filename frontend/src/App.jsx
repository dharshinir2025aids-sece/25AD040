
import { useEffect, useState } from "react";
import "./App.css";

const API = "http://localhost:8080/api";

function App() {
  const [activePage, setActivePage] = useState("Dashboard");

  const [rooms, setRooms] = useState([]);
  const [tenants, setTenants] = useState([]);
  const [payments, setPayments] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Add Room form
  const [showRoomForm, setShowRoomForm] = useState(false);
  const [roomNumber, setRoomNumber] = useState("");
  const [monthlyRent, setMonthlyRent] = useState("");
  const [roomStatus, setRoomStatus] = useState("AVAILABLE");
  const [roomMessage, setRoomMessage] = useState("");

  const menuItems = ["Dashboard", "Rooms", "Tenants", "Payments"];

  // Load backend data
  const loadData = async () => {
    try {
      setLoading(true);
      setError("");

      const [roomsResponse, tenantsResponse, paymentsResponse] =
          await Promise.all([
            fetch(`${API}/rooms`),
fetch(`${API}/tenants`),
    fetch(`${API}/rent-payments`),
]);

if (
    !roomsResponse.ok ||
    !tenantsResponse.ok ||
    !paymentsResponse.ok
) {
  throw new Error("Failed to load data");
}

const roomsData = await roomsResponse.json();
const tenantsData = await tenantsResponse.json();
const paymentsData = await paymentsResponse.json();

setRooms(roomsData);
setTenants(tenantsData);
setPayments(paymentsData);
} catch (err) {
  console.error(err);
  setError("Backend data could not be loaded.");
} finally {
  setLoading(false);
}
};

useEffect(() => {
  loadData();
}, []);

// Add Room
const handleAddRoom = async (event) => {
  event.preventDefault();

  setRoomMessage("");

  if (!roomNumber.trim()) {
    setRoomMessage("Room number is required.");
    return;
  }

  if (!monthlyRent || Number(monthlyRent) <= 0) {
    setRoomMessage("Monthly rent must be greater than 0.");
    return;
  }

  try {
    const response = await fetch(`${API}/rooms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        roomNumber: roomNumber.trim(),
        monthlyRent: Number(monthlyRent),
        status: roomStatus,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
          data?.monthlyRent ||
          data?.roomNumber ||
          "Could not add room.";

      throw new Error(message);
    }

    setRoomNumber("");
    setMonthlyRent("");
    setRoomStatus("AVAILABLE");
    setRoomMessage("Room added successfully!");

    setShowRoomForm(false);

    await loadData();
  } catch (err) {
    console.error(err);
    setRoomMessage(err.message);
  }
};


// Add Tenant form
const [showTenantForm, setShowTenantForm] = useState(false);
const [tenantName, setTenantName] = useState("");
const [tenantPhone, setTenantPhone] = useState("");
const [tenantEmail, setTenantEmail] = useState("");
const [tenantRoomId, setTenantRoomId] = useState("");
const [tenantMessage, setTenantMessage] = useState("");

// Add Tenant
const handleAddTenant = async (event) => {
  event.preventDefault();
  setTenantMessage("");

  if (!tenantName.trim()) {
    setTenantMessage("Tenant name is required.");
    return;
  }

  if (!tenantPhone.trim()) {
    setTenantMessage("Phone number is required.");
    return;
  }

  if (!tenantEmail.trim()) {
    setTenantMessage("Email is required.");
    return;
  }

  if (!tenantRoomId) {
    setTenantMessage("Please select a room.");
    return;
  }

  const selectedRoom = rooms.find(
      (room) => String(room.id) === String(tenantRoomId)
  );

  if (!selectedRoom) {
    setTenantMessage("Selected room was not found.");
    return;
  }

  if (selectedRoom.status !== "AVAILABLE") {
    setTenantMessage("Selected room is not available.");
    return;
  }

  try {
    const response = await fetch(`${API}/tenants`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: tenantName.trim(),
        phone: tenantPhone.trim(),
        email: tenantEmail.trim(),
        roomId: Number(tenantRoomId),
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      const message =
          data?.name ||
          data?.phone ||
          data?.email ||
          data?.roomId ||
          data?.message ||
          "Could not add tenant.";

      throw new Error(message);
    }

    setTenantName("");
    setTenantPhone("");
    setTenantEmail("");
    setTenantRoomId("");
    setTenantMessage("Tenant added successfully!");
    setShowTenantForm(false);

    await loadData();
  } catch (err) {
    console.error(err);
    setTenantMessage(err.message);
  }
};

// Vacate Tenant
const handleVacateTenant = async (tenantId) => {
  try {
    const response = await fetch(`${API}/tenants/${tenantId}/vacate`, {
      method: "PUT",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
          data?.message || "Could not vacate tenant."
      );
    }

    setTenantMessage("Tenant vacated successfully!");
    await loadData();
  } catch (err) {
    console.error(err);
    setTenantMessage(err.message);
  }
};

// Delete Tenant
const handleDeleteTenant = async (tenantId) => {
  try {
    const response = await fetch(`${API}/tenants/${tenantId}`, {
      method: "DELETE",
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      throw new Error(
          data?.message || "Could not delete tenant."
      );
    }

    setTenantMessage("Tenant deleted successfully!");
    await loadData();
  } catch (err) {
    console.error(err);
    setTenantMessage(err.message);
  }
};

// Add Payment form
const [showPaymentForm, setShowPaymentForm] = useState(false);
const [paymentTenantId, setPaymentTenantId] = useState("");
const [paymentMonth, setPaymentMonth] = useState("September 2026");
const [paymentAmount, setPaymentAmount] = useState("");
const [paymentStatus, setPaymentStatus] = useState("PAID");
const [paymentMessage, setPaymentMessage] = useState("");

// Add Payment
const handleAddPayment = async (event) => {
  event.preventDefault();
  setPaymentMessage("");

  if (!paymentTenantId) {
    setPaymentMessage("Please select a tenant.");
    return;
  }

  if (!paymentMonth.trim()) {
    setPaymentMessage("Month is required.");
    return;
  }

  if (!paymentAmount || Number(paymentAmount) <= 0) {
    setPaymentMessage("Amount must be greater than 0.");
    return;
  }

  try {
    const response = await fetch(`${API}/rent-payments`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        tenantId: Number(paymentTenantId),
        month: paymentMonth.trim(),
        amount: Number(paymentAmount),
        status: paymentStatus,
      }),
    });

    const data = await response.json().catch(() => null);

    if (!response.ok) {
      const message =
          data?.tenantId ||
          data?.month ||
          data?.amount ||
          data?.status ||
          data?.message ||
          "Could not add payment.";

      throw new Error(message);
    }

    setPaymentTenantId("");
    setPaymentMonth("September 2026");
    setPaymentAmount("");
    setPaymentStatus("PAID");
    setPaymentMessage("Payment added successfully!");
    setShowPaymentForm(false);

    await loadData();
  } catch (err) {
    console.error(err);
    setPaymentMessage(err.message);
  }
};

// Dashboard calculations
const totalRooms = rooms.length;

const availableRooms = rooms.filter(
    (room) => room.status === "AVAILABLE"
).length;

const occupiedRooms = rooms.filter(
    (room) => room.status === "OCCUPIED"
).length;

const activeTenants = tenants.filter(
    (tenant) => tenant.active === true
).length;

const currentMonth = "September 2026";

const monthlyCollection = payments
    .filter(
        (payment) =>
            payment.month === currentMonth &&
            payment.status === "PAID"
    )
    .reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
    );

const pendingDues = payments
    .filter((payment) => payment.status === "PENDING")
    .reduce(
        (total, payment) => total + Number(payment.amount || 0),
        0
    );

// Get tenant name
const getTenantName = (tenantId) => {
  const tenant = tenants.find(
      (tenant) => tenant.id === tenantId
  );

  return tenant ? tenant.name : `Tenant #${tenantId}`;
};

// Get room number
const getRoomNumber = (roomId) => {
  const room = rooms.find(
      (room) => room.id === roomId
  );

  return room ? room.roomNumber : `Room #${roomId}`;
};

return (
    <div className="app">

      {/* SIDEBAR */}
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
                  className={
                    activePage === item
                        ? "menu active"
                        : "menu"
                  }
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

      {/* MAIN */}
      <main className="main">

        {/* TOPBAR */}
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

        {/* CONTENT */}
        <section className="content">

          {loading ? (
              <div className="message">
                Loading data...
              </div>
          ) : error ? (
              <div className="error-message">
                {error}
              </div>
          ) : (

              <>
                {/* DASHBOARD */}
                {activePage === "Dashboard" && (
                    <>

                      <div className="stats-grid">

                        <div className="stat-card">
                          <span>Total Rooms</span>
                          <strong>{totalRooms}</strong>
                        </div>

                        <div className="stat-card">
                          <span>Available Rooms</span>
                          <strong>{availableRooms}</strong>
                        </div>

                        <div className="stat-card">
                          <span>Occupied Rooms</span>
                          <strong>{occupiedRooms}</strong>
                        </div>

                        <div className="stat-card">
                          <span>Active Tenants</span>
                          <strong>{activeTenants}</strong>
                        </div>

                      </div>

                      <div className="stats-grid">

                        <div className="stat-card">
                          <span>Monthly Collection</span>
                          <strong>
                            ₹{monthlyCollection.toLocaleString("en-IN")}
                          </strong>
                        </div>

                        <div className="stat-card">
                          <span>Pending Dues</span>
                          <strong>
                            ₹{pendingDues.toLocaleString("en-IN")}
                          </strong>
                        </div>

                      </div>

                      <div className="section-card">

                        <div className="section-header">
                          <div>
                            <h2>Room Overview</h2>
                            <p>Current room status</p>
                          </div>
                        </div>

                        {rooms.length === 0 ? (
                            <p>No rooms available.</p>
                        ) : (
                            <div className="table-wrapper">

                              <table>

                                <thead>
                                <tr>
                                  <th>Room</th>
                                  <th>Monthly Rent</th>
                                  <th>Status</th>
                                </tr>
                                </thead>

                                <tbody>

                                {rooms.map((room) => (
                                    <tr key={room.id}>

                                      <td>
                                        {room.roomNumber}
                                      </td>

                                      <td>
                                        ₹
                                        {Number(
                                            room.monthlyRent || 0
                                        ).toLocaleString("en-IN")}
                                      </td>

                                      <td>
                                  <span
                                      className={
                                        room.status === "AVAILABLE"
                                            ? "status available"
                                            : "status occupied"
                                      }
                                  >
                                    {room.status}
                                  </span>
                                      </td>

                                    </tr>
                                ))}

                                </tbody>

                              </table>

                            </div>
                        )}

                      </div>

                      <div className="section-card">

                        <div className="section-header">
                          <div>
                            <h2>Recent Payments</h2>
                            <p>Latest rent payments</p>
                          </div>
                        </div>

                        {payments.length === 0 ? (
                            <p>No payments available.</p>
                        ) : (
                            <div className="table-wrapper">

                              <table>

                                <thead>
                                <tr>
                                  <th>Tenant</th>
                                  <th>Month</th>
                                  <th>Amount</th>
                                  <th>Status</th>
                                </tr>
                                </thead>

                                <tbody>

                                {payments.map((payment) => (
                                    <tr key={payment.id}>

                                      <td>
                                        {getTenantName(
                                            payment.tenantId
                                        )}
                                      </td>

                                      <td>
                                        {payment.month}
                                      </td>

                                      <td>
                                        ₹
                                        {Number(
                                            payment.amount || 0
                                        ).toLocaleString("en-IN")}
                                      </td>

                                      <td>
                                  <span
                                      className={
                                        payment.status === "PAID"
                                            ? "status paid"
                                            : "status pending"
                                      }
                                  >
                                    {payment.status}
                                  </span>
                                      </td>

                                    </tr>
                                ))}

                                </tbody>

                              </table>

                            </div>
                        )}

                      </div>

                    </>
                )}

                {/* ROOMS */}
                {activePage === "Rooms" && (
                    <>

                      <div className="page-header">

                        <div>
                          <h2>Rooms</h2>
                          <p>Manage PG rooms and rent details.</p>
                        </div>

                        <button
                            className="primary-button"
                            onClick={() => {
                              setShowRoomForm(!showRoomForm);
                              setRoomMessage("");
                            }}
                        >
                          + Add Room
                        </button>

                      </div>

                      {showRoomForm && (
                          <div className="form-card">

                            <h3>Add New Room</h3>

                            <form onSubmit={handleAddRoom}>

                              <div className="form-grid">

                                <div className="form-group">
                                  <label>
                                    Room Number
                                  </label>

                                  <input
                                      type="text"
                                      value={roomNumber}
                                      onChange={(e) =>
                                          setRoomNumber(
                                              e.target.value
                                          )
                                      }
                                      placeholder="Example: 102"
                                  />
                                </div>

                                <div className="form-group">
                                  <label>
                                    Monthly Rent
                                  </label>

                                  <input
                                      type="number"
                                      value={monthlyRent}
                                      onChange={(e) =>
                                          setMonthlyRent(
                                              e.target.value
                                          )
                                      }
                                      placeholder="Example: 8000"
                                  />
                                </div>

                                <div className="form-group">
                                  <label>
                                    Status
                                  </label>

                                  <select
                                      value={roomStatus}
                                      onChange={(e) =>
                                          setRoomStatus(
                                              e.target.value
                                          )
                                      }
                                  >
                                    <option value="AVAILABLE">
                                      AVAILABLE
                                    </option>

                                    <option value="OCCUPIED">
                                      OCCUPIED
                                    </option>
                                  </select>
                                </div>

                              </div>

                              <div className="form-actions">

                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                  Save Room
                                </button>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => {
                                      setShowRoomForm(false);
                                      setRoomMessage("");
                                    }}
                                >
                                  Cancel
                                </button>

                              </div>

                            </form>

                            {roomMessage && (
                                <p className="form-message">
                                  {roomMessage}
                                </p>
                            )}

                          </div>
                      )}

                      <div className="section-card">

                        <div className="table-wrapper">

                          <table>

                            <thead>
                            <tr>
                              <th>ID</th>
                              <th>Room Number</th>
                              <th>Monthly Rent</th>
                              <th>Status</th>
                            </tr>
                            </thead>

                            <tbody>

                            {rooms.map((room) => (
                                <tr key={room.id}>

                                  <td>{room.id}</td>

                                  <td>
                                    {room.roomNumber}
                                  </td>

                                  <td>
                                    ₹
                                    {Number(
                                        room.monthlyRent || 0
                                    ).toLocaleString("en-IN")}
                                  </td>

                                  <td>
                                <span
                                    className={
                                      room.status === "AVAILABLE"
                                          ? "status available"
                                          : "status occupied"
                                    }
                                >
                                  {room.status}
                                </span>
                                  </td>

                                </tr>
                            ))}

                            </tbody>

                          </table>

                        </div>

                      </div>

                    </>
                )}

                {/* TENANTS */}
                {activePage === "Tenants" && (
                    <>
                      <div className="page-header">
                        <div>
                          <h2>Tenants</h2>
                          <p>Manage PG tenants and room assignments.</p>
                        </div>

                        <button
                            className="primary-button"
                            onClick={() => {
                              setShowTenantForm(!showTenantForm);
                              setTenantMessage("");
                            }}
                        >
                          + Add Tenant
                        </button>
                      </div>

                      {showTenantForm && (
                          <div className="form-card">
                            <h3>Add New Tenant</h3>

                            <form onSubmit={handleAddTenant}>
                              <div className="form-grid">
                                <div className="form-group">
                                  <label>Tenant Name</label>
                                  <input
                                      type="text"
                                      value={tenantName}
                                      onChange={(e) =>
                                          setTenantName(e.target.value)
                                      }
                                      placeholder="Example: Arun"
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Phone Number</label>
                                  <input
                                      type="text"
                                      value={tenantPhone}
                                      onChange={(e) =>
                                          setTenantPhone(e.target.value)
                                      }
                                      placeholder="Example: 9876543211"
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Email</label>
                                  <input
                                      type="email"
                                      value={tenantEmail}
                                      onChange={(e) =>
                                          setTenantEmail(e.target.value)
                                      }
                                      placeholder="Example: arun@gmail.com"
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Room</label>
                                  <select
                                      value={tenantRoomId}
                                      onChange={(e) =>
                                          setTenantRoomId(e.target.value)
                                      }
                                  >
                                    <option value="">Select available room</option>

                                    {rooms
                                        .filter(
                                            (room) => room.status === "AVAILABLE"
                                        )
                                        .map((room) => (
                                            <option
                                                key={room.id}
                                                value={room.id}
                                            >
                                              {room.roomNumber} - ₹
                                              {Number(
                                                  room.monthlyRent || 0
                                              ).toLocaleString("en-IN")}
                                            </option>
                                        ))}
                                  </select>
                                </div>
                              </div>

                              <div className="form-actions">
                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                  Save Tenant
                                </button>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => {
                                      setShowTenantForm(false);
                                      setTenantMessage("");
                                    }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>

                            {tenantMessage && (
                                <p className="form-message">{tenantMessage}</p>
                            )}
                          </div>
                      )}

                      {!showTenantForm && tenantMessage && (
                          <p className="form-message">{tenantMessage}</p>
                      )}

                      <div className="section-card">
                        <div className="section-header">
                          <div>
                            <h2>Tenants</h2>
                            <p>Current PG tenants</p>
                          </div>
                        </div>

                        <div className="table-wrapper">
                          <table>
                            <thead>
                            <tr>
                              <th>ID</th>
                              <th>Name</th>
                              <th>Phone</th>
                              <th>Email</th>
                              <th>Room</th>
                              <th>Status</th>
                              <th>Action</th>
                            </tr>
                            </thead>

                            <tbody>
                            {tenants.length === 0 ? (
                                <tr>
                                  <td colSpan="7">No tenants available.</td>
                                </tr>
                            ) : (
                                tenants.map((tenant) => (
                                    <tr key={tenant.id}>
                                      <td>{tenant.id}</td>

                                      <td>{tenant.name}</td>

                                      <td>{tenant.phone}</td>

                                      <td>{tenant.email}</td>

                                      <td>
                                        {getRoomNumber(tenant.roomId)}
                                      </td>

                                      <td>
                                      <span
                                          className={
                                            tenant.active
                                                ? "status paid"
                                                : "status pending"
                                          }
                                      >
                                        {tenant.active
                                            ? "ACTIVE"
                                            : "INACTIVE"}
                                      </span>
                                      </td>

                                      <td>
                                        {tenant.active ? (
                                            <button
                                                type="button"
                                                className="secondary-button"
                                                onClick={() =>
                                                    handleVacateTenant(tenant.id)
                                                }
                                            >
                                              Vacate
                                            </button>
                                        ) : (
                                            <button
                                                type="button"
                                                className="secondary-button"
                                                onClick={() =>
                                                    handleDeleteTenant(tenant.id)
                                                }
                                            >
                                              Delete
                                            </button>
                                        )}
                                      </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                )}

                {/* PAYMENTS */}
                {activePage === "Payments" && (
                    <>
                      <div className="page-header">
                        <div>
                          <h2>Payments</h2>
                          <p>Manage rent payments and payment history.</p>
                        </div>

                        <button
                            type="button"
                            className="primary-button"
                            onClick={() => {
                              setShowPaymentForm(!showPaymentForm);
                              setPaymentMessage("");
                            }}
                        >
                          + Add Payment
                        </button>
                      </div>

                      {showPaymentForm && (
                          <div className="form-card">
                            <h3>Add New Payment</h3>

                            <form onSubmit={handleAddPayment}>
                              <div className="form-grid">
                                <div className="form-group">
                                  <label>Tenant</label>
                                  <select
                                      value={paymentTenantId}
                                      onChange={(e) =>
                                          setPaymentTenantId(e.target.value)
                                      }
                                  >
                                    <option value="">Select Tenant</option>
                                    {tenants
                                        .filter((tenant) => tenant.active)
                                        .map((tenant) => (
                                            <option
                                                key={tenant.id}
                                                value={tenant.id}
                                            >
                                              {tenant.name}
                                            </option>
                                        ))}
                                  </select>
                                </div>

                                <div className="form-group">
                                  <label>Month</label>
                                  <input
                                      type="text"
                                      value={paymentMonth}
                                      onChange={(e) =>
                                          setPaymentMonth(e.target.value)
                                      }
                                      placeholder="Example: September 2026"
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Amount</label>
                                  <input
                                      type="number"
                                      value={paymentAmount}
                                      onChange={(e) =>
                                          setPaymentAmount(e.target.value)
                                      }
                                      placeholder="Example: 7500"
                                      min="1"
                                  />
                                </div>

                                <div className="form-group">
                                  <label>Status</label>
                                  <select
                                      value={paymentStatus}
                                      onChange={(e) =>
                                          setPaymentStatus(e.target.value)
                                      }
                                  >
                                    <option value="PAID">PAID</option>
                                    <option value="PENDING">PENDING</option>
                                  </select>
                                </div>
                              </div>

                              <div className="form-actions">
                                <button
                                    type="submit"
                                    className="primary-button"
                                >
                                  Save Payment
                                </button>

                                <button
                                    type="button"
                                    className="secondary-button"
                                    onClick={() => {
                                      setShowPaymentForm(false);
                                      setPaymentMessage("");
                                    }}
                                >
                                  Cancel
                                </button>
                              </div>
                            </form>

                            {paymentMessage && (
                                <p className="form-message">
                                  {paymentMessage}
                                </p>
                            )}
                          </div>
                      )}

                      <div className="section-card">
                        <div className="section-header">
                          <div>
                            <h2>Payments</h2>
                            <p>Rent payment history</p>
                          </div>
                        </div>

                        <div className="table-wrapper">
                          <table>
                            <thead>
                            <tr>
                              <th>ID</th>
                              <th>Tenant</th>
                              <th>Month</th>
                              <th>Amount</th>
                              <th>Status</th>
                            </tr>
                            </thead>

                            <tbody>
                            {payments.length === 0 ? (
                                <tr>
                                  <td colSpan="5">No payments available.</td>
                                </tr>
                            ) : (
                                payments.map((payment) => (
                                    <tr key={payment.id}>
                                      <td>{payment.id}</td>
                                      <td>{getTenantName(payment.tenantId)}</td>
                                      <td>{payment.month}</td>
                                      <td>
                                        ₹
                                        {Number(payment.amount || 0).toLocaleString(
                                            "en-IN"
                                        )}
                                      </td>
                                      <td>
                                      <span
                                          className={
                                            payment.status === "PAID"
                                                ? "status paid"
                                                : "status pending"
                                          }
                                      >
                                        {payment.status}
                                      </span>
                                      </td>
                                    </tr>
                                ))
                            )}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </>
                )}

              </>
          )}

        </section>

      </main>

    </div>
);
}

export default App;
