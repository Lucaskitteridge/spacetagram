import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Feed from "./components/Feed";
import Navigation from "./components/Navigation";

function App() {
  return (
    <div className="App">
      <Navigation />
      <Feed />
    </div>
  );
}

export default App;
