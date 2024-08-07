export default function Book({ book , featured}) {
  return (
    <div className={`book flex flex-col gap-[20px] p-[14px] m-[14px] w-[200px] min-w-[200px] rounded-3xl min-h-[300px] max-h-[300px] `} style={{borderRadius: "50px",
      background: "#ffffff",
      boxShadow:  ` 5px 5px 10px ${featured ? "#ffd7b0" : "#d9d9d9"}, -5px -5px 10px ${featured ? "#fff0e0" : "#fff"}`}}>
      <h2 className="text-title font-bold flex-[1]">{book.title}</h2>
      <p className="flex-[0.5]">Written by: <br />{book.author}</p>
      <p className="text-slate-600 flex-[0.5]">{book.genre}</p>

    </div>
  );
}
