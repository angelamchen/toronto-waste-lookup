import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResult from './SearchResult';
import Search from './Search';

class App extends Component {
  twlData = {};
  state = {
    lookupResult: [],
    favourites: []
  };

  // api call to take data from toronto waste lookup
  componentDidMount() {
    const url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";

    fetch(url)
      .then(dataResult => dataResult.json())
      .then(dataResult => {
        this.twlData = dataResult;
      });
  }

  // function to toggle favourite section
  toggleFavourite = title => {
    let index = this.twlData.findIndex((item) => {
      return item.title === title;
    });
    if (this.twlData[index].IsFavourite) {
      this.twlData[index].IsFavourite = false;
    }
    else {
      this.twlData[index].IsFavourite = true;
    }
    let result = this.twlData.filter((item) => { return item.IsFavourite; });
    this.setState({favourites: result});

  };

  // function for when user searches something
  handleSubmit = search => {
    let result = [];
    if (search.searchKey !== "") {
      result = this.twlData.filter((item) => {
        return item.title.toLowerCase().indexOf(search.searchKey.toLowerCase()) !== -1;
      });
    }
    this.setState({ lookupResult: result });
  }

  render() {
    const { lookupResult } = this.state;
    const { favourites } = this.state;
    return (
      <div className="app">
      
        {/* App header */}
        <div className="App-header">
          Toronto Waste Lookup
        </div>

        <div className="container">

          {/* search bar component */}
          <Search handleSubmit={this.handleSubmit} />

          {/* list items component */}
          <SearchResult
            searchResult={lookupResult}
            toggleFavourite={this.toggleFavourite}
          />

          {/* favourites component */}
          <div className={`${favourites.length > 0 ? "visible" : "invisible"}`} ><h3 className="text-success">Favourites</h3></div>
      
          <SearchResult
            searchResult={favourites}
            toggleFavourite={this.toggleFavourite}
          />
        </div>
      </div>
    );
  }
}

export default App;
