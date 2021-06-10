import "./App.css";
import EthProvider from "./components/EthProvider";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="App">
      <NavBar />
      <EthProvider></EthProvider>
    </div>
  );
}

export default App;
