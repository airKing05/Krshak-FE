import { useEffect, useState } from 'react';
import { getUserInfo, login } from '../services/adminService';
import Button from '../components/atoms/Button';
import InputWithLabel from '../components/molecules/InputWithLabel';
import {getFromLocalStorage, setToLocalStorage } from '../utils/localStorage';
import { useNavigate } from 'react-router-dom';
import { isTokenValid } from '../utils/auth';




export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  

  const getUserData = async () => {
  const data = getFromLocalStorage<{ token: string;}>('token');
  if (!isTokenValid(data?.token)) return;
   const res = await getUserInfo();
   setToLocalStorage('user', res.user);
  }

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    try {
   
  
    const res = await login(email, password);
      console.log("res", res)
      setToLocalStorage('token', res);
      await getUserData();
      navigate(`/admin`);
    
   
      // redirect to dashboard or protected page
    } catch (err: any) {
      setError(err.response?.data?.message || 'Login failed.');
    }
  };

return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="bg-white shadow-xl rounded-2xl max-w-md w-full p-8">
        <h2 className="text-2xl font-semibold text-center mb-6 text-gray-800">Admin Login</h2>
        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
        <form onSubmit={handleLogin} className="space-y-5">
        <InputWithLabel
          label="Email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="admin@example.com"
        />

        <InputWithLabel
          label="Password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="••••••••"
        />

        <Button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded transition-all duration-200"
        >Submit</Button>
        </form>
      </div>
    </div>
  );
}
