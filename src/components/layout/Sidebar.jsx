import PropTypes from "prop-types";
import {
  FiHeart,
  FiMoon,
  FiPlus,
  FiSun,
  FiTrash2,
  FiUsers,
} from "react-icons/fi";

function Sidebar({
  contacts,
  activeView,
  onViewChange,
  onAddContact,
  isDarkMode,
  onToggleTheme,
}) {
  const favoriteCount = contacts.filter(
    (contact) => contact.isFavorite && !contact.isDeleted,
  ).length;
  const trashCount = contacts.filter((contact) => contact.isDeleted).length;
  const navButtonClass = (view) =>
    `flex min-w-0 flex-1 items-center gap-3 rounded-xl px-3 py-3 text-left text-sm font-medium transition lg:flex-none ${
      activeView === view
        ? "bg-sky-50 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300"
        : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
    }`;

  return (
    <aside className="w-full shrink-0 rounded-3xl border border-slate-200 bg-white p-4 text-slate-900 shadow-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-100 sm:p-5 lg:sticky lg:top-8 lg:w-64">
      <div className="mb-6 flex items-center gap-3 px-1">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-sky-100 text-sky-700 dark:bg-sky-400/15 dark:text-sky-300">
          <FiUsers aria-hidden="true" size={20} />
        </div>
        <div>
          <h2 className="font-semibold">Contactly</h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Your address book
          </p>
        </div>
      </div>
      <nav
        aria-label="Contact views"
        className="grid grid-cols-2 gap-2 lg:flex lg:flex-col"
      >
        <button
          type="button"
          onClick={() => onViewChange("contacts")}
          aria-current={activeView === "contacts" ? "page" : undefined}
          className={navButtonClass("contacts")}
        >
          <FiUsers aria-hidden="true" size={18} />
          <span className="truncate">Contacts</span>
          <span
            className={`ml-auto min-w-6 rounded-full px-2 py-0.5 text-center text-xs ${
              activeView === "contacts"
                ? "bg-sky-100 text-sky-700 dark:bg-sky-400/20 dark:text-sky-200"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {contacts.length}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onViewChange("favorites")}
          aria-current={activeView === "favorites" ? "page" : undefined}
          className={navButtonClass("favorites")}
        >
          <FiHeart aria-hidden="true" size={18} />
          <span className="truncate">Favorites</span>
          <span
            className={`ml-auto min-w-6 rounded-full px-2 py-0.5 text-center text-xs ${
              activeView === "favorites"
                ? "bg-sky-100 text-sky-700 dark:bg-sky-400/20 dark:text-sky-200"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {favoriteCount}
          </span>
        </button>
        <button
          type="button"
          onClick={() => onViewChange("trash")}
          aria-current={activeView === "trash" ? "page" : undefined}
          className={navButtonClass("trash")}
        >
          <FiTrash2 aria-hidden="true" size={18} />
          <span className="truncate">Trash</span>
          <span
            className={`ml-auto min-w-6 rounded-full px-2 py-0.5 text-center text-xs ${
              activeView === "trash"
                ? "bg-sky-100 text-sky-700 dark:bg-sky-400/20 dark:text-sky-200"
                : "bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300"
            }`}
          >
            {trashCount}
          </span>
        </button>
        <button
          type="button"
          onClick={onAddContact}
          className="flex shrink-0 items-center gap-3 rounded-xl bg-sky-600 px-3 py-3 text-left text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 lg:mt-3"
        >
          <FiPlus aria-hidden="true" size={18} />
          <span>Add contact</span>
        </button>
      </nav>
      <div className="mt-5 border-t border-slate-200 pt-4 dark:border-slate-800">
        <button
          type="button"
          onClick={onToggleTheme}
          aria-label={`Switch to ${isDarkMode ? "light" : "dark"} mode`}
          className="flex w-full items-center justify-between rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        >
          <span className="flex items-center gap-3">
            {isDarkMode ? (
              <FiSun aria-hidden="true" size={18} />
            ) : (
              <FiMoon aria-hidden="true" size={18} />
            )}
            {isDarkMode ? "Light mode" : "Dark mode"}
          </span>
          <span
            className={`relative h-6 w-11 rounded-full transition ${isDarkMode ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-700"}`}
          >
            <span
              className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow transition-all ${isDarkMode ? "left-6" : "left-1"}`}
            />
          </span>
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

Sidebar.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      isFavorite: PropTypes.bool,
      isDeleted: PropTypes.bool,
    }),
  ).isRequired,
  activeView: PropTypes.oneOf(["contacts", "favorites", "trash"]).isRequired,
  onViewChange: PropTypes.func.isRequired,
  onAddContact: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
