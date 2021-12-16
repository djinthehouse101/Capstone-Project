import './App.css';

import {Home} from './Components/Home';
import {Department} from './Components/Department';
import {Employee} from './Components/Employee';
import {Navigation} from './Components/Navigation';
import StickyHeader from './Components/StickyHeader';

import {BrowserRouter, Route, Switch} from 'react-router-dom';

//Put Sticky Header here so it will be used on all webpages.
function App()
{
  return (
    <BrowserRouter>
    <div className="container">
     <StickyHeader/>
      <h3 className="m-3 d-flex justify-content-center">
        Employee Database
      </h3>
      <Navigation/>

      <Switch>
        <Route path='/'component={Home} exact/>
        <Route path='/department' component={Department}/>
        <Route path='/employee' component={Employee}/>
      </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
