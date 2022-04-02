// import logo from './logo.svg';
import "./App.css";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Main from "./views/Main";
import Create from "./views/Create";
import Edit from "./views/Edit";
import Detail from "./views/Detail";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path="/" element={<Main/>}/>
          <Route path="/pets/new" element={<Create/>}/>
          <Route path="/pets/:id/edit" element={<Edit/>}/>
          <Route path="/pets/:id" element={<Detail/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
