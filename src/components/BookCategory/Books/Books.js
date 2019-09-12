import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import {Button, Form, Select} from 'semantic-ui-react';
import queryString from 'query-string';
import styles from './Books.css';
import { addBook } from '../../../actions/BookInventoryActions';

let cx = classNames.bind(styles);

class Books extends Component {
  state = {
    name: '',
    price: '',
    cat_id: '',
  }
  componentDidMount() {
    const qString = queryString.parse(this.props.location.search);
    this.setState({ cat_id: qString.cat_id });
  }

  onChange = (event) => {
    const { target: { name, value } } = event;
    this.setState({ [name]: value })
  }
  handleChange = (event, { name, value }) => {
    this.setState({ [name]: value })
  }

  
  handleSubmit = event => {
    event.preventDefault();
    const { history } = this.props;
    this.props.addBook(this.state);
    history.push('/category');
  };

  checkOnlyNumeric = event => {
    this.textInput.value = this.textInput.value.replace(/[^0-9\\.]/g,'');
    if ((event.which !== 46 || this.textInput.value.indexOf('.') !== -1) && (event.which < 48 || event.which > 57)) {
      event.preventDefault();
    }
  }

  checkOnlyText = event => {
    let inputValue = event.charCode;
    if(!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)){
        event.preventDefault();
    }
}

  render() {
    const {name, price, cat_id } =  this.state;
    const { bookCategories} = this.props;
    return (
      <div className={cx('AddNewWrapper')}>
          <Form onSubmit={this.handleSubmit}>
              <Form.Field>
                  <label>Book name</label>
                  <input required onKeyPress={this.checkOnlyText} defaultValue={name} name='name' onChange={this.onChange} type="text" placeholder='Enter book name' />
              </Form.Field>
              <Form.Field>
                  <label>Book Price</label>
                  <input required ref={element => this.textInput = element} onKeyPress={this.checkOnlyNumeric} defaultValue={price} name='price' onChange={this.onChange} type="text" placeholder='Enter book price' />
              </Form.Field>
              <Form.Field>
                <label>Book category</label>
                <Select disabled name='cat_id' onChange={this.handleChange} value={cat_id} placeholder='Select book category' options={bookCategories} />
              </Form.Field>
              <Button primary type='submit'>Submit</Button>
          </Form>
      </div>
  )
  }
}


const mapStateToProps = ({bookInventoryReducer: { booksCategoryDetails }}) => ({
  bookCategories: booksCategoryDetails.reduce((acc, category) => {
    return [...acc, {
      key: category.cat_id,
      value: category.cat_id,
      text: category.name,
    }];
  },[])
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ addBook }, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Books);
