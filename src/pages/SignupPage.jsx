import { useState } from 'react';
import { signupEndpoint } from '../services/apiService';
import { useNavigate } from 'react-router-dom';

export default function Signup(props) {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  async function signup(evt) {
    evt.preventDefault();
    // Endpoint that creates the seassion at the backend
    try {
      const user = await signupEndpoint(username, password);
      if (user) {
        props.onSignIn(user);
        setError('');
        navigate(`/catalog/${user.userId}`);
      }
    } catch (error) {
      setError('Sign up failed');
    }
  }

  return (
    <div className="relative flex flex-col justify-center min-h-screen overflow-hidden">
      <div className="w-full p-6 m-auto bg-white rounded-md shadow-md lg:max-w-xl">
        <h1 className="text-3xl font-semibold text-center text-gray-900 ">Sign up</h1>
        <form onSubmit={signup} className="mt-6">
          <div className="mb-2">
            <label htmlFor="username" className="block text-sm font-semibold text-gray-800">
              Username
            </label>
            <input
              id="username"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={username}
              onChange={(evt) => setUsername(evt.target.value)}
            />
          </div>
          <div className="mb-2">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-800">
              Password
            </label>
            <input
              type="password"
              className="block w-full px-4 py-2 mt-2 text-gray-900 bg-white border rounded-md focus:border-blue-500 focus:ring-blue-300 focus:outline-none focus:ring focus:ring-opacity-40"
              value={password}
              onChange={(evt) => setPassword(evt.target.value)}
            />
          </div>
          <div>{error && <p className="text-red-500 text-center">{error}</p>}</div>
          <div className="mt-6">
            <button
              type="submit"
              className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-gray-900 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 hover:text-black"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
