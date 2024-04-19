import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React from 'react';
import RatingStars from './RatingStars';
import BookProgressBar from './BookProgressBar';

export default function BookDetails({ book, handleDetailsClose, open }) {
  return (
    <Dialog maxWidth={'lg'} fullWidth open={open} onClose={handleDetailsClose}>
      <div className="flex flex-col items-center justify-around sm:flex-row sm:justify-center h-full">
        {/* Image div */}
        <div className="flex items-center w-2/5">
          <img
            src={`/bookCovers/${book.imageFileName}`}
            alt=""
            className="flex justify-center object-contain max-w-full max-h-full p-2"
          />
        </div>
        {/* Content Div */}
        <div className="flex flex-col text-center p-2 w-full  md:w-3/5">
          <div className="border-b-2 bor ">
            <h1 className=" text-3xl font-bold">{book.name}</h1>
            <h3 className="mb-2">{book.author}</h3>
          </div>
          <DialogContent className="text-left flex flex-col justify-around">
            <div className="flex text-justify overflow-y-auto max-h-64 mb-4">
              {book.description}
            </div>
            <div className="text-justify mb-2">
              <strong>Publisher: </strong>
              {book.publisher}
            </div>
            <div className="text-justify mb-2">
              <strong>Year: </strong>
              {book.year}
            </div>
            <div className="text-justify mb-2">
              <strong>Value: </strong> $ {book.value}
            </div>
            <div className="text-justify mb-2">
              <strong>Comments: </strong>
              {book.comments}
            </div>
            <div className="flex flex-col justify-center items-center py-4 border-2 rounded-md">
              <RatingStars rating={book.rating} />
              <BookProgressBar totalPages={book.totalPages} pagesRead={book.pagesRead} />
            </div>
          </DialogContent>
        </div>
      </div>
      <DialogActions>
        <Button type="button" onClick={handleDetailsClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
