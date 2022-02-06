import "./App.css";
import Body from "./components/Body/Body";
import Header from "./components/Header/Header";
import 'bootstrap/dist/css/bootstrap.min.css';
import alld from './components/Body/data';
import { useEffect } from "react";
import { unstable_renderSubtreeIntoContainer } from "react-dom";

function App() {



  return (
    <div className="App">
      
      <Header />
      <Body/>
    </div>
  );
}

export default App;
