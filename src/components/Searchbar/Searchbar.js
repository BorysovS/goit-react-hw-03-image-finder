import { Component } from 'react';
// import { Formik, Field, Form } from 'formik';

export default class SearchBar extends Component {
  state = {
    searchQuery: '',
  };

  handleOnChage = evt => {
    const query = evt.currentTarget.value;
    this.setState({ searchQuery: query.toLowerCase() });
  };

  handleOnSubmit = evt => {
    const { searchQuery } = this.state;
    evt.preventDefault();
    this.props.onSubmit(searchQuery);
    this.reset();
  };

  reset() {
    this.setState({ searchQuery: '' });
  }

  render() {
    return (
      <form onSubmit={this.handleOnSubmit}>
        <label htmlFor="searchQuery">
          Seacrh
          <input
            type="text"
            name="searchQuery"
            onChange={this.handleOnChage}
            value={this.state.searchQuery}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </label>
        <button type="submit">Submit</button>
      </form>
    );
  }
}
