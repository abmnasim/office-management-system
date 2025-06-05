import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkAuth } from "./features/auth/authSlice";
import AppRouter from "./routes/AppRouter";
function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);
  return (
    <AppRouter></AppRouter>
  )
}

export default App
