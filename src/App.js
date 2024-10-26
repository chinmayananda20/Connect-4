import "./App.css";
import { BrowserRouter as Router, Route ,Routes} from "react-router-dom";
import Home from './components/Home'
import TwoPlayer from "./components/TwoPlayer";
import Game from "./components/Game";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/twoPlayer" element={<TwoPlayer />} />
          <Route path="/game" element={<Game />} />

        </Routes>
      </Router>
    </>
  );
}

export default App;
