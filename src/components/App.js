import React, { Component } from 'react';
import {
  Route,
  Switch,
  Redirect
} from 'react-router-dom';
import classNames from 'classnames/bind';
import CategoryList from '../components/BookCategory/Category/CategoryList'
import AddCategory from '../components/BookCategory/Category/AddCategory';
import EditCategory from '../components/BookCategory/Category/EditCategory';
import Books from '../components/BookCategory/Books/Books';
import NotFound from '../components/NotFound/NotFound'
import styles from './App.css';
let cx = classNames.bind(styles);

class App extends Component {
  constructor(props) {
    super(props);
    this.initComponent();
  }
  initComponent() {
    this.props.getBooksCategoryDetails();
  }
  render() {
    return (
      <div>
        <div className={cx('App')}>
          <h1>Book Inventory Management App.</h1>
        </div>
        <div className="App-intro">
            <Switch>
              <Route exact path="/"  component={CategoryList} />
              <Route exact path='/category' component={CategoryList}/>
              <Route path='/category/add' component={AddCategory}/>
              <Route path='/category/edit/:id' component={EditCategory}/>
              <Route exact path='/book/add' component={Books}/>
              <Route path='/book/edit/:id' component={Books}/>
              <Route path="*" component={NotFound} />
              <Redirect to="/" />
            </Switch>
        </div>
      </div>
    )
  }
}
export default App;