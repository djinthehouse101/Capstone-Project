import React, { Component } from "react";

 /**
  * Class to create StickyHeader 
  */
export class StickyHeader extends Component
{
  /**
   * Constructor used to set up the StickyHeader class
   * @param {*} props 
   */
  constructor(props)
  {
    super(props);
    this.state = { sticky: [], ART: 0, DatabaseCalls: 0, DatabaseTime: 0};
  }
  
  /**
   * This method is used to refresh the StickyHeader and give it new data
   */
  refreshList()
  {
    const min = 1;
    const max = 100;
    const randART = Math.round(min + Math.random() * (max - min));
    const randDC = Math.round(min + Math.random() * (max - min));
    const randDT = Math.round(min + Math.random() * (max - min));
    this.setState({ ART: this.state.ART + randART, DatabaseCalls: this.state.DatabaseCalls + randDC, DatabaseTime: this.state.DatabaseTime + randDT} );
}

/**
 * Used to mount the data from refresh list.
 */
componentDidMount()
{
  this.refreshList();
}

/**
 * Used to create the StickyHeader on the webpage
 * @returns the rendered StickyHeader
 */
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