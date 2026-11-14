import { useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import propTypes from "prop-types";
import { FiTrash2 } from "react-icons/fi";

function DeleteContact({ contact, onDelete, iconOnly = false }) {
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setDeleteModalOpen(true)}
        aria-label={`Delete ${contact.fullName}`}
        title="Delete contact"
        className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 dark:border-rose-400/20 dark:text-rose-300 dark:hover:bg-rose-400/10"
      >
        <FiTrash2 aria-hidden="true" size={18} />
        {!iconOnly && <span className="hidden lg:inline">Delete</span>}
      </button>
      {deleteModalOpen && (
        <DeleteModal
          user={contact}
          onConfirm={() => onDelete(contact.id)}
          setModalOpen={setDeleteModalOpen}
        />
      )}
    </>
  );
}

export default DeleteContact;

DeleteContact.propTypes = {
  contact: propTypes.object.isRequired,
  onDelete: propTypes.func.isRequired,
  iconOnly: propTypes.bool,
};
