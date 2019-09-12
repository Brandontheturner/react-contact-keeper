import React, { Fragment, useContext, useEffect } from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import ComicItem from "./ComicItem";
import Spinner from "../layout/Spinner";
import ComicContext from "../../context/comic/comicContext";

const Comics = () => {
  //initialize context
  //access to any state or method/actions associated with comic Context
  const comicContext = useContext(ComicContext);

  const { comics, filtered, getComics, loading } = comicContext;

  useEffect(() => {
    getComics();
    //eslint-disable-next-line
  }, []);

  if (comics !== null && comics.length === 0 && !loading) {
    return <h4>Please add your Contacts..</h4>;
  }

  return (
    <Fragment>
      {comics !== null && !loading ? (
        <TransitionGroup>
          {filtered !== null
            ? filtered.map(comic => (
                <CSSTransition key={comic._id} timeout={500} classNames='item'>
                  <ComicItem comic={comic} />
                </CSSTransition>
              ))
            : comics.map(comic => (
                <CSSTransition key={comic._id} timeout={500} classNames='item'>
                  <ComicItem key={comic.id} comic={comic} />
                </CSSTransition>
              ))}
        </TransitionGroup>
      ) : (
        <Spinner />
      )}
    </Fragment>
  );
};

export default Comics;
