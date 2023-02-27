import "./App.scss";
import React, { Component, useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/Login.jsx";
import Navbar from "./components/Navbar";
import { Provider } from "react-redux";
import store, { persistor } from "./store/store";
import Dashboard from "./pages/Dashboard";
import { PersistGate } from "redux-persist/integration/react";
import ChatsPage from "./pages/ChatsPage";
import Protected from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import Blogs from "./pages/Blogs";
import FixedNav from "./components/FixedNav";

function App() {
  // let isLogin = localStorage.getItem("auth");
  const [isLogin, setIsLogin] = useState(localStorage.getItem("auth"));

  return (
    <>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Router>
            <Navbar />

            <Routes>
              <Route
                exact
                path="/"
                element={isLogin ? <Navigate to="/dashboard" /> : <Login />}
              />
              <Route element={<Protected />}>
                {/* <Protected path="/dashboard" element={<Dashboard />} /> */}
                <Route exact path="/dashboard" element={<Dashboard />} />
                <Route exact path="/chats" element={<ChatsPage />} />
                <Route exact path="/profile" element={<Profile />} />
                <Route exact path="/blogs" element={<Blogs />} />
              </Route>
            </Routes>
            <FixedNav />
          </Router>
        </PersistGate>
      </Provider>
    </>
  );
}

export default App;
