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
  };

  const handleBalanceUpdate = (id, myExpense, friendExpense, whoPays, bill) => {
    const newBalance =
      whoPays === "You"
        ? parseInt(bill) - parseInt(myExpense)
        : parseInt(friendExpense) - parseInt(bill);

    if (newBalance>= 0 || newBalance < 0) {
      setFriends(
        friends.map((friend) => {
          if (friend.id === id) {
            return { ...friend, balance: newBalance + friend.balance };
          }

          return friend;
        })
      );

      setSelect({
        ...select,
        id: null,
        name: "",
        isOpenIndex: -1,
      });
    }
  };

  return (
    <section className="app">
      <FriendList
        onSelect={handleSelect}
        selectFriend={select}
        friends={friends}
      />
      {select.isOpenIndex > -1 && (
        <SplitBill
          id={select.id}
          name={select.name}
          onSetBalance={handleBalanceUpdate}
        />
      )}
    </section>
  );
}

export default App;
