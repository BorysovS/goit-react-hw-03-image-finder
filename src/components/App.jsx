import { Component } from 'react';
import { GlobalStyle } from './GlobalStyle';
import { Layout } from './Layout/Layout';
import  SearchBar from './Searchbar/Searchbar';
// import { searchQueryApi } from './ServiceApi/ServiceApi';
import { ImageGallery } from './ImageGallery/ImageGllery';
import { Toaster } from 'react-hot-toast';


export class App extends Component {
  state = { 
    query: '',
    page: 1
  };


  searchFormSubmit = searchQuery => {
    this.setState({query: searchQuery})
  };


  render() {
    const { query } = this.state
    return (
      <Layout>
        <SearchBar onSubmit={this.searchFormSubmit} />
        <ImageGallery value={query} />
        <GlobalStyle />
        <Toaster
  position="top-center"
  reverseOrder={false}
  gutter={8} />
      </Layout>
    );
  }
};


