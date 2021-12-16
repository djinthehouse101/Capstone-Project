import React, { Component } from "react";

export default class Sticky extends Component
{
  
  //Try and get the sticky to work, if not you are allowed to make code that randomize the numbers for teh sticky headers.
  //For context to buildertrend use the information from their website and talk about why they originally wanted the sticky header.
  //The context of the app was to use it in development 
  //Typedoc for react instead of doxygen
  
  constructor(props)
  {
    super(props);
    this.state = { sticky: [], ART: 0, DatabaseCalls: 0, DatabaseTime: 0};
  }
  
  refreshList()
  {
    const min = 1;
    const max = 100;
    const randART = Math.round(min + Math.random() * (max - min));
    const randDC = Math.round(min + Math.random() * (max - min));
    const randDT = Math.round(min + Math.random() * (max - min));
    this.setState({ ART: this.state.ART + randART, DatabaseCalls: this.state.DatabaseCalls + randDC, DatabaseTime: this.state.DatabaseTime + randDT} );
}

componentDidMount()
{
  this.refreshList();
}

  render()
  {
    return (
      <div style = {{background:'black', color:'white'}}>
        ART: <span>{this.state.ART}</span>&emsp;&emsp;
        Database Calls: # <span>{this.state.DatabaseCalls}</span>&emsp;&emsp;
        Database Time: <span>{this.state.DatabaseTime}</span> miliseconds   
      </div>
    );
  }
}