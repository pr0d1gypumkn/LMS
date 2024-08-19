import { useEffect, useState } from "react";
import Book from "../components/book";
import KeyboardDoubleArrowLeftIcon from "@mui/icons-material/KeyboardDoubleArrowLeft";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { waitFor } from "@testing-library/react";

export default function Landing() {
  const [books, setBooks] = useState([]);
  const [index, setIndex] = useState(0);
  const [carousel, setCarousel] = useState([]);
  const [loading, setLoading] = useState(true);

  

  useEffect(() => {
    console.log("Fetching books");
    fetch("http://localhost:8000/books/")
      .then((res) => res.json())
      .then((data) => {
        setBooks(data.books);
        // setTimeout(() => setLoading(false), 2000);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching books:", error);
      });
  }, []);

  useEffect(() => {
    const carouselDisplay = () => {
    if (index + 3 < books.length) {
      setCarousel(books.slice(index, index + 3));
    } else {
      setCarousel([
        ...books.slice(index, books.length),
        ...books.slice(0, 3 - (books.length - index)),
      ]);
    }
  };
    carouselDisplay();
  }, [index, books]);

  return (
    <div className="pb-7 dark:bg-neutral-800 h-screen">
      <h1 className="p-[14px] pl-[100px] text-left text-main font-bold text-header">
        Featured Books
      </h1>
      
      <div className="flex flex-row items-center">
        <KeyboardDoubleArrowLeftIcon
          className="flex-[1] scale-[2] dark:text-white"
          onClick={() => setIndex(index >= 0 ? index - 1 : books.length)}
        />
        <div
          className="books flex-[10] flex flex-row min-h-[356px] content-center content-center place-content-center gap-[14px]"
          style={{ minWidth: "300px" }}
        >
          {(loading && <h2 className="pt-[160px] text-header">Loading...</h2>) ||
            (Array.isArray(carousel) &&
              carousel.length > 0 &&
              carousel.map((book) => carousel.indexOf(book) === 1 ? <Book book={book} featured key={book.id} /> : <Book book={book} key={book.id} />))}
        </div>
        <KeyboardDoubleArrowRightIcon
          className="flex-[1] scale-[2] dark:text-white"
          onClick={() => setIndex((index + 1) % books.length)}
        />
      </div>
      {/* Index visualizer */}
      <div className="flex flex-row gap-[10px] items-center justify-center">
        {Array.from({ length: books.length }, (_, i) => (
          <div
            key={i}
            onClick={() => setIndex(i)}
            className={`w-4 h-4 rounded-full  border border-slate-150 bg-main ${
              i === index ? "bg-main" : "bg-white"
            }`}
            style={{
              borderRadius: "50px",
              background: i === index ? "#ff8903" : "#ffffff",
              boxShadow: " 5px 5px 10px #d9d9d9, -5px -5px 10px #ffffff",
            }}
          ></div>
        ))}
      </div>
    </div>
  );
}
