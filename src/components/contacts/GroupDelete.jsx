import { useState } from "react";
import DeleteModal from "../modal/DeleteModal";
import PropTypes from "prop-types";
import { FiTrash2 } from "react-icons/fi";

function GroupDelete({ selectedUsers, onDelete, iconOnly = false }) {
  const [modalOpen, setModalOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        onClick={() => setModalOpen(true)}
        aria-label={`Delete ${selectedUsers.length} selected contacts`}
        title="Delete selected contacts"
        disabled={selectedUsers.length === 0}
        className="inline-flex items-center gap-2 rounded-xl border border-rose-200 px-3 py-2 text-sm font-medium text-rose-600 transition hover:bg-rose-50 disabled:cursor-not-allowed disabled:opacity-30 dark:border-rose-400/20 dark:text-rose-300 dark:hover:bg-rose-400/10"
      >
        <FiTrash2 aria-hidden="true" size={18} />
        {!iconOnly && <span>Delete {selectedUsers.length} selected</span>}
      </button>
      {modalOpen && (
        <DeleteModal
          selectedUsers={selectedUsers}
          isGroupDelete={true}
          onConfirm={() => onDelete(selectedUsers)}
          setModalOpen={setModalOpen}
        />
      )}
    </>
  );
}
export default GroupDelete;

GroupDelete.propTypes = {
  selectedUsers: PropTypes.arrayOf(PropTypes.string).isRequired,
  onDelete: PropTypes.func.isRequired,
  iconOnly: PropTypes.bool,
};
