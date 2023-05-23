import { Route, useLocation } from 'react-router-dom/cjs/react-router-dom.min';
import './App.css';
import {Home, Landing, Detail, Form} from "./views"
import NavBar from './components/NavBar/NavBar';

function App() {

 const location = useLocation();

  return (
    <div className="App">
      {location.pathname !== "/" && <NavBar />}
      <Route exact path="/">
      <Landing/>
      </Route>

      <Route path="/detail/:id">
      <Detail/>
      </Route>
      <Route path="/Form">
      <Form/>
      </Route>

      <Route path="/home">
      <Home/>
      </Route>
    </div>
  );
}

export default App;
