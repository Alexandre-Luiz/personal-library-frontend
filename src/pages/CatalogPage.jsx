// React
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../contexts/authContext';

// Components
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import Filters from '../components/Filters';
import BookForm from '../components/BookForm';
import BookCard from '../components/BookCard';

// Toastify
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// API
import {
  apiCreateNewBook,
  apiDeleteBook,
  apiEditBook,
  apiGetAllUserBooks,
} from '../services/apiService';

// Material ui
import { IconButton } from '@mui/material';
// import DensityMediumIcon from '@mui/icons-material/DensityMedium';
import DensitySmallIcon from '@mui/icons-material/DensitySmall';
import StatisticsDialog from '../components/StatisticsDialog';

export default function CatalogPage() {
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);
  const [openStats, setOpenStats] = useState(false);
  const [allUserBooks, setAllUserBooks] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [createMode, setCreateMode] = useState(true);
  const [sideBarRetracted, setSideBarRetracted] = useState(false);
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({});

  // Get all user books from the backend
  useEffect(() => {
    (async function getAllUserBooks() {
      try {
        const backendAllUserBooks = await apiGetAllUserBooks(user.userId);
        setAllUserBooks(backendAllUserBooks);
        // Setting the initial value of filtered books to be all books
        setFilteredBooks(backendAllUserBooks);
      } catch (error) {
        setError(error.message);
      }
    })();
  }, [user.userId, selectedBook]);

  const handleOpenClickNewBook = () => {
    setOpen(true);
    setCreateMode(true);
  };

  // Handle all closure of form dialogs (create and edit)
  const handleClose = () => {
    setOpen(false);
    if (createMode === true) {
      setSelectedBook(null);
      setCreateMode(true);
    }
  };

  function handleEditBook(book) {
    setCreateMode(false);
    setSelectedBook(book);
    setOpen(true);
  }

  // Manage new books and updates
  async function handlePersist(formData) {
    // new book
    if (createMode) {
      try {
        // Backend persist
        const newBook = await apiCreateNewBook(formData);

        // Frontend persist
        setAllUserBooks([...allUserBooks, newBook]);

        const updatedFilteredBooks = applyFiltersAndSearch(
          [...allUserBooks, newBook],
          filters,
          searchQuery
        );
        setFilteredBooks(updatedFilteredBooks);

        // Toast
        toast.success(`${newBook.name} created successfully`);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    } else {
      // update
      try {
        console.log('edit handlePersist');
        // Setting bookId and imageFileName inside bookData of FormData
        const bookData = JSON.parse(formData.get('bookData'));
        const { bookId, imageFileName } = selectedBook;
        // Update the bookData with bookId and imageFileName
        const completeBookData = {
          ...bookData,
          bookId,
          imageFileName,
        };
        formData.set('bookData', JSON.stringify(completeBookData));

        // Backend update
        const updatedBook = await apiEditBook(formData);

        // FrontEnd update
        const updatedBooks = allUserBooks.map((book) => {
          if (book.bookId === updatedBook.bookId) {
            return updatedBook;
          }
          return book;
        });
        setAllUserBooks(updatedBooks);

        toast.success(`Book updated successfully`);
        setSelectedBook(null);
        setCreateMode(true);
        setError('');
      } catch (error) {
        setError(error.message);
      }
    }
  }

  async function handleDeleteBook(bookId) {
    try {
      // BackEnd
      await apiDeleteBook(bookId);
      // FrontEnd
      const updatedBooks = allUserBooks.filter((book) => book.bookId !== bookId);
      setAllUserBooks(updatedBooks);

      // const updatedFilteredBooks = filteredBooks.filter((book) => book.bookId !== bookId);
      setFilteredBooks(updatedBooks);

      toast.success(`Book deleted successfully`);
      setError('');
    } catch (error) {
      setError(error.message);
    }
  }

  function handleSideBarRetract() {
    setSideBarRetracted(!sideBarRetracted);
  }

  function handleFilter(filters) {
    setFilters(filters);
    const filteredAndSearchedBooks = applyFiltersAndSearch(allUserBooks, filters, searchQuery);
    setFilteredBooks(filteredAndSearchedBooks);
  }

  function handleSearch(searchQuery) {
    setSearchQuery(searchQuery);
    const filteredAndSearchedBooks = applyFiltersAndSearch(allUserBooks, filters, searchQuery);
    setFilteredBooks(filteredAndSearchedBooks);
  }

  function applyFiltersAndSearch(books, filters, query) {
    return books.filter((book) => {
      const isFavoriteMatch = !filters.favorite || book.favorite;
      const isAuthorMatch = !filters.author || filters.author === book.author.toUpperCase();
      const isPublisherMatch =
        !filters.publisher || filters.publisher === book.publisher.toUpperCase();
      const isYearMatch = !filters.year || filters.year === book.year;
      const isFinishedMatch = !filters.finished || book.pagesRead === book.totalPages;
      const isInProgressMatch = !filters.inProgress || book.pagesRead !== book.totalPages;

      const queryLowerCase = query.toLowerCase();
      const nameIncludesQuery = book.name.toLowerCase().includes(queryLowerCase);
      const authorIncludesQuery = book.author.toLowerCase().includes(queryLowerCase);

      return (
        isFavoriteMatch &&
        isAuthorMatch &&
        isPublisherMatch &&
        isYearMatch &&
        isFinishedMatch &&
        isInProgressMatch &&
        (nameIncludesQuery || authorIncludesQuery)
      );
    });
  }

  function handleStatsOpen() {
    setOpenStats(true);
  }

  function handleStatsClose() {
    setOpenStats(false);
  }

  return (
    <>
      <ToastContainer toastStyle={{ backgroundColor: '#218c74' }} />
      <Header>Book Catalog</Header>
      <div className="flex">
        {/* Sidebar */}
        <div
          className={` max-h-full bg-gray-200 ${
            sideBarRetracted
              ? 'w-10 transition-all duration-300'
              : 'w-full sm:w-1/6 transition-all duration-300'
          }`}
        >
          <div className="flex justify-end mt-3">
            <IconButton onClick={handleSideBarRetract}>
              <DensitySmallIcon />
            </IconButton>
          </div>
          <div className={`${sideBarRetracted ? 'hidden ' : 'flex justify-center mt-3'}`}>
            <button
              onClick={handleOpenClickNewBook}
              type="button"
              className="hover:shadow-lg text-white font-bold bg-blue-600 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              New Book
            </button>
            <BookForm
              open={open}
              handleClose={handleClose}
              onPersist={handlePersist}
              createMode={createMode}
            >
              {selectedBook}
            </BookForm>
          </div>
          <div className={`${sideBarRetracted ? 'hidden' : 'flex justify-center mt-3'}`}>
            <button
              onClick={handleStatsOpen}
              type="button"
              className="hover:shadow-lg text-white font-bold bg-blue-600 hover:bg-blue-800 focus:ring-2 focus:ring-blue-300 rounded-lg text-sm px-6 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
            >
              Statistics
            </button>
            <StatisticsDialog
              open={openStats}
              handleStatsClose={handleStatsClose}
              allUserBooks={allUserBooks}
            />
          </div>
          <Filters
            allUserBooks={allUserBooks}
            onFilter={handleFilter}
            sideBarStatus={sideBarRetracted}
          />
        </div>
        {/* Main Content */}
        <div
          className={` bg-white ${
            sideBarRetracted ? 'flex flex-col justify-center w-full ' : 'w-4/6 sm:w-5/6'
          }`}
        >
          <SearchBar onSearch={handleSearch} />
          <div className="h-auto mt-2 flex flex-row flex-wrap justify-around align-top mx-4">
            {filteredBooks.length === 0 ? (
              <div>No books match the selected filters.</div>
            ) : (
              filteredBooks.map((book) => (
                <BookCard
                  book={book}
                  key={book.bookId}
                  onDelete={handleDeleteBook}
                  onEdit={handleEditBook}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}
