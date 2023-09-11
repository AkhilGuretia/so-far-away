import { useState } from "react";

const App = () => {

  const [items, setItems] = useState([]);

  const handleAddItem = (newItem) => {
    setItems((items) => [...items, newItem]);
  }

  const handleDeleteItem = (id) => {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  const handleToggleItem = (id) => {
    setItems((items) => items.map((item) => (
      item.id === id ? { ...item, packed: (!item.packed) } : item)
    ));
  }

  return (
    <div className="app">
      <Logo />
      <Form OnAddItem={handleAddItem} />
      <PackagingList items={items} onDeleteItem={handleDeleteItem} onToggleItem={handleToggleItem} />
      <Stats items={items} />
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

const PackagingList = ({ items, onDeleteItem, onToggleItem }) => {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems;

  if (sortBy === "input") sortedItems = items;

  if (sortBy === "description") {
    sortedItems = items.slice().sort(
      (a, b) => a.description.localeCompare(b.description)
    );
  }

  if (sortBy === "packed") {
    sortedItems = items.slice().sort(
      (a, b) => Number(a.packed) - Number(b.packed)
    );
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item item={item} onDeleteItem={onDeleteItem} onToggleItem={onToggleItem} key={item.id} />
        ))}
      </ul>

      <div className="actions">
        <select value={sortBy} onChange={(event) => setSortBy(event.target.value)}>
          <option value="input">Sort By Input Order</option>
          <option value="description">Sort By Description</option>
          <option value="packed">Sort By Packing Status</option>
        </select>
      </div>
    </div>
  );
};

const Item = ({ item, onDeleteItem, onToggleItem }) => {
  return (
    <li key={item.id}>
      <input type="checkbox" value={item.packed} onChange={() => onToggleItem(item.id)} />
      <span style={item.packed ? { textDecoration: "line-through" } : {}}> {item.quantity} {item.description}</span>
      <button onClick={() => onDeleteItem(item.id)}>❌</button>
    </li>
  );
}

const Stats = ({ items }) => {

  if (!items.length) {
    return (
      <p className="stats">
        <em>Start adding some items to your packing list 🚀</em>
      </p>
    );
  }

  const numItems = items.length;
  const numPacked = items.filter(item => item.packed).length;
  const percentage = Math.round(numPacked / numItems * 100);

  return (
    <footer className="stats">
      <em>
        {percentage === 100 ? "You got everything! Let's roll ✈️" :
          `💼 You have ${numItems} items on your list, and you already packed ${numPacked} (${percentage}%)`}
      </em>
    </footer>
  );
};

export default App;