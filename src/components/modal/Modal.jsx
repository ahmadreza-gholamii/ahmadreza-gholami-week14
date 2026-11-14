import PropTypes from "prop-types";
import ContactForm from "../contacts/ContactForm";

function Modal({ title, setModalOpen, selectedContact, onSave }) {
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };

  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/50 p-3 backdrop-blur-sm sm:p-4"
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="contact-modal-title"
        className={`my-auto w-full max-w-2xl rounded-3xl border border-sky-400 bg-white p-4 shadow-2xl dark:border-sky-500/70 dark:bg-slate-900 sm:p-6 ${
          selectedContact
            ? "max-sm:max-h-[calc(100dvh-1.5rem)] max-sm:overflow-y-auto"
            : "max-h-[92vh] overflow-y-auto"
        }`}
      >
        <div className="mb-5">
          <h2
            id="contact-modal-title"
            className="text-xl font-bold tracking-tight text-slate-900 dark:text-white"
          >
            {title}
          </h2>
          <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
            {selectedContact
              ? "Update your contact details."
              : "Add a new contact to your address book."}
          </p>
        </div>
        <ContactForm
          setModalOpen={setModalOpen}
          selectedContact={selectedContact}
          onSave={onSave}
        />
      </div>
    </div>
  );
}
export default Modal;

Modal.propTypes = {
  title: PropTypes.string.isRequired,
  setModalOpen: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  selectedContact: PropTypes.shape({
    fullName: PropTypes.string,
    phone: PropTypes.string,
  }),
};
