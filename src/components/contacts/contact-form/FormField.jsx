import PropTypes from "prop-types";

function FormField({ id, label, Icon, error, className = "", children }) {
  return (
    <div className={`min-w-0 ${className}`}>
      <label
        htmlFor={id}
        className="mb-1.5 flex items-center gap-2 text-sm font-medium text-slate-700 dark:text-slate-200"
      >
        {Icon && (
          <Icon aria-hidden="true" size={16} className="text-slate-400" />
        )}
        {label}
      </label>
      {children}
      {error && <p className="mt-1.5 text-xs text-rose-600">{error}</p>}
    </div>
  );
}

FormField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.node.isRequired,
  Icon: PropTypes.elementType,
  error: PropTypes.string,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
};

export default FormField;
