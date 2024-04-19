import axios from 'axios';

// ---------------- User endpoints --------------------
export async function signInEndpoint(username, password) {
  const { data } = await axios.post(
    `http://localhost:3001/user/login`,
    { username, password },
    {
      withCredentials: true,
    }
  );
  return data;
}

export async function signupEndpoint(username, password) {
  const { data } = await axios.post(
    `http://localhost:3001/user/signup`,
    { username, password },
    { withCredentials: true }
  );
  return data;
}

export async function signOutEndpoint() {
  return axios.post(`http://localhost:3001/user/signout`, {}, { withCredentials: true });
}
// Checks if the there is an activated user session
export async function getUserEndpoint() {
  const { data } = await axios.get(`http://localhost:3001/user/session`, { withCredentials: true });
  return data;
}

// ---------------- Book endpoints --------------------
export async function apiGetAllUserBooks(userId) {
  const { data } = await axios.get(`http://localhost:3001/catalog/${userId}`, {
    withCredentials: true,
  });
  return data;
}
export async function apiCreateNewBook(book) {
  const { data } = await axios.post(`http://localhost:3001/catalog`, book, {
    withCredentials: true,
  });
  // console.log(JSON.parse(book));
  return data;
}

export async function apiDeleteBook(bookId) {
  await axios.delete(`http://localhost:3001/catalog/${bookId}`, { withCredentials: true });
}

export async function apiEditBook(book) {
  console.log('apiService');
  const { data } = await axios.put(`http://localhost:3001/catalog`, book, {
    withCredentials: true,
  });
  return data;
}
