import { useState } from "react";

const App = () => {

  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems([...items, newItem]);
  }

  return (
    <div className="app">
      <Logo />
      <Form OnAddItem={handleAddItem} />
      <PackagingList items={items} />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return (
    <h1> 🌴 SO FAR AWAY 💼 </h1>
  );
};

const Form = ({ OnAddItem }) => {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!description) return;

    const newItem = {
      id: Date.now(),
      quantity,
      description,
      packed: false
    }

    OnAddItem(newItem);

    setQuantity(1);
    setDescription("");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your 😍 trip ?</h3>

      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((i) => (
          <option value={i} key={i}>{i}</option>
        ))}
      </select>

      <input type="text" placeholder="Item..." value={description}
        onChange={(e) => setDescription(e.target.value)} />

      <button>Add</button>
    </form>
  );
};

const PackagingList = ({ items }) => {
  return (
    <div className="list">
      <ul>
        {items.map((item) => (
          <Item item={item} key={item.id} />
        ))}
      </ul>
    </div>
  );
};

const Item = ({ item }) => {
  return (
    <li key={item.id}>
      <span> {item.quantity} {item.description}</span>
      <button>❌</button>
    </li>
  );
}

const Stats = () => {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%) </em>
    </footer>
  );
};

export default App;