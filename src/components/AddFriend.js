import Input from "./Input";
import Button from "./Button";
import { useState } from "react";

export default function AddFriend({ onAddFriend}) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48");

  const handleSubmit = (event) => {
    event.preventDefault();
    onAddFriend(name, image, crypto.randomUUID());
    setName("");
  };

  return (
    <form onSubmit={handleSubmit} className="form-add-friend">
      <Input value={name} onChange={(e) => setName(e.target.value)}>
        👬 Friend name
      </Input>
      <Input value={image} onChange={(e) => setImage(e.target.value)}>
        🌄 image URL
      </Input>
      <Button> Add</Button>
    </form>
  );
}
