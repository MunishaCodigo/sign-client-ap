import React, { Component } from 'react';
import { Input, FormGroup, Label, Button } from 'reactstrap';
import { FaTrash } from "react-icons/fa";
import { nanoid } from 'nanoid';
import Client from '../data/apiClient.json';

class UserIntraction extends Component {
    state = {
      clients:[],
      clientSecrets:
        {
          "name": "",
          "secretId": nanoid(),
          "type" : "SharedSecret"
        },
      addnewSecret: false,
  }
  
  //Opens addsecret modal
  toggleAddnewSecret() {
  this.setState({
  addnewSecret: ! this.state.addnewSecret
  });
  }
  
  //add new secret from modal
  addSecret() {
  const [{clientSecrets}] = Client;
  this.setState((clientSecrets.push(this.state.clientSecrets),{addnewSecret: false,clientSecrets: {
      name: '',
      secretId: nanoid(),
      type : 'SharedSecret'
  }}));
  console.log(clientSecrets);
  }
  render() {

  const [{clientSecrets}] = Client;

  return (
      
    <div>
     <div className="client_secrets mt-5">
       <h5>Client secrets</h5>
       <p>Secrets is used together with the Client ID when using our APIs. Below is a list of our current secrets.</p>
       {
           clientSecrets.map((sub,index)=>
               <div className="secretBox" key={index}>
                   <h6>{sub.name}</h6>
                   <p>This secret will never expire</p>
                   <p>Type: {sub.type}</p>
                   <Button className="btn-light text-danger bold px-4" size="md" disabled><FaTrash/> Delete secret</Button>
               </div>
       )}
     </div>
    <FormGroup>
    <Label for="name">Name</Label>
    <Input id="name" data-testid="name" value={this.state.clientSecrets.name} onChange={(e) => {
        let { clientSecrets } = this.state;

            clientSecrets.name = e.target.value;

            this.setState({ clientSecrets });
        }}/>
</FormGroup>
<FormGroup>
    <h6>Secret expiration (optional)</h6>
    <Label className="switch">
    <Input type="checkbox" />
    <span className="slider round"></span>
    </Label>
    <p className="sm">Set expiration date</p>
</FormGroup>
<FormGroup className="mt-4">
    <h6>Client secret</h6>
    <Label for="secretId">The following secret will only be shown once, please copy it now</Label>
    <Input id="secretId" value={this.state.clientSecrets.secretId} onChange={(e) => {
         let { clientSecrets } = this.state;
                clientSecrets.secretId = e.target.value;
                this.setState({ clientSecrets });
            }} readOnly/>
</FormGroup>
<Button color="primary" className="pull-left" onClick={this.addSecret.bind(this)}>Add client secret</Button>
</div>
  );
}
}

export default UserIntraction ;