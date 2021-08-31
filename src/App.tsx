import * as React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import { AuthContextProvider } from "./config/AuthContext";
import { Home } from "./pages/Home";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";

function App() {
 
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/signup" component={Signup} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/" component={Home} />
          <Redirect from="*" to="/" />
        </Switch>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
