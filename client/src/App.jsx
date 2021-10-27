import Topbar from "./components/topbar/Topbar";
import Homepage from "./pages/homepage/Homepage";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import Settings from "./pages/settings/Settings";
import About from "./pages/About/About";

import Single from "./pages/single/Single";
import Write from "./pages/write/Write";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { useSelector} from "react-redux"
import { useEffect } from "react";
import Edit from "./pages/Edit/Edit";

function App() {
  const userCredential = useSelector(state=>state.user.userCredential)

  useEffect(() => {
    localStorage.setItem("userCredential",JSON.stringify(userCredential))
  }, [userCredential])
  return (
    <Router>
      <Topbar />
      <Switch>
        <Route exact path="/">
          <Homepage />
        </Route>
        <Route path="/posts">
          <Homepage />
        </Route>
        <Route path="/register">
          {userCredential ? <Homepage /> : <Register />}
        </Route>
        <Route path="/login">{userCredential ? <Homepage /> : <Login />}</Route>
        <Route path="/post/:id">
          <Single />
        </Route>
        <Route path="/write">{userCredential ? <Write /> : <Login />}</Route>
        <Route path="/edit/:id"><Edit /></Route>

        <Route path="/settings">
          {userCredential ? <Settings /> : <Login />}
        </Route>
        
        <Route path="/about">
          {userCredential ? <About /> : <Login />}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
