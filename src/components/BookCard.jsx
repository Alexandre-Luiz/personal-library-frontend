import React, { useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  IconButton,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import RatingStars from './RatingStars';
import BookProgressBar from './BookProgressBar';
import BookDetails from './BookDetails';

export default function BookCard({ book, onDelete, onEdit }) {
  const [showDetailsScreen, setShowDetailsScreen] = useState(false);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [openConfirmDialogOpen, setOpenConfirmDialogOpen] = useState(false);

  function handleDetailsOpen() {
    setDetailsOpen(true);
    setShowDetailsScreen(!showDetailsScreen);
  }

  function handleDetailsClose() {
    setDetailsOpen(false);
    setShowDetailsScreen(!showDetailsScreen);
  }

  function handleEditIconClick() {
    if (onEdit) {
      onEdit(book);
    }
  }

  function handleDeleteIconClick() {
    setOpenConfirmDialogOpen(true);
  }

  // Checks if user confirmed deletion, if yes, proceed to delete
  function handleConfirmClose(confirmation) {
    if (confirmation) {
      if (onDelete) {
        onDelete(book.bookId);
      }
    }
    setOpenConfirmDialogOpen(false);
  }

  return (
    <div className="flex flex-col w-80 m-2 rounded-md border border-gray-300 shadow-lg align-top">
      <div className="flex justify-center items-center mb-4">
        <img
          src={`/bookCovers/${book.imageFileName}`}
          alt={`book-cover-img-${book.name}`}
          className="flex justify-center object-contain max-w-full max-h-96"
        />
      </div>

      <div className="flex flex-col justify-center items-center font-bold text-lg mb-2 flex-grow">
        <p className="px-4 break-words text-center">{book.name}</p>
        <p>
          <small>{book.author}</small>
        </p>
        <div className="w-2/3 h-0.5 bg-gray-200 mx-auto rounded-sm"></div>
      </div>
      <div className="flex flex-col justify-center items-center py-3">
        <RatingStars rating={book.rating} />
        <BookProgressBar totalPages={book.totalPages} pagesRead={book.pagesRead} />
      </div>
      <div className="flex flex-row justify-between items-center mb-2 mx-2">
        <div>
          <IconButton onClick={handleDeleteIconClick}>
            <DeleteIcon />
          </IconButton>
          <Dialog open={openConfirmDialogOpen} onClose={() => handleConfirmClose(false)}>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Are you sure you want to delete this book?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => handleConfirmClose(false)} autoFocus>
                No
              </Button>
              <Button onClick={() => handleConfirmClose(true)}>Yes</Button>
            </DialogActions>
          </Dialog>
        </div>
        <div>
          <IconButton onClick={handleEditIconClick}>
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDetailsOpen}>
            <KeyboardArrowRightIcon />
          </IconButton>
        </div>
      </div>
      {showDetailsScreen && (
        <BookDetails book={book} open={detailsOpen} handleDetailsClose={handleDetailsClose} />
      )}
    </div>
  );
}
