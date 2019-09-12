import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../components/App';
import { getBooksCategoryDetails } from '../actions/BookInventoryActions';

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        getBooksCategoryDetails
    }, dispatch)
};

const AppContainer = connect(null, mapDispatchToProps)(App);
export default AppContainer;
