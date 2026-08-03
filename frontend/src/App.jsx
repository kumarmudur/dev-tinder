import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";

import Body from "./pages/Body";
import Connections from "./pages/Connections";
import Feed from "./pages/Feed";
import Login from "./pages/Login";
import Premium from "./pages/Premium";
import Profile from "./pages/Profile";
import Requests from "./pages/Requests";
import appStore from "./utils/appStore";

function App() {
  return (
    <>
        <Provider store={appStore}>
            <Router basename="/">
                <Routes>
                    <Route path="/" element={<Body />} >
                        <Route path="/" element={<Feed />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/connections" element={<Connections />} />
                        <Route path="/requests" element={<Requests /> } />
                        <Route path="/premium" element={<Premium />} />
                    </Route>
                </Routes>
            </Router>
        </Provider>
    </>
  )
}

export default App
