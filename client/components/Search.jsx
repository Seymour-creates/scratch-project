
import React, { useState } from 'react';
import SearchResults from './SearchResults.jsx';

export default Search = () => {
  const [searchBar,setSearchBar] = useState('')
  handleSearch = (e) => {
    setSearchBar(e.target.value)
  }

  const getBooks = async () => {
    const retreiveBooks = await fetch('/api/'+searchBar,{
      method: 'GET'
    })
    console.log(retreiveBooks)
  }

  return (
  <div className='searchBar'>
    <form 
      name='bookSearch' 
      onSubmit={getBooks}>
      <input type='text' onChange={(e)=>handleSearch(e)} value={searchBar}></input>
      <input type='submit' value='Search'></input>
    </form>
  </div>
  )
};
