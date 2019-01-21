import React, { Component } from 'react';

class Search extends Component {

    constructor(props) {
        super(props);

        /* initialize this.initialState into an object */
        this.initialState = {
            searchKey: ''
        };

        this.state = this.initialState;
    }

    /* event function: event are human interactions e.g. click... */
    handleChange = event => {
        this.setState({ searchKey: event.target.value }); //everytime state changes, it re renders. allows letters to send
        
        // When the search input field is cleared, the list of results should also be cleared function
        if (event.target.value === "") {
            this.props.handleSubmit({ searchKey: "" }); // often tested in JS. why ===? t
        }
    }
    /* handleSubmitForm -> better naming convention. q: why (event) */
    submitForm = (event) => {
        event.preventDefault();
        this.props.handleSubmit(this.state);
    }

    /* no =, rather () meaning it is a method, not a property */
    render() {
        const { searchKey } = this.state; /* object */

        return (
            <div className="pt-4">
                <form onSubmit={this.submitForm}>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="input-group input-group-lg">
                                <input type="text" name="searchKey" className="form-control" value={searchKey}
                                    onChange={this.handleChange} />
                                <button type="button" className="btn btn-success">
                                    <span className="glyphicon glyphicon-search" onClick={this.submitForm}></span>
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

export default Search;