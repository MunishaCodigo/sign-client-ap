import React, { Component } from 'react';
import Client from './data/apiClient.json'; //fetching json data
import ClientStatus from './Components/ClientStatus';
import ClientCreds from './Components/ClientCreds';
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

  //Showing output with render function
  render() {
    return (
      <div className="App container mt-5 mb-5 px-4">
        {
          Client.map((client,index) =>
            <div key={index}>
              <ClientStatus name={client.profile.displayName} divstatus={this.divstatus} />
              <ClientCreds visible={this.state.value} clientId={client.clientId} clientArray={client}  />
            </div>        
        )}
      </div>
    );
  }
}

export default App;
