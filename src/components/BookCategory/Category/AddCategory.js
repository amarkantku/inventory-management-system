import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import {Button, Form} from 'semantic-ui-react';
import { addBookCategory } from '../../../actions/BookInventoryActions';

import styles from './Category.css';
let cx = classNames.bind(styles);

class AddCategory extends Component {
    state = {
        value: ''
    }
    
    handleSubmit = e => {
        e.preventDefault();
        const { history } = this.props;
        if (this.textInput.value.length > 0) {
            this.setState({ value: this.textInput.value }, () => {
                this.props.addBookCategory({ name: this.textInput.value });
                this.setError(true);
                history.push('/category');
            })
        } else {
            this.setError(true);
        }
    };

    validateInput = event => {
        let inputValue = event.charCode;
        if(!(inputValue >= 65 && inputValue <= 120) && (inputValue !== 32 && inputValue !== 0)){
            event.preventDefault();
            this.setError(true);
        } else {
            this.setError(false);
        }
    }
    setError = (status) => {
        this.setState({
            ...this.state,
            error: status
        })
    }

    render() {
        return (
            <div className={cx('AddNewWrapper')}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Enter the category name</label>
                        <input onKeyPress={this.validateInput} type="text" ref={element => this.textInput = element} placeholder='Enter the category name' />
                        {this.state.error && <p className={cx('error')}>Please enter category name (alphabetic characters) only. </p>}
                    </Form.Field>
                    <Button disabled={this.state.error} primary type='submit'>Submit</Button>
                </Form>
            </div>
        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        addBookCategory,
    }, dispatch)
};

export default connect( null, mapDispatchToProps)(AddCategory);
  