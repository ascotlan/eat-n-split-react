import FriendsListItem from "./FriendsListItem";
import AddFriend from "./AddFriend";
import Button from "./Button";
import { useState } from "react";

export default function FriendList({ friends, onSelect, selectFriend }) {
  const [isAddFriend, setIsAddFriend] = useState(false);
  
  const renderedFriends = friends.map((friend, index) => {
    const isOpen = index === selectFriend.isOpenIndex;

    return (
      <FriendsListItem
        key={friend.id}
        name={friend.name}
        image={friend.image}
        balance={friend.balance}
        id={friend.id}
        isOpen={isOpen}
        onSelect={onSelect}
        index={index}
      />
    );
  });
  return (
    <article className="sidebar">
      <ul>{renderedFriends}</ul>
      {isAddFriend && <AddFriend />}
      <Button onSelect={() => setIsAddFriend(curr => !curr)}>Add Friend</Button>
    </article>
  );
}
