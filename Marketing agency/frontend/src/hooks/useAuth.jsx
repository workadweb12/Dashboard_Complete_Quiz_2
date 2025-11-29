import { useEffect, useState } from "react";
import axios from 'axios';

export default function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get("http://localhost:3001/auth", { withCredentials: true })
      .then((res) => {
        if (res.data.success === false) {
          setUser(null);
        } else {
          setUser(res.data.user);
        }
      })
      .catch((err) => {
        console.error('Auth check error:', err.message);
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return { user, loading };
}
