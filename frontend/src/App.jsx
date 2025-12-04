
import AdminDashboard from './pages/AdminDashboard';
import HistoryPage from './pages/HistoryPage';
function App() {
  return (
    <SocketProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/rider" element={<RiderDashboard />} />
          <Route path="/driver" element={<DriverDashboard />} />
          <Route path="/admin" element={<AdminDashboard />} /> {/* New Route */}
          <Route path="/history" element={<HistoryPage />} /> {/* New Route */}
        </Routes>
      </Router>
    </SocketProvider>
  );
}
export default App;
