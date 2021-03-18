import axios from 'axios';

// ============ local server ============
const PORT = 8081;
const addr = 'http://localhost';
// /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\

// ============ deploy ============
// const PORT = process.env.PORT || 8081;
// const addr = 'http://antoniosk10-travel-app.herokuapp.com';
// /\ /\ /\ /\ /\ /\ /\ /\ /\ /\ /\

export default axios.create({

  // baseURL: 'http://localhost:8081/api',
  baseURL: `${addr}:${PORT}/api`,
  // baseURL: `${addr}/api`,
  headers: {
    'Content-type': 'application/json',
  },
});
