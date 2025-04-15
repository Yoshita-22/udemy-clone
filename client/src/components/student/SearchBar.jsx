import React from 'react'
import { Button, Form, FormControl } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SearchBar = () => {
  const [inputSearch,setInputSearch] = useState("");
  const navigate  = useNavigate();
  const handleSearch = (e)=>{
    e.preventDefault();

    navigate("./course-list/"+inputSearch);
  }
  
  return (
    <div>
      <Form className='d-flex' onSubmit ={(e)=> handleSearch(e)}>
            <FormControl
              type="search"
              placeholder="Start Searching For Courses..."
              className="me-2 border-dark"
              aria-label="Search"
              onChange={(e)=>{console.log(e.target.key);setInputSearch(e.target.value)}} value ={inputSearch}
            />
            <Button style={{ backgroundColor: '#A435F0', borderColor: '#A435F0' }}>
              Search
            </Button>
          </Form>
    </div>
  )
}

export default SearchBar
