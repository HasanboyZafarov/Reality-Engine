import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Servers from "./pages/Servers";
import ServerDetail from "./pages/ServerDetail";
import Metrics from "./pages/Metrics";
import Settings from "./pages/Settings";
import Signals from "./pages/Signals";

function App() {
  return (
    <Routes>
      {/* ================= PUBLIC ROUTES ================= */}

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/servers" element={<Servers />} />

      <Route path="/servers/:id" element={<ServerDetail />} />

      <Route path="/metrics" element={<Metrics />} />

      <Route path="/signals" element={<Signals />} />

      <Route path="/settings" element={<Settings />} />

      {/* ================= DEFAULT REDIRECT ================= */}

      <Route path="*" element={<Navigate to="/dashboard" replace />} />
    </Routes>
  );
}

export default App;
