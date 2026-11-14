import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { validateNoRepeat, validation } from "../../utils/validation";
import ProgressIndicator from "./contact-form/ProgressIndicator";
import PrimaryFields from "./contact-form/PrimaryFields";
import OptionalFields from "./contact-form/OptionalFields";
import AvatarPicker from "./contact-form/AvatarPicker";
import FormActions from "./contact-form/FormActions";

const initialFormData = {
  fullName: "",
  phone: "",
  email: "",
  company: "",
  job: "",
  notes: "",
  avatar: "",
  isFavorite: false,
};

const initialErrors = { fullName: "", email: "", phone: "" };

function ContactForm({ setModalOpen, selectedContact, onSave }) {
  const isEditing = Boolean(selectedContact);
  const [formData, setFormData] = useState(initialFormData);
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState(initialErrors);

  useEffect(() => {
    setErrors(initialErrors);
    setStep(1);
    setFormData(
      selectedContact
        ? { ...initialFormData, ...selectedContact }
        : initialFormData,
    );
  }, [selectedContact]);

  const changeHandler = (event) => {
    const { name, value } = event.target;
    setFormData((previous) => ({ ...previous, [name]: value }));
    if (name in errors) {
      setErrors((previous) => ({
        ...previous,
        [name]: validation(name, value),
      }));
    }
  };

  const validateFields = (fields) => {
    const newErrors = { ...errors };
    fields.forEach((field) => {
      newErrors[field] = validation(field, formData[field]);
    });
    setErrors(newErrors);
    return fields.every((field) => !newErrors[field]);
  };

  const validatePhoneIsUnique = () => {
    const phoneError = validateNoRepeat(
      "phone",
      formData.phone,
      selectedContact,
    );
    setErrors((previous) => ({ ...previous, phone: phoneError }));
    return !phoneError;
  };

  const submitHandler = (event) => {
    event.preventDefault();
    if (!validateFields(["fullName", "phone", "email"])) return;
    if (!validatePhoneIsUnique()) return;

    onSave(formData, selectedContact);
    setModalOpen(false);
  };

  const goToOptionalStep = () => {
    if (
      validateFields(["fullName", "phone"]) &&
      validatePhoneIsUnique()
    ) {
      setStep(2);
    }
  };

  const goToAvatarStep = () => {
    if (!formData.email.trim() || !validation("email", formData.email)) {
      setStep(3);
    } else {
      setErrors((previous) => ({
        ...previous,
        email: validation("email", formData.email),
      }));
    }
  };

  const setAvatar = (avatar) => {
    setFormData((previous) => ({ ...previous, avatar }));
  };

  const optionalValues = ["email", "company", "job", "notes"];
  const hasOptionalValue = optionalValues.some((field) =>
    formData[field].trim(),
  );
  const actionMode = isEditing
    ? "edit"
    : step === 1
      ? "first"
      : step === 2
        ? "optional"
        : "avatar";
  const primaryLabel = isEditing
    ? "Save changes"
    : step === 1
      ? "Next"
      : step === 2
        ? hasOptionalValue
          ? "Next"
          : "Skip"
        : "Create";

  return (
    <form onSubmit={submitHandler}>
      {!isEditing && <ProgressIndicator step={step} />}

      <div
        key={isEditing ? "edit" : step}
        className="wizard-slide-in min-h-57.5"
        aria-live="polite"
      >
        {isEditing ? (
          <div className="grid gap-x-4 gap-y-4 sm:grid-cols-2">
            <PrimaryFields
              formData={formData}
              errors={errors}
              onChange={changeHandler}
            />
            <div className="sm:col-span-2">
              <OptionalFields
                formData={formData}
                errors={errors}
                onChange={changeHandler}
              />
            </div>
            <div className="sm:col-span-2">
              <AvatarPicker
                value={formData.avatar}
                fullName={formData.fullName || "Contact"}
                onChange={setAvatar}
                compact
              />
            </div>
          </div>
        ) : step === 1 ? (
          <div className="grid gap-4 sm:grid-cols-2">
            <PrimaryFields
              formData={formData}
              errors={errors}
              onChange={changeHandler}
            />
          </div>
        ) : step === 2 ? (
          <OptionalFields
            formData={formData}
            errors={errors}
            onChange={changeHandler}
          />
        ) : (
          <AvatarPicker
            value={formData.avatar}
            fullName={formData.fullName || "New contact"}
            onChange={setAvatar}
          />
        )}
      </div>

      <FormActions
        mode={actionMode}
        primaryLabel={primaryLabel}
        onCancel={() => setModalOpen(false)}
        onBack={step > 1 && !isEditing ? () => setStep(step - 1) : undefined}
        onPrimary={step === 1 ? goToOptionalStep : goToAvatarStep}
      />
    </form>
  );
}

export default ContactForm;

ContactForm.propTypes = {
  setModalOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedContact: PropTypes.shape({
    id: PropTypes.string,
    fullName: PropTypes.string,
    phone: PropTypes.string,
    email: PropTypes.string,
    company: PropTypes.string,
    job: PropTypes.string,
    notes: PropTypes.string,
    avatar: PropTypes.string,
    isFavorite: PropTypes.bool,
  }),
};
