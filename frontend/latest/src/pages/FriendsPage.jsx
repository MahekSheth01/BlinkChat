import React from "react";
import useFriends from "../hooks/useFriends";
import FriendCard from "../components/FriendCard";
import NoFriendsFound from "../components/NoFriendsFound";
import ChatLoader from "../components/ChatLoader";

const FriendsPage = () => {
  const { friends, loading, error } = useFriends();

  if (loading) return <ChatLoader />;

  if (error) return <div className="text-error">Error loading friends.</div>;

  if (!friends || friends.length === 0) return <NoFriendsFound />;

  return (
    <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
      {friends.map((friend) => (
        <FriendCard key={friend._id} friend={friend} />
      ))}
    </div>
  );
};

export default FriendsPage;
