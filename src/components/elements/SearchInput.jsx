import PropTypes from "prop-types";
import { FiSearch } from "react-icons/fi";

function SearchInput({ value, onChange }) {
  return (
    <label className="relative block w-full sm:max-w-sm lg:max-w-md">
      <FiSearch
        aria-hidden="true"
        size={18}
        className="pointer-events-none absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400"
      />
      <input
        type="text"
        placeholder="Search contacts..."
        aria-label="Search contacts"
        className="w-full rounded-xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-sm text-slate-900 transition placeholder:text-slate-400 focus:border-sky-400 focus:bg-white focus:outline-none focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:bg-slate-800 dark:focus:ring-sky-500/10"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </label>
  );
}

export default SearchInput;

SearchInput.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};
