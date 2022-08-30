import axios from "axios";
import React, { Component } from "react";
import Swal from "sweetalert2";
import { Link, Navigate } from "react-router-dom";
import { reactLocalStorage } from "reactjs-localstorage";
export default class Blogs extends Component {
  state = { redirect: "", allData: [] ,likes:[]};
  user = reactLocalStorage.getObject("user");

  componentDidMount() {
    const user = reactLocalStorage.getObject("user");
    if (Object.keys(user).length == 0) {
      this.setState({ redirect: "/login" });
    }

    if (Object.keys(user).length > 0) {
      axios
        .get("http://localhost:5050/getAllpost", {
          headers: {
            "Content-Type": "application/json",
            token: user.token,
          },
        })
        .then((resp) => {
          console.log(resp.data);
          let data = resp.data.data;
          if (data.length > 0) {
            this.setState({ allData: data });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }

  deletePost = (post_id) => {
    const user = reactLocalStorage.getObject("user");

    axios
      .delete(`http://localhost:5050/deletePost/${post_id}`, {
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.status == "success") {
          let alldata = this.state.allData;
          alldata = alldata.filter((item) => item.id != post_id);
          this.setState({ allData: alldata });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  updatePost = (e) => {
    let post_id = e.target.id;
    const user = reactLocalStorage.getObject("user");

    axios
      .put(`http://localhost:5050/updatePost/${post_id}`, {
        headers: {
          "Content-Type": "application/json",
          token: user.token,
        },
      })
      .then((resp) => {
        console.log(resp.data);
        if (resp.data.status == "success") {
          window.location.reload();
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  like_function = (e) => {
    console.log('like_function is working.........');
    let p_id = e
    console.log(p_id)
    
  };

  render() {
    
    return (
      <div className="bg-slate-900 ">
        {this.state.redirect ? <Navigate to={this.state.redirect} /> : ""}
        <header className="text-gray-600 body-font">
          <div className=" mx-auto flex flex-wrap p-3 flex-col md:flex-row items-center justify-between fixed top-0 left-0 right-0 bg-slate-800">
            <div className="flex gap-6">
              <p className="text-2xl  font-mono text-white  cursor-pointer rounded-md ">
                Blog<span className="underline text-fuchsia-600">App</span>
              </p>
             
              <Link
                to="/model"
                className="px-4 pt-2 py-1 bg-slate-700 rounded-md text-white hover:bg-lime-700 "
              >
                + Create Blog
              </Link>
            </div>
            <div className="flex gap-4">
              <div className="flex bg-slate-700 px-2 py-1 rounded-lg">
                <img
                  className="w-10 rounded-3xl"
                  src="https://images.unsplash.com/photo-1619946794135-5bc917a27793?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                ></img>
                <h1 className="text-white mt-2 ml-2">
                  {this.user.first_name} {this.user.last_name}
                </h1>
              </div>
              <button onClick={() => {
                localStorage.clear();
                this.setState({ redirect: "/login" });
              }} className="text-white bg-slate-700 px-6 rounded-lg hover:bg-blue-500 text-bold text-lg">Logout</button>
            </div>
          </div>
        </header>
        <section className="text-gray-600 body-font">
          <div className="container px-5 py-24 mx-auto">
            <div className="flex flex-wrap -m-4">
              {this.state.allData.map((ele) => {
                // console.log(ele);
                let date = ele.created_at.split("T");
                let p_id = ele.id;
                return (
                  <div className="p-4 md:w-1/3">
                    <div className="h-full bg-gray-700 rounded-lg overflow-hidden">
                      
                      <div className="p-6">
                        <div className="flex justify-between">
                          <h1 className="title-font text-xl text-center font-medium text-white">
                            {ele.title}
                          </h1>
                          {this.user.id != ele.user_id ? (
                            ""
                          ) : (
                            <div>
                              <Link
                                to={"/updatemodel/" + p_id}
                                onClick={this.updatePost}
                              >
                                <button className="text-2xl hover:bg-blue-400 text-white hover:text-gray-800 px-2 pt-2 rounded-full">
                                  <ion-icon name="create"></ion-icon>
                                </button>
                              </Link>
                              <button
                                onClick={() => this.deletePost(p_id)}
                                className="deleted text-2xl hover:bg-red-700 hover:text-gray-800 text-white px-2 pt-2 rounded-full"
                              >
                                <ion-icon name="trash"></ion-icon>
                              </button>
                            </div>
                          )}
                        </div>
                        <p className="leading-relaxed mb-3 text-white">
                          {ele.description}
                        </p>
                        <div className="flex items-center flex-wrap justify-between ">
                          <button onClick={()=>{this.like_function(p_id)}}>
                            <ion-icon
                              name="heart-empty"
                              class="text-3xl text-slate-200  hover:text-rose-700"
                            ></ion-icon>
                            
                          </button>

                          <div>
                            <h2 className="text-white">
                              {ele.users.first_name} {ele.users.last_name}
                            </h2>
                            <h2 className="text-end text-white">{date[0]}</h2>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    );
  }
}
