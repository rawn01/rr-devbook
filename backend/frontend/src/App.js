import Landing from "./components/layouts/Landing";
import Navbar from "./components/layouts/Navbar";
// import Auth from "./components/auth/Auth";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import "./styles/App.css";
import store from "./store";
import { Provider } from "react-redux";
import Alert from "./components/layouts/Alert";

const App = () => {
  return (
    <Provider store={store}>
      <Router>
        <Navbar />
        <Route exact path="/" component={Landing} />
        <section className="container">
          <Alert />
          <Switch>
            <Route exact path="/login" component={Login} />
            <Route exact path="/register" component={Register} />
          </Switch>
        </section>
      </Router>
    </Provider>
  );
}

export default App;
