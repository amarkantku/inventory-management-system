import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import classNames from 'classnames/bind';
import {Button, Form} from 'semantic-ui-react';
import { updateBookCategory, editBookCategory } from '../../../actions/BookInventoryActions';

import styles from './Category.css';
let cx = classNames.bind(styles);

class EditCategory extends Component {
    state = {
        name: '',
        cat_id: '',
        error: false,
    };
    constructor(props){
        super(props);
        this.initComponent();   
    }
    initComponent() {
        const { match: { params } } = this.props;
        if (params && params.id) {
            this.props.editBookCategory(params);
            setTimeout(()=> {
                this.setState({
                    ...this.state,
                    name: this.props.editedBookCategory.name,
                    cat_id: this.props.editedBookCategory.cat_id
                })
            },0);
        }
    }
    
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
    
    handleSubmit = e => {
        e.preventDefault();
        const { history } = this.props;
        if (this.textInput.value.length > 0) {
            this.props.updateBookCategory({
                cat_id: this.state.cat_id,
                name: this.textInput.value
            });
            this.setError(false);
            history.push('/category');
        } else {
            this.setError(true);
        }
    };

   
    render() {
        return (
            <div className={cx('AddNewWrapper')}>
                <Form onSubmit={this.handleSubmit}>
                    <Form.Field>
                        <label>Edit the category name</label>
                        <input onKeyPress={this.validateInput} ref={element => this.textInput = element} defaultValue={this.state.name} type="text" placeholder='Enter the category name' />
                        {this.state.error && <p className={cx('error')}>Please enter category name (alphabetic characters) only. </p>}
                    </Form.Field>
                    
                    <Button disabled={this.state.error} primary type='submit'>Update</Button>
                </Form>
            </div>
        )
    }
}


const mapStateToProps = ({bookInventoryReducer: { editedBookCategory }}) => ({
    editedBookCategory
  });

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        editBookCategory,
        updateBookCategory,
    }, dispatch)
};

export default connect( mapStateToProps, mapDispatchToProps)(EditCategory);
  