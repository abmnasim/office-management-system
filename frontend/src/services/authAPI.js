const resendOtp = async (email) => {
    const response = await fetch('/api/v1/auth/resend-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email }),
    });

    return response;
}

const verifyOtp = async (email, otp) => {
    const response = await fetch('/api/v1/auth/verify-otp', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, otp }),
    });

    return response;
}

const login = async (email, password) => {
  try {
    const response = await fetch('/api/v1/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    return response;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
}

const isAuthenticated = async () => {
    const response = await fetch('/api/v1/auth/is-authenticated', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}

const logout = async () => {
    const response = await fetch('/api/v1/auth/logout', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return response;
}
export { isAuthenticated, login, logout, resendOtp, verifyOtp };

