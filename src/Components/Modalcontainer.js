import React, { Component } from 'react';
import { Input, FormGroup, Label, Modal, ModalHeader, ModalBody, ModalFooter, Button } from 'reactstrap';
import { nanoid } from 'nanoid'
import Client from '../data/apiClient.json';

class ModalContainer extends Component {
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
    return (
      <div>
        <Button color="primary" className="btn-primary bold px-4 mt-4 addSecret" size="md" onClick={this.toggleAddnewSecret.bind(this)}> Add secret</Button>
        <Modal isOpen={this.state.addnewSecret} toggle={this.toggleAddnewSecret.bind(this)}>
            <ModalHeader toggle={this.toggleAddnewSecret.bind(this)}>Add client secret</ModalHeader>
            <ModalBody>
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

            </ModalBody>
            <ModalFooter>
                <Button color="primary" className="pull-left" onClick={this.addSecret.bind(this)}>Add client secret</Button>{' '}
            </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default ModalContainer;
