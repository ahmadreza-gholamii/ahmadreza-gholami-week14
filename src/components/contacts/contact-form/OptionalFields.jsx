import PropTypes from "prop-types";
import { FiBriefcase, FiFileText, FiMail } from "react-icons/fi";
import FormField from "./FormField";

function OptionalFields({ formData, errors, onChange }) {
  const inputClassName =
  "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:ring-sky-500/10";

  return (
    <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
      <FormField id="email" label="Email" Icon={FiMail} error={errors.email}>
        <input
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={onChange}
          className={`${inputClassName} ${errors.email ? "border-rose-400" : ""}`}
          autoComplete="email"
        />
      </FormField>
      <FormField id="company" label="Company" Icon={FiBriefcase}>
        <input
          id="company"
          name="company"
          value={formData.company}
          onChange={onChange}
          className={inputClassName}
          autoComplete="organization"
        />
      </FormField>
      <FormField id="job" label="Job title" Icon={FiBriefcase}>
        <input
          id="job"
          name="job"
          value={formData.job}
          onChange={onChange}
          className={inputClassName}
          autoComplete="organization-title"
        />
      </FormField>
      <FormField id="notes" label="Notes" Icon={FiFileText}>
        <textarea
          id="notes"
          name="notes"
          value={formData.notes}
          onChange={onChange}
          rows={2}
          className={`${inputClassName} resize-y`}
        />
      </FormField>
    </div>
  );
}

OptionalFields.propTypes = {
  formData: PropTypes.shape({
    email: PropTypes.string.isRequired,
    company: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    notes: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    email: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default OptionalFields;
