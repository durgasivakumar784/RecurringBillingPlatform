import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "../pages/auth/Login";
import MainLayout from "../layouts/MainLayout";

import Dashboard from "../pages/dashboard/Dashboard";
import Plans from "../pages/plans/Plans";
import Customers from "../pages/customers/Customers";
import Subscriptions from "../pages/subscriptions/Subscriptions";
import Invoices from "../pages/invoices/Invoices";
import Payments from "../pages/payments/Payments";
import AuditLogs from "../pages/audit/AuditLogs";
import Refunds from "../pages/refunds/Refunds";
import AdminDashboard from "../pages/admin/AdminDashboard";


function AppRoutes() {

  return (

    <BrowserRouter>

      <Routes>

        {/* Login */}
        <Route
          path="/"
          element={<Login />}
        />

        {/* Main Layout */}
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