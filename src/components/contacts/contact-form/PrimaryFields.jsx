import PropTypes from "prop-types";
import { FiPhone, FiUser } from "react-icons/fi";
import FormField from "./FormField";

function PrimaryFields({ formData, errors, onChange }) {
  const inputClassName =
    "w-full rounded-xl border border-slate-200 bg-white px-3.5 py-2.5 text-sm text-slate-900 outline-none transition focus:border-sky-400 focus:ring-4 focus:ring-sky-100 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-100 dark:focus:border-sky-500 dark:focus:ring-sky-500/10";

  return (
    <>
      <FormField
        id="fullName"
        label={
          <>
            Full name <span className="text-rose-500">*</span>
          </>
        }
        Icon={FiUser}
        error={errors.fullName}
      >
        <input
          id="fullName"
          name="fullName"
          value={formData.fullName}
          onChange={onChange}
          className={`${inputClassName} ${errors.fullName ? "border-rose-400" : ""}`}
          autoComplete="name"
          required
        />
      </FormField>
      <FormField
        id="phone"
        label={
          <>
            Phone number <span className="text-rose-500">*</span>
          </>
        }
        Icon={FiPhone}
        error={errors.phone}
      >
        <input
          id="phone"
          name="phone"
          type="tel"
          value={formData.phone}
          onChange={onChange}
          className={`${inputClassName} ${errors.phone ? "border-rose-400" : ""}`}
          autoComplete="tel"
          required
        />
      </FormField>
    </>
  );
}

PrimaryFields.propTypes = {
  formData: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  errors: PropTypes.shape({
    fullName: PropTypes.string,
    phone: PropTypes.string,
  }).isRequired,
  onChange: PropTypes.func.isRequired,
};

export default PrimaryFields;
