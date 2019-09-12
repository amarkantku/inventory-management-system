import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Table, Button, Icon } from 'semantic-ui-react';
import classNames from 'classnames/bind';
import { deleteBookCategory, showBookTableByCategory } from '../../../actions/BookInventoryActions';

import styles from './Category.css';
let cx = classNames.bind(styles);
const { Header, Row, HeaderCell, Body, Cell } = Table;

class CategoryList extends Component {
  addNewBookCategory = (e) => {
    const { history } = this.props;
    history.push('/category/add');
  }

  deleteItem = (e, cat_id) => {
    this.props.deleteBookCategory({ cat_id });
  }

  showBookTable = (e) => {
    this.props.showBookTableByCategory({
      cat_id: e.currentTarget.dataset.categoryId
    });
  }

  renderBookTable = (bookCategory) => {
    console.log('geggege');
  const { id, books } = bookCategory;
    return (
      <div className={cx('catBookTable')}>
        <p className={cx('bookTableHeading')}>Book Table 
          <Link to={`/book/add?cat_id=${id}`}><Button floated='right' icon positive className={cx('right-flow')}><Icon name='plus circle' /> Add book</Button></Link> 
        </p>
        {(books.length > 0) ? (<Table>
          <Header>
          <Row className={cx('innerTableHeading')}>
            <HeaderCell className={cx('innerTableTh')}>S No</HeaderCell>
            <HeaderCell className={cx('innerTableTh')}>Name</HeaderCell>
            <HeaderCell className={cx('innerTableTh')}>Price</HeaderCell>
          </Row>
          </Header>
          <Body>
          {books && books.map((book, index) => {
            return (
              <Row key={book.id}>
                <Cell>{index+1}</Cell>
                <Cell className={cx('innerTableTd')}>{book.name}</Cell>
                <Cell className={cx('innerTableTd')}><span>&#8377;</span> {parseFloat(book.price).toFixed(2)}</Cell>
            </Row>
            );
          })}
          </Body>
        </Table>) : <p>No Book found</p>}
      </div>
    );
  }
  render() {
    const noOfRecord = this.props.bookCategories.length;
    return (
      <div className={cx('BookCategoryWrapper')}>
        <div className={cx('ActionHeader')}>
          <span className={cx('Heading')}>Book Category List</span>
          <Button floated='right' icon positive onClick={this.addNewBookCategory}>
            <Icon name='plus circle' /> Add Category
          </Button>
        </div>
        <div className={cx('BookCategoryTable')}>
          {noOfRecord > 0 && (<Table celled selectable color={'teal'}>
            <Header>
              <Row>
                <HeaderCell>S No.</HeaderCell>
                <HeaderCell>Name</HeaderCell>
                <HeaderCell>Count</HeaderCell>
                <HeaderCell></HeaderCell>
              </Row>
            </Header>
            <Body>
              { this.props.bookCategories.map((category, index) => {
                  return (
                    <Row key={category.id}>
                      <Cell className={cx('top')}>{index + 1 }</Cell>
                      <Cell className={cx('bookWrodWrap top')} >
                          <p data-category-id={category.id} onClick={category ? this.showBookTable : () => {}}>{category.name}</p>
                          {category && category.show && this.renderBookTable(category)}
                      </Cell>
                      <Cell className={cx('top')}>{category.count}</Cell>
                      <Cell className={cx('right top')}>
                        <Link to={`/category/edit/${category.id}`}><Button><Icon name='edit' /> Edit</Button></Link> 
                        <Button
                            color='red'
                            onClick={e =>
                                window.confirm("Are you sure you wish to delete this item?") &&
                                this.deleteItem(e, category.id)
                            }>
                            <Icon name='delete'/>Delete
                        </Button>
                      </Cell>
                    </Row>
                  );
                })}
            </Body>
          </Table>)}
          {!noOfRecord && <p>No Record found.</p>}
        </div>
      </div>
    )
  }
}

const mapStateToProps = ({bookInventoryReducer: { booksCategoryDetails }}) => ({
  bookCategories: booksCategoryDetails.reduce((acc, category) => {
    return [...acc, {
      key: category.cat_id,
      id: category.cat_id,
      name: category.name,
      count: category.books.length,
      books: category.books,
      show: category.show
    }];
  },[])
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
      deleteBookCategory,
      showBookTableByCategory
  }, dispatch)
};


export default connect(mapStateToProps, mapDispatchToProps)(CategoryList);

