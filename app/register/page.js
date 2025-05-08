'use client';

import Image from "next/image";
import { useState } from "react";
import { useRouter } from 'next/navigation';
import { useUser } from "@/store/UserContext";
import { useEffect } from "react";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user"); // default role
    const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();

    const payload = { username, password, role: role.charAt(0).toUpperCase() + role.slice(1).toLowerCase() };

    try {
      const res = await fetch("https://test-fe.mysellerpintar.com/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to register");
      }

      const result = await res.json();
      alert("User registered successfully!");
      router.push("/login"); 
      console.log("Response:", result);

      // Optionally reset form
      setUsername("");
      setPassword("");
      setRole("user");

    } catch (err) {
      console.error(err);
      alert("Registration failed.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <Image
          src="/logo.png"
          width={200}
          height={50}
          alt="logo"
          className="mb-4 text-center w-full"
        />
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700 mb-2">Username</label>
          <input
            type="text"
            id="name"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-gray-700 mb-2">Password</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="role" className="block text-gray-700 mb-2">Role</label>
          <select
            id="role"
            name="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Register
        </button>
      </form>
    </div>
  );
}
