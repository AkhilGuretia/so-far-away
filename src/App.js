const App = () => {
  return (
    <div className="app">
      <Logo />
      <Form />
      <List />
      <Stats />
    </div>
  );
}

const Logo = () => {
  return (
    <h1> 🌴 SO FAR AWAY 💼 </h1>
  );
};

const Form = () => {
  return (
    <div className="add-form">
      <h3>What do you need for your 😍 trip ?</h3>
    </div>
  );
};

const List = () => {
  return (
    <div className="list">
      List
    </div>
  );
};

const Stats = () => {
  return (
    <footer className="stats">
      <em>💼 You have X items on your list, and you already packed X (X%) </em>
    </footer>
  );
};

export default App;
