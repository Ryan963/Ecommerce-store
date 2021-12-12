import React, {Component} from 'react';
import { Route, Switch} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';
import Navbar from './components/Navbar'
import ProductList from './components/ProductList'
import Details from './components/Details'
import Cart from './components/Cart/Cart'
import Default from './components/Default'
import Modal from './components/Modal';

class App extends Component {
  render(){
    return (
      <>
        <Navbar/>
        <Switch>
          <Route path="/" exact><ProductList></ProductList></Route>
          <Route path="/details"><Details/></Route>
          <Route path="/cart"><Cart/></Route>
          <Route> <Default/></Route>
        </Switch>
        <Modal />
      </>
    );
  }
}

export default App;
