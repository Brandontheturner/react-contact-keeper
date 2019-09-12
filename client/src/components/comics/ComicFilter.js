import React, { useContext, useRef, useEffect } from "react";
import ComicContext from "../../context/comic/comicContext";

const ComicFilter = () => {
  const comicContext = useContext(ComicContext);
  const text = useRef("");

  const { filterComics, clearFilter, filtered } = comicContext;

  useEffect(() => {
    if (filtered === null) {
      text.current.value = "";
    }
  });

  const onChange = e => {
    if (text.current.value !== "") {
      filterComics(e.target.value);
    } else {
      clearFilter();
    }
  };

  return (
    <form>
      <input
        ref={text}
        type='text'
        placeholder='Filter Contacts...'
        onChange={onChange}
      />
    </form>
  );
};

export default ComicFilter;
