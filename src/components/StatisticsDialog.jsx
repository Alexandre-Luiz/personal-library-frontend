import { Button, Dialog, DialogActions, DialogContent } from '@mui/material';
import React from 'react';

import BooksReadDoughnutChart from './charts/BooksReadChart';
import BooksRatingBarLineChart from './charts/BooksRatingChart';
import BooksValuesBarLineChart from './charts/BooksValueChart';

export default function StatisticsDialog({ handleStatsClose, open, allUserBooks }) {
  const totalPagesRead = allUserBooks.reduce((total, book) => total + book.pagesRead, 0);
  const totalValue = allUserBooks.reduce((total, book) => total + parseFloat(book.value), 0);
  const averageRating =
    allUserBooks.reduce((total, book) => total + book.rating, 0) / allUserBooks.length;
  const averageValue =
    allUserBooks.reduce((total, book) => total + +book.value, 0) / allUserBooks.length;
  const totalBooksFinished = allUserBooks.filter(
    (book) => book.pagesRead === book.totalPages
  ).length;
  const totalBooksFavorited = allUserBooks.filter((book) => book.favorite).length;

  return (
    <Dialog maxWidth={'lg'} fullWidth open={open} onClose={handleStatsClose}>
      <div className="flex flex-col items-center justify-around sm:flex-row sm:justify-center h-full">
        {/* Content Div */}
        <div className="flex flex-col text-center p-2 w-3/4 ">
          <DialogContent className="flex flex-col justify-around">
            <div className="flex flex-col">
              <div className="numbers flex justify-center flex-wrap gap-2 py-2">
                <div className="flex flex-col align-top justify-center border-2 p-4 w-full h-26 space-y-1 sm:w-1/2 md:w-1/3">
                  <p className="border-b-2">Books in the collection</p>
                  <p>{allUserBooks.length}</p>
                </div>
                <div className="flex flex-col align-top justify-center border-2 p-4 w-full h-26 space-y-1 sm:w-1/2 md:w-1/3">
                  <p className="border-b-2">Books Favorited</p>
                  <p>
                    {totalBooksFavorited} (
                    {Math.round((totalBooksFavorited / allUserBooks.length) * 100)}%)
                  </p>
                </div>
                <div className="flex flex-col align-top justify-center border-2 p-4 w-full h-26 space-y-1 sm:w-1/2 md:w-1/3">
                  <p className="border-b-2">Finished books</p>
                  <p>{totalBooksFinished}</p>
                </div>
                <div className="flex flex-col align-top justify-center border-2 p-4 w-full h-26 space-y-1 sm:w-1/2 md:w-1/3">
                  <p className="border-b-2 ">Total Pages Read</p>
                  <p>{totalPagesRead}</p>
                </div>
                <div className="flex flex-col align-top justify-center border-2 p-4 w-full h-26 space-y-1 sm:w-1/2 md:w-1/3">
                  <p className="border-b-2 ">Collection Value:</p>
                  <p> $ {totalValue}</p>
                </div>
                <div className="flex flex-col align-top justify-center border-2 p-4 w-full h-26 space-y-1 sm:w-1/2 md:w-1/3">
                  <p className="border-b-2">Average value</p>
                  <p className="">{averageValue.toFixed(2)}</p>
                </div>
                <div className="flex flex-col align-top justify-center border-2 p-4 w-full h-26 space-y-1 sm:w-1/2 md:w-1/3">
                  <p className="border-b-2">Average Rating</p>
                  <p>{averageRating.toFixed(2)}</p>
                </div>
              </div>
              <div className="flex flex-col justify-center">
                <div className="border-2 p-2 my-2 w-full h-1/3">
                  <BooksValuesBarLineChart books={allUserBooks} averageValue={averageValue} />
                </div>
                <div className="border-2 p-2 my-2 w-full h-1/3">
                  <BooksRatingBarLineChart books={allUserBooks} averageRating={averageRating} />
                </div>
                <div className=" border-2 p-2 my-2 w-1/2 mx-auto">
                  <BooksReadDoughnutChart
                    totalBooksRead={totalBooksFinished}
                    totalBooks={allUserBooks.length}
                  />
                </div>
              </div>
            </div>
          </DialogContent>
        </div>
      </div>
      <DialogActions>
        <Button type="button" onClick={handleStatsClose}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}
