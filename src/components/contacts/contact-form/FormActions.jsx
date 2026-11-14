import PropTypes from "prop-types";
import { FiArrowLeft, FiArrowRight, FiCheck } from "react-icons/fi";

const buttonClassName =
  "flex h-9 w-20 shrink-0 items-center justify-center gap-1.5 rounded-lg border px-1.5 text-xs font-semibold transition";
const cancelClassName =
  "border-rose-300 text-rose-600 hover:bg-rose-50 dark:border-rose-500/60 dark:text-rose-400 dark:hover:bg-rose-500/10";
const backClassName =
  "border-sky-300 text-sky-700 hover:bg-sky-50 dark:border-sky-500/60 dark:text-sky-400 dark:hover:bg-sky-500/10";
const primaryClassName =
  "border-sky-600 bg-sky-600 text-white shadow-sm hover:border-sky-500 hover:bg-sky-500";

function FormActions({ mode, primaryLabel, onCancel, onBack, onPrimary }) {
  const hasBack = mode === "optional" || mode === "avatar";

  return (
    <div className="mt-6 flex items-center justify-between gap-2 border-t border-slate-100 pt-4 dark:border-slate-800">
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onCancel}
          className={`${buttonClassName} ${cancelClassName}`}
        >
          Cancel
        </button>
        {hasBack && (
          <button
            type="button"
            onClick={onBack}
            className={`${buttonClassName} ${backClassName}`}
          >
            <FiArrowLeft aria-hidden="true" size={14} /> Back
          </button>
        )}
      </div>
      <button
        type={mode === "avatar" || mode === "edit" ? "submit" : "button"}
        onClick={
          mode === "avatar" || mode === "edit"
            ? undefined
            : (event) => {
                event.preventDefault();
                onPrimary();
              }
        }
        className={`${buttonClassName} ${primaryClassName}`}
      >
        {primaryLabel}
        {mode === "avatar" || mode === "edit" ? (
          <FiCheck aria-hidden="true" size={14} />
        ) : (
          <FiArrowRight aria-hidden="true" size={14} />
        )}
      </button>
    </div>
  );
}

FormActions.propTypes = {
  mode: PropTypes.oneOf(["first", "optional", "avatar", "edit"]).isRequired,
  primaryLabel: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onBack: PropTypes.func,
  onPrimary: PropTypes.func,
};

export default FormActions;
