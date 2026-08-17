import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login.jsx";
import MainLayout from "../layouts/MainLayout.jsx";

import Dashboard from "../pages/dashboard/Dashboard.jsx";
import Plans from "../pages/plans/Plans.jsx";
import Customers from "../pages/customers/Customers.jsx";
import Subscriptions from "../pages/subscriptions/Subscriptions.jsx";
import Invoices from "../pages/invoices/Invoices.jsx";
import Payments from "../pages/payments/Payments.jsx";
import AuditLogs from "../pages/audit/AuditLogs.jsx";
import Refunds from "../pages/refunds/Refunds.jsx";
import AdminDashboard from "../pages/admin/AdminDashboard.jsx";

import CustomerHome from "../pages/customer/CustomerHome.jsx";
import CustomerPlans from "../pages/customer/CustomerPlans.jsx";
import VideoPlayer from "../pages/customer/VideoPlayer.jsx";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>

        {/* LOGIN */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* CUSTOMER HOME */}
        <Route
          path="/customer-home"
          element={<CustomerHome />}
        />

        {/* CUSTOMER PLANS */}
        <Route
          path="/customer-plans"
          element={<CustomerPlans />}
        />

        {/* VIDEO PLAYER */}
        <Route
          path="/video-player"
          element={<VideoPlayer />}
        />

        {/* ADMIN */}
        <Route element={<MainLayout />}>

          <Route
            path="/dashboard"
            element={<Dashboard />}
          />

          <Route
            path="/plans"
            element={<Plans />}
          />

          <Route
            path="/customers"
            element={<Customers />}
          />

          <Route
            path="/subscriptions"
            element={<Subscriptions />}
          />

          <Route
            path="/invoices"
            element={<Invoices />}
          />

          <Route
            path="/payments"
            element={<Payments />}
          />

          <Route
            path="/audit"
            element={<AuditLogs />}
          />

          <Route
            path="/refunds"
            element={<Refunds />}
          />

          <Route
            path="/admin-dashboard"
            element={<AdminDashboard />}
          />

        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;