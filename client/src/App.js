import './App.css';
import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      id: "",
      uid: "",
      username: "",
      email: "",
      name: "",
      website: "",
      uemail: "",
      uusername: "",
      upassword: "",
      status: "",
      tone: "",
      pyTone: ""
    }
    this.handleGetId = this.handleGetId.bind(this);
    this.handleGetUser = this.handleGetUser.bind(this);
    this.handlePostUser = this.handlePostUser.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleGetFlaskServer = this.handleGetFlaskServer.bind(this);
  }

  async handleGetFlaskServer(){
    await axios.get(`http://localhost:5000/tone`)
    .then(response => {
      console.log(response);
      this.setState({pyTone: response.data})

    })
  }

  async handleGetId(){
    await axios.get(`http://localhost:3001/id`)
    .then(response => {
      console.log(response.data);
      this.setState({id: response.data.id});
    })
    .catch(err=>{
      console.log(err);
    }) 
  }

  async handleGetUser(){
   
    await axios.get(`http://localhost:3001/user`)
    .then(response => {
      console.log(response)
      let user = response.data.user
      this.setState({
        uid: user.id,
        username: user.username,
        email: user.email,
        name: user.name,
        website: user.website,
        tone: user.tone
      });
    })
    .catch(err=>{
      console.log(err);
    }) 
  }

  async handlePostUser(event){
    if(!this.state.uemail || !this.state.uusername || !this.state.upassword) return this.setState({status: "Please Complete All Fields"});

    await axios.post(`http://localhost:3001/user`, {
     
        username: this.state.uusername,
        email: this.state.uemail,
        Password: this.state.upassword
    
    })
    .then(response => {
      this.setState({status: response.data.message})
      console.log(response);

    })
    .catch(err=>{
      console.log(err);
    }) 
  }
  
  handleChange(event) {
    this.setState({ [event.target.name]: event.target.value });
  }

  render (){
    return(
    <div className="App">
      <header className="App-header">
       <h3 >Finn.ai Code Challenge - Arvind Dhindsa</h3>
      </header>
      <h1>Express</h1>
          <div className="row">
           
            <div className="col-4">
              <button onClick={this.handleGetId} type="button" className="btn btn-primary">Get User ID</button>
              <p>{this.state.id ? "ID:" : ""}   {this.state.id}</p>
            </div>
            <div className="col-4">
              <button onClick={this.handleGetUser} type="button" className="btn btn-primary">Get User</button>
              <p>{this.state.uid ? "ID:" : ""}   {this.state.uid}</p>
              <p>{this.state.username ? "Username:" : ""}   {this.state.username}</p>
              <p>{this.state.email ? "Email:" : ""}   {this.state.email}</p>
              <p>{this.state.name ? "Name:" : ""}   {this.state.name}</p>
              <p>{this.state.website ? "Website:" : ""}   {this.state.website}</p>
              <p>{this.state.tone ? "Tone:" : ""}   {this.state.tone}</p>

            </div>
            <div className="col-4">
              <button onClick={this.handlePostUser} className="btn btn-primary mb-2">Post User</button> <br/>
              <input className="mb-2" type="text" name="uemail" onChange={this.handleChange} placeholder="Enter Email" /><br/>
              <input className="mb-2" type="text" name="uusername" onChange={this.handleChange}  placeholder="Enter Username" /> <br/>
              <input className="mb-2" type="text" name="upassword" onChange={this.handleChange} placeholder="Enter Password" /> <br/>
              <p>{this.state.status}</p>
            </div>
          </div>

      <h1>Flask</h1>
        <div className="row">
          <div className="col-4">
            <button onClick={this.handleGetFlaskServer} type="button" className="btn btn-primary">Get User Tone</button>
            <p>{this.state.pyTone ? "Tone:" : ""}   {this.state.pyTone}</p>
          </div>
        </div>
    </div>
    )
   }
}

export default App;
