import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

function DeleteModal({
  user,
  selectedUsers = [],
  isGroupDelete = false,
  onConfirm,
  setModalOpen,
}) {
  const navigate = useNavigate();
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setModalOpen(false);
    }
  };
  return (
    <div
      onClick={handleBackdropClick}
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/50 p-4 backdrop-blur-sm"
    >
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-6 shadow-2xl dark:border-slate-700 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
          Confirm deletion
        </h2>
        <p className="mt-3 text-sm leading-6 text-slate-600 dark:text-slate-300">
          {isGroupDelete
            ? `Are you sure you want to delete ${selectedUsers.length} selected contacts?`
            : `Are you sure you want to delete ${user?.fullName}?`}
        </p>
        <div className="mt-6 flex justify-end gap-2">
          <button
            onClick={() => setModalOpen(false)}
            className="rounded-xl bg-slate-100 px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-200 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              setModalOpen(false);
              navigate("/");
            }}
            className="rounded-xl bg-rose-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-rose-500"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
export default DeleteModal;

DeleteModal.propTypes = {
  user: PropTypes.shape({ fullName: PropTypes.string }),
  selectedUsers: PropTypes.arrayOf(PropTypes.string),
  isGroupDelete: PropTypes.bool,
  onConfirm: PropTypes.func.isRequired,
  setModalOpen: PropTypes.func.isRequired,
};
