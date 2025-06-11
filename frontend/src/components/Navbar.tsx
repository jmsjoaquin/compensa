'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();

  const tabs = [
    { label: 'Dashboard', path: '/dashboard' },
    { label: 'Salary', path: '/salary' },
    { label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="flex justify-between items-center px-6 py-3 flex-shrink-0 ">
      <div className="text-xl font-bold text-blue-600">SAHOD</div>

      <div className="flex-1 flex justify-center">
        <div className="flex bg-white rounded-full p-1 space-x-1">
          {tabs.map(tab => (
            <Link href={tab.path} key={tab.path}>
              <button
                className={`px-4 py-1 rounded-full font-medium transition ${
                  pathname === tab.path
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-700 hover:bg-gray-200'
                }`}
              >
                {tab.label}
              </button>
            </Link>
          ))}
        </div>
      </div>

      <div className="flex items-center bg-gray-100 rounded-full px-3 py-1">
        <img
          src="https://i.pravatar.cc/40"
          alt="avatar"
          className="w-8 h-8 rounded-full mr-2"
        />
        <div className="text-sm text-gray-800">Matt Smith</div>
      </div>
    </div>
  );
}
