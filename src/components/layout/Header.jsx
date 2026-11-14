import PropTypes from "prop-types";
import SearchInput from "../elements/SearchInput";
import { FiPlus } from "react-icons/fi";

function Header({ searchQuery, onSearch, onAddContact }) {
  return (
    <header className="flex w-full flex-col gap-5 rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
      <div className="shrink-0">
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-sky-600 dark:text-sky-400">
          Your workspace
        </p>
        <h1 className="mt-1 text-2xl font-bold tracking-tight text-slate-900 dark:text-white sm:text-3xl">
          Contacts
        </h1>
      </div>
      <div className="flex w-full flex-col gap-3 sm:flex-row lg:max-w-2xl lg:justify-end">
        <SearchInput value={searchQuery} onChange={onSearch} />
        <button
          type="button"
          onClick={onAddContact}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-sky-500 focus-visible:outline-sky-500"
        >
          <FiPlus aria-hidden="true" size={18} />
          <span>New contact</span>
        </button>
      </div>
    </header>
  );
}

export default Header;

Header.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired,
  onAddContact: PropTypes.func.isRequired,
};
