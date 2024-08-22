import "../App.css";
import { useState, useEffect } from "react";
import Book from "../components/book";
import BookFilters from "../components/bookFilters";
import constants from "../constants";
import { toggleDateSelect } from "../components/bookFilters";


const BOOK_SEARCH_FIELD = "book_search";
const SEARCH_BOOKS_BTN = "search_books_btn";

export default function Books() {
  const [books, setBooks] = useState([]);

  // filters
  const availableCheckbox = document.getElementById(constants.bookFilterFields.AVAILABLE);
  const dateRange = document.getElementById(constants.bookFilterFields.DATE_RANGE_TYPE);
  const dateSelect = document.getElementById(constants.bookFilterFields.DATE_PUBLISHED);
  const genreSelect = document.getElementById(constants.bookFilterFields.GENRE);
  const sortSelect = document.getElementById(constants.bookFilterFields.SORT);

  // searching
  const searchBox = document.getElementById(BOOK_SEARCH_FIELD);

  useEffect(() => {
    fetch("http://localhost:8000/books/")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  function getFilteredBooks() {
    let available = availableCheckbox.checked;
    let range = dateRange.value;
    let date = dateSelect.value;
    let genre = genreSelect.value;
    let sortBy = sortSelect.value;

    fetch(`http://localhost:8000/books/filter/?available=${available}&range=${range}&date=${date}&genre=${genre}&sortBy=${sortBy}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }

  function resetBooks() {
    let defaultAvailability = false;
    let defaultAll = "All";
    let defaultNone = "None";
    fetch(`http://localhost:8000/books/filter/?available=${defaultAvailability}&range=${defaultAll}&date=&genre=${defaultAll}&sortBy=${defaultNone}`)
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
        availableCheckbox.checked = false;
        dateRange.value = defaultAll;
        toggleDateSelect(defaultAll);
        genreSelect.value = defaultAll;
        sortSelect.value = defaultNone;
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }

  function searchBooks() {
    let keywords = searchBox.value;
    fetch(`http://localhost:8000/books/search/?keywords=${keywords}`)
    .then((res) => res.json())
    .then((data) => {
      setBooks(data.books);
    })
    .catch((error) => {
      console.error("Error fetching books:", error);
    });
  }

  return (
    <div className="p-[14px] pl-[100px] pr-[100px] dark:bg-neutral-800 h-screen">
      <div className="grid grid-cols-2">
        <div className="text-left text-main font-bold text-4xl col-span-1">
          Books
        </div>
        <div className="col-span-1 text-right flex items-center justify-end space-x-2">
          <input type="text" id={BOOK_SEARCH_FIELD} className="border w-full px-2 py-2 w-1/2 rounded-md font-normal dark:bg-neutral-600 dark:text-white"
            placeholder="Search books..." /> 
          <button id={ SEARCH_BOOKS_BTN } className="btn px-3 py-2 mr-2 rounded-md" style={{ backgroundColor: "#ff8903" }} onClick={ searchBooks } >
            Search
          </button>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-7">
        <div className="col-span-1 text-left">
          <div className="flex flex-col pt-4">
            <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
              <div className="inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden space-y-2 dark:border dark:border-neutral-500">
                  <BookFilters />
                </div>
                <div className="pt-2">
                  <button id={ constants.bookFilterFields.SHOW_BTN } className="btn px-3 py-2 mr-2 rounded-md"
                    style={{ backgroundColor: "#ff8903" }} onClick={ getFilteredBooks } >
                    Show Books
                  </button>
                  <button id={ constants.bookFilterFields.RESET_BTN } className="btn px-3 py-2 rounded-md bg-gray-200"
                    onClick={ resetBooks }>
                    Reset
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="books flex min-h-[356px] gap-[14px] flex-wrap col-span-3">
          {books.map((book) => {
            return <Book book={ book } />
          })}
        </div>
      </div>
    </div>
  )
}
