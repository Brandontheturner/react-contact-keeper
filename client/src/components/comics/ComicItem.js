import React, { useContext } from "react";
import PropTypes from "prop-types";
import ComicContext from "../../context/comic/comicContext";

const ComicItem = ({ comic }) => {
  const comicContext = useContext(ComicContext);
  const { deleteComic, setCurrent, clearCurrent } = comicContext;

  const { _id, name, email, phone, type } = comic;

  const onDelete = () => {
    deleteComic(_id);
    clearCurrent();
  };
  return (
    <div className='card bg-light'>
      <h3 className='text-dark text-left'>
        {name}{" "}
        <span
          style={{ float: "right" }}
          className={
            "badge" + (type === "marvel" ? "badge-success" : "badge-primary")
          }
        >
          {type.charAt(0).toUpperCase() + type.slice(1)}
        </span>{" "}
      </h3>
      <ul className='list'>
        {email && (
          <li>
            <i className='fas fa-book'></i> {email}
          </li>
        )}
        {phone && (
          <li>
            <i className='fas fa-phone'></i> {phone}
          </li>
        )}
      </ul>
      <p>
        <button
          className='btn btn-dark btn-sm'
          onClick={() => setCurrent(comic)}
        >
          Edit
        </button>
        <button className='btn btn-danger btn-sm' onClick={onDelete}>
          Delete
        </button>
      </p>
    </div>
  );
};

ComicItem.propTypes = {
  comic: PropTypes.object.isRequired
};

export default ComicItem;
