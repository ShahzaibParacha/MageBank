import "./MageBank.css";
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch,
} from "react-router-dom";
import Home from "./components/home.component";
import ImagesView from "./components/imagesview.component";
import ImageView from "./components/imageview.component";
import Error from "./components/error.component";
import About from "./components/about.component";
import Navbar from "./components/navbar.component";
import Add from "./components/add.component";


const MageBank = () => {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/images" exact component={ImagesView} />
        <Route path="/image/:id" exact component={ImageView} />
        <Route path="/about" exact component={About} />
        <Route path="/add" exact component={Add} />
        <Route path="/404" exact component={Error} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
};

export default MageBank;
