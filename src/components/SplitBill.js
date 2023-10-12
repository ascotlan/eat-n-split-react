import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

export default function SplitBill({ id, name, onSetBalance }) {
  const [bill, setBill] = useState("");
  const [expense, setExpense] = useState({ me: "", friend: "" });
  const [whoPays, setWhoPays] = useState("You");

  const handleMyExpense = (event) => {
    const num = parseInt(event.target.value) || 0;
    const myExpense = num <= parseInt(bill) ? num : parseInt(expense.me);
    const friendExpense = parseInt(bill) - myExpense;

    setExpense((current) => {
      return {
        ...current,
        me: myExpense.toString(),
        friend: friendExpense.toString(),
      };
    });
  };

  const handleBill = (event) => {
    const num = parseInt(event.target.value);
    const bill = !num || num < 0 ? "" : event.target.value;
    setBill(bill);
    setExpense({ ...expense, friend: bill });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSetBalance(id, expense.me, expense.friend, whoPays, bill);
  };

  return (
    <aside>
      <form onSubmit={handleSubmit} className="form-split-bill">
        <h2>split a bill with {name}</h2>
        <Input
          type="number"
          min={0}
          value={bill}
          onChange={handleBill}
          isReadOnly={false}
        >
          💰 Bill value
        </Input>
        <Input
          type="number"
          min={0}
          value={expense.me}
          onChange={handleMyExpense}
          isReadOnly={false}
        >
          🧍‍♂️ Your expense
        </Input>
        <Input
          type="number"
          min={0}
          value={expense.friend}
          onChange={() => null}
          isReadOnly={true}
        >
          👩🏻‍🤝‍🧑🏻{name}'s expense
        </Input>
        <label>🤑 Who is paying the bill</label>
        <select
          value={whoPays}
          onChange={(e) => setWhoPays(e.target.value)}
          className="select"
        >
          <option value="You">You</option>
          <option value={name}>{name}</option>
        </select>
        <Button onSelect={() => null}>Split bill</Button>
      </form>
    </aside>
  );
}
