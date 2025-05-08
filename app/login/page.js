'use client';

import Image from "next/image";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useUser } from '@/store/UserContext';

export default function Login() {
  const router = useRouter();
  const { setUser } = useUser();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { username, password };

    const res = await fetch('https://test-fe.mysellerpintar.com/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      const data = await res.json();
      // console.log('Login successful:', data);
      localStorage.setItem('user', JSON.stringify(data.token));
      fetch('https://test-fe.mysellerpintar.com/api/auth/profile', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${data.token}`,
        },
      })
        .then((response) => response.json())
        .then((profileData) => {
          setUser(profileData); // Save profile data to context
        })
      router.push('/'); // Navigate after login
    } else {
      alert('Login failed');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-sm"
      >
        <Image src="/logo.png" width={200} height={50} alt="logo" className="mb-4" />
        <div className="mb-4">
          <label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 w-full text-white font-bold py-2 px-4 rounded"
        >
          Login
        </button>
        <div className="mt-4 text-center">
          <span>Dont have an account? </span>
          <a href="/register" className="text-blue-500 hover:text-blue-800">
            Register here
          </a>
        </div>
      </form>
    </div>
  );
}
