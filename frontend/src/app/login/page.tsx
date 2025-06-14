'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoginPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [password, setPassword] = useState('');
  const [jobType, setJobType] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    const endpoint = isLogin
      ? 'http://127.0.0.1:8000/api/users/login/'
      : 'http://127.0.0.1:8000/api/users/register/';

    const payload = isLogin
      ? { username, password }
      : {
          username,
          email,
          password,
          first_name: firstName,
          last_name: lastName,
          job_type: jobType,
        };

    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const data = await res.json();
        if (isLogin) {
          localStorage.setItem('token', data.token);
          router.push('/dashboard');
        } else {
          setIsLogin(true);
          alert('Registration successful. You may now login.');
          setUsername('');
          setEmail('');
          setFirstName('');
          setLastName('');
          setPassword('');
          setJobType('');
        }
      } else {
        const errData = await res.json();
        setError(errData.message || 'Request failed');
      }
    } catch (err) {
      console.error(err);
      setError('Something went wrong');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 border rounded shadow-md bg-white">
      <h2 className="text-2xl font-bold mb-4 text-center">
        {isLogin ? 'Login' : 'Register'}
      </h2>

      {error && <p className="text-red-500 mb-4 text-center">{error}</p>}

      <form onSubmit={handleSubmit}>
        <AnimatePresence mode="wait">
          {isLogin ? (
            <motion.div
              key="login"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-4"
            >
              <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>
          ) : (
            <motion.div
              key="register"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 50 }}
              transition={{ duration: 0.3 }}
              className="flex flex-col space-y-4"
            >
              <input
                type="text"
                placeholder="Username"
                className="border p-2 rounded"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
              <input
                type="email"
                placeholder="Email"
                className="border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              {/* <input
                type="text"
                placeholder="First Name"
                className="border p-2 rounded"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              /> */}
              {/* <input
                type="text"
                placeholder="Last Name"
                className="border p-2 rounded"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              /> */}
              {/* <select
                className="border p-2 rounded"
                value={jobType}
                onChange={(e) => setJobType(e.target.value)}
                required
              >
                <option value="">Select Job Type</option>
                <option value="Freelancer">Freelancer</option>
                <option value="JO">Job Order</option>
                <option value="COS">Contract of Service</option>
              </select> */}
              <input
                type="password"
                placeholder="Password"
                className="border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded"
        >
          {isLogin ? 'Login' : 'Register'}
        </button>
      </form>

      <p className="mt-4 text-sm text-center text-gray-600">
        {isLogin ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={() => setIsLogin(!isLogin)}
          className="text-blue-600 hover:underline"
        >
          {isLogin ? 'Register' : 'Login'}
        </button>
      </p>
    </div>
  );
}
