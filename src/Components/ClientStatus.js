import React, { Component } from 'react';
class ClientStatus extends Component {
 



  render() {
  
    //getting data from main class
    var name = this.props.name;
    var divstatus = this.props.divstatus;

    return (
      <div className="staus">
         <h3 data-testid="clientName">{name}</h3>
         <h5 className="mt-4">Status</h5>
         <p>Below you can enable or disable the client. A disabled client can not be used until it is enabled again.</p>
         <select className="custom-select primary" onChange={divstatus} aria-label="Client status"> 
            <option value="show">Client enabled</option>
            <option value="hide">Client disabled</option>
         </select>
      </div>
    );
  }
}

export default ClientStatus;
