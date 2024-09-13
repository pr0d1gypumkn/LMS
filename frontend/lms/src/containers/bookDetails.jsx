import { useEffect, useState } from 'react';
import { NavLink, useParams } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';


export default function BookDetails() {
  const { book_id } = useParams();
  const [book, setBook] = useState("");
  
  useEffect(() => {
    fetch(`http://localhost:8000/books/book/${book_id}/`)
    .then((res) => res.json())
    .then((data) => {
      setBook(data.book);
    })
    .catch((error) => {
      console.error(`Error fetching book with id ${book_id}`, error);
    });
  }, []);

  function moreBookDetailsTable() {
    return(
      <table className="text-left text-surface table-auto">
        <tbody>
          <tr>
            <td className='font-bold pr-10'>Published</td><td>{ book.publication_date }</td>
          </tr>
          <tr>
            <td className='font-bold pr-10'>Genre</td><td>{ book.genre }</td>
          </tr>
          <tr>
            <td className='font-bold pr-10'>Number of Pages</td><td>{ book.page_count }</td>
          </tr>
          <tr>
            <td className='font-bold pr-10'>ISBN</td><td>{ book.isbn }</td>
          </tr>
          <tr>
            <td className='font-bold pr-10'>ISSN</td><td>{ book.issn }</td>
          </tr>
          
        </tbody>
        
      </table>
    )
  }

  function showSubtitle() {
    if (book["subtitle"] !== undefined) {
      return (
        <div className='text-2xl'>
          { book.subtitle }
        </div>
      );
    }
  }

  return(
    <div className='pt-6 pl-[100px] pr-[100px] dark:bg-neutral-800 h-screen dark:text-white'>
      <div className='flex flex-start'>
        <NavLink className='pb-6' to="/books">
          <ArrowBackIcon /> All Books
        </NavLink>
      </div>
      <div className='grid grid-cols-4'>
        <div className='text-left max-w-[300px] col-span-1 space-y-5'>
          <img src={ book.cover } alt="" />
          <div>
            <button className="btn px-3 py-2 mr-2 rounded-md bg-main">Check Out Now</button>
            <button className="btn px-3 py-2 mr-2 rounded-md bg-lightTint text-black">Add to Cart</button>
          </div>
        </div>
        <div className='text-left col-span-3'>
          <div className='font-bold text-4xl'>
            { book.title }
          </div>
          { showSubtitle() }
          <div>
            By: { book.author }
          </div>
          <div className='text-left py-5'>
            <div className='font-bold text-xl'>
              Description
            </div>
            { book.description }
          </div>
          <div>
            { moreBookDetailsTable() }
          </div>
        </div>
      </div>
    </div>
  )
}