import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import SearchBar from './Searchbar/Searchbar';
import { searchQueryApi } from './ServiceApi/ServiceApi';


export class App extends Component {
  state = { 
    query: '',
    page: 1
  };

  componentDidUpdate(prevProps, prevState) {
    const { query, page } = this.state;
    if (prevState.query !== query) {
      searchQueryApi(query, page).then(pics => console.log(pics)).catch(err => err.message)
    
    }
  }

  searchFormSubmit = searchQuery => {
    this.setState({query: searchQuery})
  };


  render() {
    return (
      <Layout>
        <SearchBar onSubmit={this.searchFormSubmit} />
        <GlobalStyle />
      </Layout>
    );
  }
};
