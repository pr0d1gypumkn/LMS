import { NavLink } from "react-router-dom";

export default function Book({ book , featured}) {
  return (
    <NavLink to={ `/books/book/${book.id}` }>
      <div className={`book flex flex-col gap-[20px] p-[14px] m-[14px] w-[200px] min-w-[200px] rounded min-h-[300px] max-h-[300px] bg-white dark:bg-neutral-700`} style={{borderRadius: "30px",
        boxShadow:  ` 5px 5px 10px ${featured ? "#ffd7b0" : "#d9d9d9"}, -5px -5px 10px ${featured ? "#fff0e0" : "#fff"}`}}>
        <h2 className="text-title font-bold flex-[1] dark:text-neutral-300">{book.title}</h2>
        <p className="flex-[0.5] dark:text-neutral-300">Written by: <br />{book.author}</p>
        <p className="text-slate-600 flex-[0.5] dark:text-neutral-400">{book.genre}</p>
      </div>
    </NavLink>
  );
}
