import FriendList from "./components/FriendsList";
import SplitBill from "./components/SplitBill";
import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  const [select, setSelect] = useState({ id: null, name: "", isOpenIndex: -1 });
  const [friends, setFriends] = useState(initialFriends);
  const [isAddFriend, setIsAddFriend] = useState(false);

  const handleSelect = (id, name, nextIndex) => {
    setSelect((currentIndex) => {
      const isOpen = currentIndex.isOpenIndex === nextIndex;
      return {
        ...select,
        id: isOpen ? null : id,
        name: isOpen ? "" : name,
        isOpenIndex: isOpen ? -1 : nextIndex,
      };
    });

    return setIsAddFriend(false);
  };

  const handleBalanceUpdate = (id, myExpense, friendExpense, whoPays, bill) => {
    const newBalance =
      whoPays === "You"
        ? parseInt(bill) - parseInt(myExpense)
        : parseInt(friendExpense) - parseInt(bill);

    if (newBalance >= 0 || newBalance < 0) {
      setFriends(
        friends.map((friend) => {
          if (friend.id === id) {
            return { ...friend, balance: newBalance + friend.balance };
          }

          return friend;
        })
      );

      return setSelect({
        ...select,
        id: null,
        name: "",
        isOpenIndex: -1,
      });
    }

    return;
  };

  const handleUpdateFriends = (name, image, id) => {
    if (image && name) {
      setFriends((friends) => [
        ...friends,
        { id, name, image: `${image}?u=${id}`, balance: 0 },
      ]);

      return setIsAddFriend(false);
    }

    return;
  };

  return (
    <section className="app">
      <FriendList
        onSelect={handleSelect}
        selectFriend={select}
        friends={friends}
        handleUpdateFriends={handleUpdateFriends}
        isAddFriend={isAddFriend}
        setIsAddFriend={setIsAddFriend}
      />
      {select.isOpenIndex > -1 && (
        <SplitBill
          id={select.id}
          name={select.name}
          onSetBalance={handleBalanceUpdate}
          key={select.id}
        />
      )}
    </section>
  );
}

export default App;
