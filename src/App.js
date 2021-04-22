import React, { Component } from 'react';
import Client from './data/apiClient.json'; //fetching json data
import ClientStatus from './Components/ClientStatus';
import ClientCreds from './Components/ClientCreds';
import  UserIntraction from './Components/UserIntraction';
import './App.css';


class App extends Component {

  state = {
    clients:[],
    value:'show'
  }

  //toggle visiblity on select
  divstatus = (e) =>{
    this.setState({value: e.target.value});
  }

  //test path to show test
  handleClick(){
   // <Redirect to='/Components/UserIntraction' />
  }
  

  //Showing output with render function
  render() {
    var [{clientId , profile : {displayName}}] = Client; //Using distructing operator

    return (
      <div className="App container mt-5 mb-5 px-4">
        {
          Client.map((client,index) =>
            <div key={index}>
              <ClientStatus name={displayName} divstatus={this.divstatus} />
              <ClientCreds visible={this.state.value} clientId={clientId} clientArray={client}  />

              <button className="mt-5">Add secret in new page</button>
              <UserIntraction></UserIntraction>
            </div>        
        )}
      </div>
    );
  }
}

export default App;
