'use client';

import { UserProvider } from '@/store/UserContext';

export default function Providers({ children }) {
  return <UserProvider>{children}</UserProvider>;
}
