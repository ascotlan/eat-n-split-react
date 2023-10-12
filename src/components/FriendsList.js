import FriendsListItem from "./FriendsListItem";
import AddFriend from "./AddFriend";
import Button from "./Button";

export default function FriendList({ friends, onSelect, selectFriend, handleUpdateFriends, isAddFriend, setIsAddFriend }) {
 
  
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
      {isAddFriend && <AddFriend onAddFriend={handleUpdateFriends} />}
      <Button onSelect={() => setIsAddFriend(curr => !curr)}>{isAddFriend ? "Close":"Add Friend"}</Button>
    </article>
  );
}
