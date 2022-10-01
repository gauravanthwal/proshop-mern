import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const SearchBox = () => {
  const [keyword, setKeyword] = useState("");

  const navigate = useNavigate();

  const submitHandler = (e) => {
    e.preventDefault();

    if (keyword.trim()) {
      navigate(`/search/${keyword}`);
    } else {
      navigate(`/`);
    }
  };

  return (
    <Form onSubmit={submitHandler} className="search-form">
      <input
        type="text"
        value={keyword}
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products..."
        className="search-input"
      />
      <button className="p-2 btn-sm d-inline-block">
        <i className="fa-solid fa-magnifying-glass"></i>
      </button>
    </Form>
  );
};

export default SearchBox;
