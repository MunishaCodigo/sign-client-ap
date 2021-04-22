import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import { FaTrash } from "react-icons/fa";
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Table, Button } from 'reactstrap';

class App extends Component {

  state = {
    clients:[],
    clientSecrets:
      {
        "name": "",
        "secretId": "",
        "type": "SharedSecret"
      },
    newBookModal: false,
    value:'show'
  }
  componentWillMount() {
    this._renderClient();
  }
  toggleNewBookModal() {
    this.setState({
      newBookModal: ! this.state.newBookModal
    });
  }
  addBook() {

    axios.post('http://localhost:3000/apiClient',this.state.clientSecrets ).then((response) => {
      const [{clientSecrets}] = this.state.clients;
      console.log(clientSecrets);
      clientSecrets.push(response.data);
      this.setState({ clientSecrets,newBookModal: false});
      
    });
  }
  deleteBook(id,secretId) {
    axios.delete('http://localhost:3000/apiClient/' + id+secretId).then((response) => {
      this._renderClient(); //update data after deletion
    });
  }
  _renderClient() {
    axios.get('http://localhost:3000/apiClient/').then((response) => {
      this.setState({
        clients: response.data
      })
    });
  }
  //set the state value based on select option value
  divstatus = (e) =>{
      this.setState({value: e.target.value});
      console.log(e.target.value);
   }
  render() {
    return (
      <div>
      {this.state.clients.map((client,index) =>
      <div className="App container mt-5" key={index}>
        <div className="staus">
            <h3>{client.profile.displayName}</h3>
            <h5 className="mt-4">Status</h5>
            <p>Below you can enable or disable the client. A disabled client can not be used until it is enabled again.</p>
            <select className="custom-select primary" onChange={this.divstatus} aria-label="Client status"> 
              <option value="show">Client enabled</option>
              <option value="hide">Client disabled</option>
            </select>
        </div>
        <div className={this.state.value}>
        
          <div className="client_id mt-4">
            <h5>Client ID</h5>
            
            <Input value={client.clientId} className="bg-dark text-white" readOnly/>
            
          </div>

          <div className="client_secrets mt-5">
            <h5>Client secrets</h5>
            <p>Secrets is used together with the Client ID when using our APIs. Below is a list of our current secrets.</p>
            {client.clientSecrets.map((sub,index)=>
                        <div className="secretBox" key={index}>

                        <h6>{sub.name}</h6>
                        <p>This secret will never expire</p>
                        <p>Type: SharedSecret</p>
                        <Button className="btn-light text-danger bold px-4" size="md" onClick={this.deleteBook.bind(this, sub.secretId)}><FaTrash/> Delete secret</Button>
                      </div>
            )}
          <Button color="primary" className="btn-primary bold px-4 mt-4" size="md" onClick={this.toggleNewBookModal.bind(this)}> Add secret</Button>
          </div>
        </div>
        </div>
        )}
      
      <Modal isOpen={this.state.newBookModal} toggle={this.toggleNewBookModal.bind(this)}>
        <ModalHeader toggle={this.toggleNewBookModal.bind(this)}>Add client secret</ModalHeader>
        <ModalBody>
          <FormGroup>
            <Label for="title">Name</Label>
            <Input id="title" value={this.state.clientSecrets.name} onChange={(e) => {
              let { clientSecrets } = this.state;

              clientSecrets.name = e.target.value;

              this.setState({ clientSecrets });
            }} />
          </FormGroup>
          <FormGroup>
            <Label for="rating">Rating</Label>
            <Input id="rating" value={this.state.clientSecrets.rating} onChange={(e) => {
              let { clientSecrets } = this.state;

              clientSecrets.secretId = e.target.value;

              this.setState({ clientSecrets });
            }} />
          </FormGroup>

        </ModalBody>
        <ModalFooter>
          <Button color="primary" className="pull-left" onClick={this.addBook.bind(this)}>Add client secret</Button>{' '}
        </ModalFooter>
      </Modal>

      </div>
    );
  }
}

export default App;
