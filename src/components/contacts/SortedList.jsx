import { useEffect, useRef, useState } from "react";
import propTypes from "prop-types";

function SortedList({ isSortOpen, setIsSortOpen, sortType, setSortType }) {
  const sortButtonRef = useRef(null);
  const [menuPosition, setMenuPosition] = useState(null);

  useEffect(() => {
    if (!isSortOpen) return undefined;

    const updateMenuPosition = () => {
      if (!sortButtonRef.current) return;

      const triggerRect = sortButtonRef.current.getBoundingClientRect();
      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const menuWidth = Math.min(208, viewportWidth - 16);
      const left = Math.max(
        8,
        Math.min(triggerRect.left, viewportWidth - menuWidth - 8),
      );
      const menuHeight = Math.min(250, viewportHeight - 16);
      const belowTop = triggerRect.bottom + 8;
      const top =
        belowTop + menuHeight <= viewportHeight - 8
          ? belowTop
          : Math.max(8, triggerRect.top - menuHeight - 8);

      setMenuPosition({
        top,
        left,
        width: menuWidth,
      });
    };

    updateMenuPosition();
    window.addEventListener("resize", updateMenuPosition);
    window.addEventListener("scroll", updateMenuPosition, true);

    return () => {
      window.removeEventListener("resize", updateMenuPosition);
      window.removeEventListener("scroll", updateMenuPosition, true);
    };
  }, [isSortOpen]);

  const optionClass = (isActive) =>
    `flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-sm transition ${
      isActive
        ? "bg-sky-50 font-medium text-sky-700 dark:bg-sky-400/10 dark:text-sky-200"
        : "text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-slate-800"
    }`;

  return (
    <div className="shrink-0">
      <button
        ref={sortButtonRef}
        onClick={() => setIsSortOpen(!isSortOpen)}
        type="button"
        aria-haspopup="menu"
        aria-expanded={isSortOpen}
        className="rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-600 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-300 dark:hover:bg-slate-800"
      >
        Sort
      </button>
      {isSortOpen && menuPosition && (
        <div
          role="menu"
          className="fixed z-50 max-h-[calc(100dvh-1rem)] overflow-y-auto rounded-2xl border border-slate-200 bg-white p-2 shadow-xl dark:border-slate-700 dark:bg-slate-900"
          style={{
            top: menuPosition.top,
            left: menuPosition.left,
            width: menuPosition.width,
          }}
        >
          <p className="px-3 py-2 text-xs font-semibold text-slate-400">
            SORT BY DATE
          </p>
          <button
            type="button"
            onClick={() => {
              setSortType("date-desc");
              setIsSortOpen(false);
            }}
            className={optionClass(sortType === "date-desc")}
          >
            Newest
            {sortType === "date-desc" && (
              <span className="h-2 w-2 rounded-full bg-green-500" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setSortType("date-asc");
              setIsSortOpen(false);
            }}
            className={optionClass(sortType === "date-asc")}
          >
            Oldest
            {sortType === "date-asc" && (
              <span className="h-2 w-2 rounded-full bg-green-500" />
            )}
          </button>
          <div className="my-1 border-t border-slate-100 dark:border-slate-800" />

          <p className="px-3 py-2 text-xs font-semibold text-slate-400">
            SORT BY NAME
          </p>
          <button
            type="button"
            onClick={() => {
              setSortType("name-asc");
              setIsSortOpen(false);
            }}
            className={optionClass(sortType === "name-asc")}
          >
            Name (A - Z)
            {sortType === "name-asc" && (
              <span className="h-2 w-2 rounded-full bg-green-500" />
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setSortType("name-desc");
              setIsSortOpen(false);
            }}
            className={optionClass(sortType === "name-desc")}
          >
            Name (Z - A)
            {sortType === "name-desc" && (
              <span className="h-2 w-2 rounded-full bg-green-500" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}

export default SortedList;

SortedList.propTypes = {
  isSortOpen: propTypes.bool.isRequired,
  setIsSortOpen: propTypes.func.isRequired,
  sortType: propTypes.string.isRequired,
  setSortType: propTypes.func.isRequired,
};
