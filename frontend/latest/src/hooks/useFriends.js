import { useState, useEffect } from "react";
import { getUserFriends } from "../lib/api";

const useFriends = () => {
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        setLoading(true);
        const data = await getUserFriends();
        setFriends(data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchFriends();
  }, []);

  return { friends, loading, error };
};

export default useFriends;
