import Button from "./Button";

export default function FriendListItem({
  id,
  name,
  image,
  balance,
  isOpen,
  onSelect,
  index,
}) {
  return (
    <li>
      <img src={image} alt={name} />
      <div>
        <h3>{name}</h3>
        <p className={balance < 0 ? "red" : balance > 0 ? "green" : ""}>
          {balance < 0
            ? `You owe ${name} $${balance * -1}`
            : balance > 0
            ? `${name} owes you $${balance}`
            : `You and ${name} are even`}
        </p>
      </div>
      <Button onSelect={() => onSelect(id, name, index)}>
        {isOpen ? "Close" : "Select"}
      </Button>
    </li>
  );
}
