import React, { useState, useContext, useEffect } from "react";
import ComicContext from "../../context/comic/comicContext";

const ComicForm = () => {
  const comicContext = useContext(ComicContext);

  const { addComic, updateComic, clearCurrent, current } = comicContext;

  useEffect(() => {
    if (current !== null) {
      setComic(current);
    } else {
      setComic({
        name: "",
        email: "",
        phone: "",
        type: "marvel"
      });
    }
  }, [comicContext, current]);

  const [comic, setComic] = useState({
    name: "",
    email: "",
    phone: "",
    type: "marvel"
  });

  const { name, email, phone, type } = comic;

  const onChange = e => setComic({ ...comic, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    if (current === null) {
      addComic(comic);
    } else {
      updateComic(comic);
    }
    setComic({
      name: "",
      email: "",
      phone: "",
      type: "marvel"
    });
  };

  const clearAll = () => {
    clearCurrent();
  };

  return (
    <form onSubmit={onSubmit}>
      <h2 className='text-dark'>{current ? "Edit Contact" : "Add Contact"}</h2>
      <input
        type='text'
        placeholder='Name...'
        name='name'
        value={name}
        onChange={onChange}
        required
      />
      <input
        type='email'
        placeholder='Email...'
        name='email'
        value={email}
        onChange={onChange}
      />
      <input
        type='text'
        placeholder='Phone...'
        name='phone'
        value={phone}
        onChange={onChange}
        required
      />
      <h5>Contact Type</h5>
      <input
        type='radio'
        name='type'
        value='personal'
        checked={type === "personal"}
        onChange={onChange}
      />
      Personal{" "}
      <input
        type='radio'
        name='type'
        value='professional'
        checked={type === "professional"}
        onChange={onChange}
      />
      Professional{" "}
      <input
        type='radio'
        name='type'
        value='other'
        checked={type === "other"}
        onChange={onChange}
      />
      Other
      <div>
        <input
          type='submit'
          value={current ? "Update Contact" : "Add Contact"}
          className='btn btn-dark btn-block'
        />
      </div>
      {current && (
        <div>
          <button className='btn btn-danger btn-block' onClick={clearAll}>
            Clear
          </button>
        </div>
      )}
    </form>
  );
};

export default ComicForm;
