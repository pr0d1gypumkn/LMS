import "../App.css";
import { useState, useEffect } from "react";
import Book from "../components/book";
import BookFilters from "../components/bookFilters";
import constants from "../constants";


const BOOK_SEARCH_FIELD = "book_search";
const SEARCH_BOOKS_BTN = "search_books_btn";

export default function Books() {
  const [books, setBooks] = useState([]);

  // filters
  const availableCheckbox = document.getElementById(constants.bookFilterFields.AVAILABLE);
  const dateRange = document.getElementById(constants.bookFilterFields.DATE_RANGE_TYPE);
  const dateSelect = document.getElementById(constants.bookFilterFields.DATE_PUBLISHED);
  const dateFromSelect = document.getElementById(constants.bookFilterFields.DATE_PUB_FROM);
  const dateToSelect = document.getElementById(constants.bookFilterFields.DATE_PUB_TO);
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

  function getFilteredBooks(event) {
    event.preventDefault();
    let available = availableCheckbox.checked;
    let range = dateRange.value;
    let date = dateSelect.value;
    let genre = genreSelect.value;
    let sortBy = sortSelect.value;
    let dateFrom = dateFromSelect.value;
    let dateTo = dateToSelect.value;

    if (dateFrom && !dateTo) {
      date = dateFrom;
      range = "After";
    } else if (!dateFrom && dateTo) {
      date = dateTo;
      range = "Before";
    } else if (dateFrom && dateTo) {
      date = `${dateFrom}-${dateTo}`;
    }

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

        // reset date published filter section
        document.getElementById(constants.bookFilterFields.DATE_RANGE_TYPE).value = "All";
        document.getElementById(constants.bookFilterFields.DATE_PUBLISHED).value = "";
        document.getElementById("select-range-div").classList = ["hidden"];
        document.getElementById("select-single-year-div").classList = [];
        let singleDateField = document.getElementById(constants.bookFilterFields.DATE_PUBLISHED);
        if (!singleDateField.classList.contains("bg-neutral-200")) {
          singleDateField.classList.add("bg-neutral-200");
        }
        
        genreSelect.value = defaultAll;
        sortSelect.value = defaultNone;
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }

  function searchBooks(event) {
    event.preventDefault();
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
    <div className="page-padding dark:bg-neutral-800 h-screen">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="text-left text-main font-bold text-4xl">
          Books
        </div>
        <form onSubmit={ searchBooks }>
          <div className="text-right flex space-x-2">
              <input type="text" id={BOOK_SEARCH_FIELD} className="border w-full px-2 py-2 w-1/2 rounded-md font-normal dark:bg-neutral-600 dark:text-white min-w-[200px] md:min-w-[500px]"
                placeholder="Search books..."/> 
              <button id={ SEARCH_BOOKS_BTN } className="btn px-3 py-2 mr-2 rounded-md" style={{ backgroundColor: "#ff8903" }} type="submit" >
                Search
              </button>
          </div>
        </form>
      </div>
      <div className="flex flex-col sm:flex-row">
        <div className="text-left h-min">
          <div className="flex flex-col pt-4">
            <form onSubmit={ getFilteredBooks }>
              <div className="space-y-2 dark:border dark:border-neutral-500">
                <BookFilters />
              </div>
              <div className="pt-2">
                <button id={ constants.bookFilterFields.SHOW_BTN } className="btn px-3 py-2 mr-2 rounded-md"
                  style={{ backgroundColor: "#ff8903" }} type="submit">
                  Show Books
                </button>
                <button id={ constants.bookFilterFields.RESET_BTN } className="btn px-3 py-2 rounded-md bg-gray-200"
                  onClick={ resetBooks } type="reset">
                  Reset
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="books flex min-h-[356px] gap-[14px] flex-wrap pl-[14px]">
          {books.map((book) => {
            return <Book book={ book } />
          })}
        </div>
      </div>
    </div>
  )
}
