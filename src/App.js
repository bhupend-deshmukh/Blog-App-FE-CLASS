import React, { Component } from "react";
import { Login } from "./components/login";
import "./App.css";
import Signup from "./components/signup";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Blogs from "./components/blogs";
import Model from "./components/model";
import Updatemodel from "./components/updateModel";
export default class App extends Component {
  render() {
    return (
      <div className="APP ">
        <Router>
          <Routes>
            <Route exact path="/" element={<Blogs />} />
            <Route exact path="/signup" element={<Signup />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/model" element={<Model />} />
            <Route exact path="/updatemodel/:id" element={<Updatemodel/>}/>
          </Routes>
        </Router>
      </div>
    );
  }
}
