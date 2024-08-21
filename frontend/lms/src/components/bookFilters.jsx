import { useState, useEffect } from "react";
import constants from "../constants.js";


const EMPTY_GENRE = "";

const yearValidation = (event) => {
  const { value } = event.target;
  if (value.length > 4) {
    event.target.value = value.slice(0, 4);
  }
}

export function toggleDateSelect(selected) {
  let dateSelect = document.getElementById(constants.bookFilterFields.DATE_PUBLISHED);
  let greyedOut = 'bg-gray-300';
  if (selected === "All") {
    dateSelect.disabled = true;
    if (!dateSelect.classList.contains(greyedOut)) {
      dateSelect.classList.add(greyedOut);
    }
  } else {
    dateSelect.disabled = false;
    if (dateSelect.classList.contains(greyedOut)) {
      dateSelect.classList.remove(greyedOut);
    }
  }
  dateSelect.value = "";
}

export default function BookFilters() {
  const [genres, setGenres] = useState([]);
  const sortings = ["None", "Popular", "Title", "Author", "Publication Date"];
  const ranges = ["All", "Before", "After"];
  
  useEffect(() => {
    fetch("http://localhost:8000/getGenres/")
      .then((res) => res.json())
      .then((data) => {
        let fullGenreList = [EMPTY_GENRE];
        fullGenreList = fullGenreList.concat(data.genres);
        setGenres(fullGenreList);
      })
      .catch((error) => {
        console.error("Error fetching genres:", error);
      });
    toggleDateSelect("All");
  }, []);

  return(
    <table className="min-w-full border border-neutral-200 text-left text-sm font-light text-surface dark:border-white/10 dark:text-white">
      <thead className="border-b border-neutral-200 font-medium dark:border-white/10">
        <tr>
          <th scope="col" className="border-e border-neutral-200 px-6 py-4 dark:border-white/10 bg-gray-100 dark:bg-neutral-600">
            Filters
          </th>
        </tr>
      </thead>
      <tbody>
        <tr className="border-b border-neutral-200 dark:border-neutral-500">
          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10">
            <label className="space-x-10">
              <input id={ constants.bookFilterFields.AVAILABLE } type="checkbox" style={{ marginRight: "10px" }} />
              Available
            </label>
          </td>
        </tr>
        <tr className="border-b border-neutral-200 dark:border-neutral-500">
          <td className="whitespace-nowrap border-e border-neutral-200 px-6 py-4 font-medium dark:border-white/10 space-y-2">
            <div className="font-bold">
              Date Published
            </div>
            <div>
              <select id={ constants.bookFilterFields.DATE_RANGE_TYPE } className="border-2 w-full px-2 py-2 rounded-md font-normal dark:bg-neutral-600 dark:border"
                onChange={(event) => toggleDateSelect(event.target.value)}>
                {
                  ranges.map((range) => {
                    return <option value={ range } key={ range.id }>{ range }</option>;
                  })
                }
              </select>
            </div>
            <div>
              <input type="number" id={constants.bookFilterFields.DATE_PUBLISHED} className="border-2 w-full px-2 py-2 rounded-md font-normal dark:text-black" 
                onChange={ yearValidation } placeholder="YYYY" />            
            </div>
          </td>
        </tr>
        <tr className="border-b border-neutral-200 dark:border-neutral-500">
          <td className="border-e border-neutral-200 px-6 py-4 dark:border-white/10 space-y-1">
            <div className="font-bold">
              Genre
            </div>
            <select id={ constants.bookFilterFields.GENRE } className="border-2 w-full px-2 py-2 rounded-md dark:bg-neutral-600 dark:border" >
              {
                genres.map((genre) => {
                  return genre === EMPTY_GENRE? <option selected value="All">All</option> : 
                    <option value={ genre } key={ genre.id }>{ genre }</option>;
                })
              }
            </select>
          </td>
        </tr>
        <tr className="border-b border-neutral-200 dark:border-neutral-500">
          <td className="border-e border-neutral-200 px-6 py-4 dark:border-white/10 space-y-1 pb-5">
            <div className="font-bold">
              Sort by
            </div>
            <select id={ constants.bookFilterFields.SORT } className="border-2 w-full px-2 py-2 rounded-md dark:bg-neutral-600 dark:border" >
              {
                sortings.map((sorting) => {
                  return <option value={ sorting } key={ sorting.id }>{ sorting }</option>;
                })
              }
            </select>
          </td>
        </tr>
      </tbody>
    </table>
  )
}
