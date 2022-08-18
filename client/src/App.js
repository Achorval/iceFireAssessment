// after other import statements
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from "./views/Home";
import Update from "./views/Update";

function App() {
  
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/update/:id" element={<Update />} />
      </Routes>
    </Router>
  );
}

export default App;
