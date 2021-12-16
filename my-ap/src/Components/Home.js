import React, {Component} from 'react';

/**
 * This class is used to handle the creation of the Home page
 */
export class Home extends Component
{

    /**
     * Used to create the home page.
     * @returns the rendered home page.
     */
    render()
    {
        return(
            <div className="mt-5 d-flex justify-content-left" style = {{background:'black', color:'white'}}>
               This is the home page.
            </div>
        )
    }
}