import PropTypes from "prop-types";

function Pagination({
  currentPage,
  setCurrentPage,
  startIndex,
  endIndex,
  sortedContacts,
  totalPages,
}) {
  return (
    <div className="mt-6 flex flex-col items-center justify-between gap-4 border-t border-slate-200 pt-5 dark:border-slate-800 sm:flex-row">
      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
          {startIndex + 1} - {Math.min(endIndex, sortedContacts.length)} of{" "}
          {sortedContacts.length}
      </span>
      <div className="flex items-center gap-1">
          <button
            type="button"
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => index + 1).map(
            (page) => (
              <button
                type="button"
                key={page}
                onClick={() => setCurrentPage(page)}
                aria-current={currentPage === page ? "page" : undefined}
                className={`h-9 min-w-9 rounded-xl px-2 text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-sky-600 text-white shadow-sm"
                    : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                }`}
              >
                {page}
              </button>
            ),
          )}
          <button
            type="button"
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
            className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
          >
            Next
          </button>
      </div>
    </div>
  );
}

export default Pagination;

Pagination.propTypes = {
  currentPage: PropTypes.number.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  totalPages: PropTypes.number.isRequired,
  sortedContacts: PropTypes.array.isRequired,
  startIndex: PropTypes.number.isRequired,
  endIndex: PropTypes.number.isRequired,
};
