import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register } from "../features/auth/authSlice";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const { status, requiresOTP } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = () => {
    if (!form.name || !form.email || !form.password) {
      toast.error("All fields are required");
      return;
    }
    dispatch(register({ name: form.name, email: form.email, password: form.password }));
  }

  useEffect(() => {
    if (requiresOTP) {
      navigate("/");
    }
  }, [requiresOTP, navigate]);


  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-8 shadow-lg rounded-lg w-96 text-sm">
        <h2 className="text-2xl text-white text-center font-bold mb-4">Register</h2>
        <p className="text-center text-indigo-300 mb-6">
            We are excited to have you join our community!
        </p>

        <div className="w-full flex items-center gap-3 px-5 py-2.5 rounded bg-[#333A5C] mb-4">
          <input type="text" className="w-full bg-transparent outline-none text-white" placeholder="Full name" value={form.name} onChange={(e) => setForm({...form, name: e.target.value})} />
        </div>

        <div className="w-full flex items-center gap-3 px-5 py-2.5 rounded bg-[#333A5C] mb-4">
          <input type="email" className="w-full bg-transparent outline-none text-white" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
        </div>

        <div className="w-full flex items-center gap-3 px-5 py-2.5 rounded bg-[#333A5C] mb-4">
          <input type="password" className="w-full bg-transparent outline-none text-white" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
        </div>

        <button className={`w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded cursor-pointer`} onClick={handleRegister} disabled={status === "loading"}>
          {status === "loading" ? (
            <div className="flex items-center justify-center gap-2">
              <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>

              <span>Registering...</span>
            </div>
          ) : "Register"}
        </button>
        <p className="text-center text-white mt-4">
          <span className="text-xs">Already have an account? <Link to="/login" className="text-indigo-500 underline text-sm font-semibold">Login</Link></span>
        </p>
      </div>
    </div>
  )
}

export default Register