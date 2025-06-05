import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, resendOtp, verifyOtp } from "../features/auth/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef([]);
  const { user, requiresOTP, email, status, error } = useSelector((state) => state.auth);
  const [form, setForm] = useState({
    email: "",
    password: "",
    otp: "",
  });

  const handleLogin = async () => {
    if (!form.email || !form.password) {
      toast.error("Email and Password are required");
      return;
    }
    dispatch(login({email: form.email, password: form.password}));
  }

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  }, [user, navigate]);


  const handleOtpInput = (e, index) => {
    if (e.target.value.length > 0 && index < inputRef.current.length - 1) {
      inputRef.current[index + 1].focus();
    }
  }

  const handleOtpKeyDown = (e, index) => {
    if (e.key === "Backspace" && e.target.value === "" && index > 0) {
      inputRef.current[index - 1].focus();
    }
  }

  const handleOtpPaste = (e) => {
    const pastedValue = e.clipboardData.getData("text");
    pastedValue.split("").forEach((char, index) => {
      if (inputRef.current[index]) {
        inputRef.current[index].value = char;
        handleOtpInput({ target: {value: char} }, index);
      }
    });
  }

  const handleVerify = () => {
    const otp = inputRef.current.map(input => input.value).join("");
    setForm(prev => ({ ...prev, otp }));
    dispatch(verifyOtp({ email: form.email || email, otp }));
  }

  const handleResendOtp = () => {
    dispatch(resendOtp(form.email || email));
  }

  useEffect(() => {
    if (error || status === "failed") {
      toast.error(error);
    }

    if (status === "sended") {
      toast.success("OTP sent to your email");
    }

  }, [error, status]);

  useEffect(() => {
    if (error || status === "failed") {
      toast.error(error);
    }

    if (status === "sended") {
      toast.success("OTP sent to your email");
    }

  }, [error, status]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-200 to-purple-400">
      <div className="bg-slate-900 p-8 shadow-lg rounded-lg w-96 text-sm">
        <h2 className="text-2xl text-white text-center font-bold mb-4">Login</h2>
        <p className="text-center text-indigo-300 mb-6">
            {requiresOTP ? "Please enter the OTP sent to your email" : "Please login with your credentials"}
        </p>
        {requiresOTP ? (
        <>
        <div className="flex justify-between mb-8" onPaste={handleOtpPaste}>
         {Array(6).fill(0).map((_, index) => (
            <input key={index} type="text" maxLength={1} ref={(e) => (inputRef.current[index] = e)} className="w-12 h-12 bg-[#333A5C] outline-none text-center text-xl rounded-lg text-white" onInput={(e) => handleOtpInput(e, index)} onKeyDown={(e) => handleOtpKeyDown(e, index)} />
        ))}
        </div>
          
            <button className="w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 hover:from-indigo-900 hover:to-indigo-500 transition-all ease-in-out duration-500 text-white rounded cursor-pointer" onClick={handleVerify}>
              {status === "verifying" ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span>Verifying...</span>
              </div>
              ) : "Verify"}
            </button>
            {status === "sending" && (
              <div className="text-center text-indigo-300 mt-4">
                <span className="text-xs">Sending OTP...</span>
              </div>
            )}
            <div className="text-center text-indigo-300 mt-4">
              <span className="text-xs">Don't get OTP, <button className="text-indigo-500 underline text-sm font-semibold cursor-pointer" onClick={handleResendOtp}>Resend</button></span>
            </div>
        </>
        ) : (
          <>
            <div className="w-full flex items-center gap-3 px-5 py-2.5 rounded bg-[#333A5C] mb-4">
              <input type="email" className="w-full bg-transparent outline-none text-white" placeholder="Email" value={form.email} onChange={(e) => setForm({...form, email: e.target.value})} />
            </div>
            <div className="w-full flex items-center gap-3 px-5 py-2.5 rounded bg-[#333A5C] mb-4">
              <input type="password" className="w-full bg-transparent outline-none text-white" placeholder="Password" value={form.password} onChange={(e) => setForm({...form, password: e.target.value})} />
            </div>

            <button className={`w-full py-3 bg-gradient-to-r from-indigo-500 to-indigo-900 text-white rounded cursor-pointer`} onClick={handleLogin} disabled={status === "loading"}>
              {status === "loading" ? (
                <div className="flex items-center justify-center gap-2">
                  <svg className="mr-3 -ml-1 size-5 animate-spin text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>

                  <span>Logging in...</span>
                </div>
              ) : "Login"}
            </button>
            <p className="text-center text-white mt-4">
              <span className="text-xs">Don't have an account? <Link to="/register" className="text-indigo-500 underline text-sm font-semibold">Register</Link></span>
            </p>
          </>
        )}

      </div>
    </div>
  )
}

export default Login