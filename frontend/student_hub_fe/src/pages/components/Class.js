export function Class({ classCode, className, professorName, grade, onClick }) {
  return (
    <>
    <button onClick={onClick} className="card bg-base-200 w-full shadow-sm p-5 hover:bg-blue-600 mb-2">
        <div>
            <h1 className="text-lg font-bold text-left">{className}</h1>
            <p className="stat-desc text-left">{classCode} - {professorName}</p>
            <h3 className="text-info text-right"><strong>{grade}</strong></h3>
        </div>
    </button>
    </>
  );
}
