import { useState } from "react";
import Modal from "../modal/Modal";
import PropTypes from "prop-types";
import { FiEdit2 } from "react-icons/fi";

function EditContact({ contact, onSave, iconOnly = false }) {
  const [editModalOpen, setEditModalOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setEditModalOpen(true)}
        aria-label={`Edit ${contact.fullName}`}
        title="Edit contact"
        className="inline-flex items-center gap-2 rounded-xl border border-slate-200 px-3 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-50 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
      >
        <FiEdit2 aria-hidden="true" size={18} />
        {!iconOnly && <span className="hidden lg:inline">Edit</span>}
      </button>
      {editModalOpen && (
        <Modal
          title="Edit Contact"
          setModalOpen={setEditModalOpen}
          selectedContact={contact}
          onSave={onSave}
        />
      )}
    </>
  );
}

export default EditContact;

EditContact.propTypes = {
  contact: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    job: PropTypes.string.isRequired,
    phone: PropTypes.string.isRequired,
  }).isRequired,
  onSave: PropTypes.func.isRequired,
  iconOnly: PropTypes.bool,
};
