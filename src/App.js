import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import SearchResult from './SearchResult';
import Search from './Search';

class App extends Component {
  twlData = {};
  state = {
      lookupResult : [],
      favourites:[]
};

componentDidMount() {
  const url = "https://secure.toronto.ca/cc_sr_v1/data/swm_waste_wizard_APR?limit=1000";

  fetch(url)
      .then(result => result.json())
      .then(result => {
        this.twlData = result;
      });
}

toggleFavourite = index => {

      if (this.state.lookupResult[index].IsFavourite){
         this.state.lookupResult[index].IsFavourite = false;
         this.twlData.find((item)=> item.id ===  this.state.lookupResult[index].id).IsFavourite = false;
      }
      else{
         this.state.lookupResult[index].IsFavourite = true;
         this.twlData.find((item)=> item.id ===  this.state.lookupResult[index].id).IsFavourite = true;
      }
      let result = this.twlData.filter((item) => { return item.IsFavourite; });
      this.setState({favourites: result});
  };

  handleSubmit = search => {
    let  result = [];
    if (search.searchKey !== ""){
      result = this.twlData.filter((item)=>{
        return item.title.toLowerCase().indexOf(search.searchKey.toLowerCase()) !== -1;
      });
    }
    this.setState({lookupResult: result});
}

  render() {
    const {lookupResult} = this.state;
    const {favourites} = this.state;
    return (
      <div className="app">
        <div className="App-header">
          Toronto Waste Lookup
        </div>
        <div className="container">
        <Search  handleSubmit={this.handleSubmit} />
         
            <SearchResult 
              searchResult = {lookupResult} 
              toggleFavourite = {this.toggleFavourite} 
            />
            <div className={`${favourites.length>0? "visible":"invisible" }`} ><h3 className="text-success">Favourites</h3></div>
            <SearchResult 
              searchResult = {favourites} 
              toggleFavourite = {this.toggleFavourite} 
            />
         </div>
      </div>
    );
  }
}

export default App;
