import "../App.css";
import { useState, useEffect } from "react";
import Book from "../components/book";
import BookFilters from "../components/bookFilters";
import constants from "../constants";
import { toggleDateSelect } from "../components/bookFilters";

export default function Books() {
  const [books, setBooks] = useState([]);

  // filters
  const availableCheckbox = document.getElementById(constants.bookFilterFields.AVAILABLE);
  const dateRange = document.getElementById(constants.bookFilterFields.DATE_RANGE_TYPE);
  const dateSelect = document.getElementById(constants.bookFilterFields.DATE_PUBLISHED);
  const genreSelect = document.getElementById(constants.bookFilterFields.GENRE);
  const sortSelect = document.getElementById(constants.bookFilterFields.SORT);

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

  return (
    <div className="p-[14px] pl-[100px] pr-[100px] dark:bg-neutral-800 h-screen">
      <div className="text-left text-main font-bold text-4xl">
        Books
      </div>
      <div className="grid grid-cols-4 gap-7">
        <div className="col-span-1 text-left">
          <div className="flex flex-col">
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
