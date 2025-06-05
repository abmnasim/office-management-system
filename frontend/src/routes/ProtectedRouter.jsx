import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRouter = () => {
  const { user } = useSelector((state) => state.auth);
  return user ? (
    <div className="w-full flex justify-start">
        //Left Sidebar Component
        <main className="w-full">
          {/* Main Content Component */}
          {/* Navbar Component */}
          <Outlet />
        </main>
    </div>
  ) : <Navigate to="/login" />;
};

export default ProtectedRouter;