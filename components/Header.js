'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaUserCircle } from 'react-icons/fa';
import { useUser } from '@/store/UserContext';
import axios from 'axios';

const Header = () => {
    const { user, setUser } = useUser();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const token = typeof window !== 'undefined' ? localStorage.getItem('user') : null;
  const isLoggedIn = token !== null;

//   useEffect(() => {
//     if (token) {
//       axios
//         .get('https://test-fe.mysellerpintar.com/api/auth/profile', {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         })
//         .then((response) => {
//           console.log('Profile data:', response.data);
//           setUser(response.data); // Save profile data to context
//         })
//         .catch((error) => {
//           console.error('Error fetching profile:', error);
//           // localStorage.removeItem('user'); // Optional: Clear invalid token
//         });
//     }
//   }, [token, setUser]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.reload();
  };

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-50 flex justify-between items-center p-3 bg-gray-100 border-b border-gray-300">
      <Link href="/" className="flex items-center">
        <Image src="/logo.png" width={200} height={50} alt="logo" />
      </Link>

      <div className="relative" ref={dropdownRef}>
        {isLoggedIn ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <FaUserCircle className="text-4xl text-blue-500" />
            <span className="text-gray-800 font-medium">{user?.username || 'User'}</span>
          </div>
        ) : (
          <Link href="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
        )}

        {isDropdownOpen && (
          <div className="absolute right-0 mt-2 bg-white shadow-lg rounded border w-40 z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
            >
              Logout
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
