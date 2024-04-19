import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  TextField,
} from '@mui/material';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';
import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../contexts/authContext';

export default function BookForm({
  open,
  handleClose,
  onPersist,
  createMode = true,
  children: book = null,
}) {
  const { user } = useContext(AuthContext);

  // States
  const [formErrors, setFormErrors] = useState({});
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [comment, setComment] = useState('');
  const [publisher, setPublisher] = useState('');
  const [year, setYear] = useState('');
  const [totalPages, setTotalPages] = useState('');
  const [pagesRead, setPagesRead] = useState('');
  const [value, setValue] = useState('');
  const [rating, setRating] = useState('');
  const [favorite, setFavorite] = useState(false);

  useEffect(() => {
    if (createMode) {
      // New book
      setName('');
      setAuthor('');
      setDescription('');
      setPublisher('');
      setYear('');
      setTotalPages('');
      setPagesRead('');
      setValue('');
      setRating('');
      setFavorite(false);
    } else {
      // Editing book
      setName(book?.name || '');
      setAuthor(book?.author || '');
      setDescription(book?.description || '');
      setPublisher(book?.publisher || '');
      setYear(book?.year || '');
      setTotalPages(book?.totalPages || '');
      setPagesRead(book?.pagesRead || '');
      setValue(book?.value || '');
      setRating(book?.rating || '');
      setFavorite(book?.favorite || false);
    }
  }, [createMode, book]);

  // Clearing the error object when the dialog is closed
  useEffect(() => {
    setFormErrors({});
  }, [handleClose]);

  function validate() {
    const currentErrors = {};
    if (!name) {
      currentErrors['nameMissing'] = 'Name is required';
    }
    if (!author) {
      currentErrors['authorMissing'] = 'Author is required';
    }
    if (!description) {
      currentErrors['descriptionMissing'] = 'Description is required';
    }
    if (!publisher) {
      currentErrors['publisherMissing'] = 'Publisher is required';
    }
    if (!year) {
      currentErrors['yearMissing'] = 'Year is required';
    }
    if (year < 0) {
      currentErrors['yearNegative'] = 'Year must be a positive date (yyyy)';
    }
    if (!totalPages) {
      currentErrors['totalPagesMissing'] = 'Total pages is required';
    }
    if (totalPages < 0) {
      currentErrors['totalPagesNegative'] = 'Total pages must be positive';
    }
    if (pagesRead === '') {
      currentErrors['numberOfPagesReadMissing'] = 'Pages read is required (could be 0)';
    } else if (pagesRead < 0) {
      currentErrors['numberOfPagesReadNegative'] = 'Pages read must be positive';
    } else if (pagesRead > totalPages) {
      currentErrors['pagesReadGreaterThanTotal'] = 'Pages read must be lower than the total pages';
    }
    if (!value) {
      currentErrors['valueMissing'] = 'Value is required';
    }
    if (!rating) {
      currentErrors['ratingMissing'] = 'Rating is required';
    }
    if (rating < 0 || rating > 5) {
      currentErrors['invalidRating'] = 'Rating must be between 0 and 5';
    }
    setFormErrors(currentErrors);
    console.log(currentErrors);
    return Object.keys(currentErrors).length === 0;
  }

  function clearFields() {
    setName('');
    setAuthor('');
    setDescription('');
    setComment('');
    setPublisher('');
    setYear('');
    setTotalPages('');
    setPagesRead(1);
    setValue('');
    setRating('');
    setFavorite(false);
  }

  function handleFormSubmit(evt) {
    evt.preventDefault();
    if (onPersist) {
      if (validate()) {
        const formValues = {
          name: name,
          author: author,
          description: description,
          publisher: publisher,
          year: Number(year),
          totalPages: Number(totalPages),
          pagesRead: Number(pagesRead),
          value: Number(value),
          rating: Number(rating),
          favorite: favorite,
        };

        // Adding the logged user to the form data
        formValues.userId = user.userId;

        const formData = new FormData();
        formData.append('bookImage', document.getElementById('book-img-form').files[0]);
        formData.append('bookData', JSON.stringify(formValues));

        // const formDataObject = {};
        // for (const [name, value] of formData.entries()) {
        //   formDataObject[name] = value;
        // }
        // console.log(formDataObject);

        onPersist(formData);
        clearFields();
        setFormErrors({});
      } else {
        console.log('Nao validou');
      }
    } else {
      console.log('onPersist else');
    }
  }

  return (
    <Dialog fullWidth open={open} onClose={handleClose}>
      <form onSubmit={handleFormSubmit}>
        {createMode ? (
          <DialogTitle>Register a new book</DialogTitle>
        ) : (
          <DialogTitle>Update book</DialogTitle>
        )}
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Name"
            type="text"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setName(evt.target.value);
            }}
            value={name}
            error={!!formErrors.nameMissing}
            helperText={formErrors.nameMissing}
          />
          <TextField
            margin="dense"
            id="author"
            label="Author"
            type="text"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setAuthor(evt.target.value);
            }}
            value={author}
            error={!!formErrors.authorMissing}
            helperText={formErrors.authorMissing}
          />
          <TextField
            margin="dense"
            id="publisher"
            label="Publisher"
            type="text"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setPublisher(evt.target.value);
            }}
            value={publisher}
            error={!!formErrors.publisherMissing}
            helperText={formErrors.publisherMissing}
          />
          <TextField
            margin="dense"
            id="year"
            label="Edition year"
            type="number"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setYear(evt.target.value);
            }}
            value={year}
            error={!!formErrors.yearMissing || formErrors.yearNegative}
            helperText={formErrors.yearMissing || formErrors.yearNegative}
          />
          <TextField
            margin="dense"
            id="total-pages"
            label="Total pages"
            type="number"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setTotalPages(evt.target.value);
            }}
            value={totalPages}
            error={!!formErrors.totalPagesMissing || formErrors.totalPagesNegative}
            helperText={formErrors.totalPagesMissing || formErrors.totalPagesNegative}
          />
          <TextField
            margin="dense"
            id="pages-read-form"
            label="Pages read"
            type="number"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setPagesRead(evt.target.value);
            }}
            value={pagesRead}
            error={
              !!formErrors.numberOfPagesReadMissing ||
              formErrors.numberOfPagesReadNegative ||
              formErrors.pagesReadGreaterThanTotal
            }
            helperText={
              formErrors.numberOfPagesReadMissing ||
              formErrors.numberOfPagesReadNegative ||
              formErrors.pagesReadGreaterThanTotal
            }
          />
          <TextField
            margin="dense"
            id="value-form"
            label="Value"
            type="number"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setValue(evt.target.value);
            }}
            value={value}
            error={!!formErrors.valueMissing}
            helperText={formErrors.valueMissing}
          />
          <TextField
            margin="dense"
            id="rating-form"
            label="Rating (0 to 5)"
            type="number"
            fullWidth
            variant="standard"
            onChange={(evt) => {
              setRating(evt.target.value);
            }}
            value={rating}
            error={!!formErrors.ratingMissing || formErrors.invalidRating}
            helperText={formErrors.ratingMissing || formErrors.invalidRating}
          />
          <TextField
            margin="dense"
            id="description"
            label="Description"
            type="text"
            fullWidth
            variant="standard"
            multiline
            maxRows={4}
            onChange={(evt) => {
              setDescription(evt.target.value);
            }}
            value={description}
            error={!!formErrors.descriptionMissing}
            helperText={formErrors.descriptionMissing}
          />
          <TextField
            margin="dense"
            id="comments"
            label="Comments"
            type="text"
            fullWidth
            variant="standard"
            multiline
            rows={3}
            onChange={(evt) => {
              setComment(evt.target.value);
            }}
            value={comment}
          />
          <FormGroup style={{ marginTop: 8 }}>
            <FormControlLabel
              control={
                <Checkbox
                  style={{
                    color: 'red',
                    padding: 2,
                    marginLeft: 8,
                    marginRight: 5,
                    verticalAlign: 'middle',
                  }}
                  icon={<FavoriteBorder />}
                  checkedIcon={<Favorite />}
                  onChange={(evt) => {
                    setFavorite(evt.target.checked);
                  }}
                  checked={favorite}
                />
              }
              label="Set book to favorites list"
            />
          </FormGroup>
          <div className="my-4">
            <label htmlFor="book-img-form" className="flex flex-col mb-1 ">
              Select the book cover image:
            </label>
            <input type="file" id="book-img-form" className="rounded-md" accept=".jpg" />
          </div>
        </DialogContent>
        <DialogActions>
          <Button type="button" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            type="submit"
            onClick={() => {
              if (validate()) {
                handleClose();
              }
            }}
          >
            {createMode ? 'Add to collection' : 'Update'}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
