import PropTypes from "prop-types";
import EditContact from "../contacts/EditContact";
import DeleteContact from "../contacts/DeleteContact";
import { useEffect, useState } from "react";
import GroupDelete from "../contacts/GroupDelete";
import { useNavigate } from "react-router-dom";
import SortedList from "../contacts/SortedList";
import Pagination from "../elements/Pagination";
import ContactAvatar from "../elements/ContactAvatar";
import {
  FiCheckCircle,
  FiGrid,
  FiHeart,
  FiList,
  FiRotateCcw,
  FiTrash2,
} from "react-icons/fi";

function ContactsList({
  activeView,
  contacts,
  onSave,
  onDelete,
  onToggleFavorite,
  onRestore,
  onPermanentlyDelete,
}) {
  const navigate = useNavigate();
  const [isSelectMode, setIsSelectMode] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [sortType, setSortType] = useState("date-desc");
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const [viewContact, setViewContact] = useState("grid");

  const selectUserHandler = (id) => {
    setSelectedUsers((prev) => {
      if (prev.includes(id)) {
        return prev.filter((userId) => userId !== id);
      }
      return [...prev, id];
    });
  };

  const groupDeleteHandler = (ids) => {
    onDelete(ids);
    setSelectedUsers([]);
    setIsSelectMode(false);
  };

  const sortedContacts = [...contacts].sort((a, b) => {
    switch (sortType) {
      case "name-asc":
        return a.fullName.localeCompare(b.fullName);
      case "name-desc":
        return b.fullName.localeCompare(a.fullName);
      case "date-desc":
        return new Date(b.createdAt) - new Date(a.createdAt);
      case "date-asc":
        return new Date(a.createdAt) - new Date(b.createdAt);
      default:
        return 0;
    }
  });

  const totalPages = Math.ceil(sortedContacts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedContacts = sortedContacts.slice(startIndex, endIndex);
  const viewTitles = {
    contacts: "Directory",
    favorites: "Favorites",
    trash: "Trash",
  };

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(Math.max(totalPages, 1));
    }
  }, [currentPage, totalPages]);

  useEffect(() => {
    setIsSelectMode(false);
    setSelectedUsers([]);
  }, [activeView]);

  return (
    <section className="mt-0 w-full rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition-colors dark:border-slate-800 dark:bg-slate-900 sm:p-6">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <h2 className="text-lg font-bold tracking-tight text-slate-900 dark:text-white sm:text-xl">
          {viewTitles[activeView]}
        </h2>
        <div className="flex max-w-full flex-wrap justify-end gap-2 sm:gap-3">
          {isSelectMode ? (
            <GroupDelete
              selectedUsers={selectedUsers}
              onDelete={groupDeleteHandler}
              iconOnly={viewContact === "grid"}
            />
          ) : (
            <div className="flex rounded-xl border border-slate-200 p-1 dark:border-slate-700">
              <button
                type="button"
                onClick={() => setViewContact("grid")}
                aria-label="Grid view"
                aria-pressed={viewContact === "grid"}
                className={`rounded-lg p-1.5 transition ${viewContact === "grid" ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                <FiGrid aria-hidden="true" size={18} />
              </button>
              <button
                type="button"
                onClick={() => setViewContact("flex")}
                aria-label="List view"
                aria-pressed={viewContact === "flex"}
                className={`rounded-lg p-1.5 transition ${viewContact === "flex" ? "bg-slate-100 text-slate-900 dark:bg-slate-700 dark:text-white" : "text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"}`}
              >
                <FiList aria-hidden="true" size={18} />
              </button>
            </div>
          )}
          <SortedList
            isSortOpen={isSortOpen}
            setIsSortOpen={setIsSortOpen}
            sortType={sortType}
            setSortType={setSortType}
          />

          {activeView !== "trash" && (
            <button
              type="button"
              onClick={() => {
                setIsSelectMode(!isSelectMode);
                setSelectedUsers([]);
              }}
              className={`rounded-xl px-3 py-2 text-sm font-medium transition ${isSelectMode ? "bg-rose-50 text-rose-700 dark:bg-rose-400/10 dark:text-rose-300" : "text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"}`}
            >
              {isSelectMode ? "Cancel" : "Select"}
            </button>
          )}
        </div>
      </div>

      {isSelectMode && activeView !== "trash" && (
        <p className="mb-4 rounded-xl bg-sky-50 px-4 py-3 text-sm font-medium text-sky-800 dark:bg-sky-400/10 dark:text-sky-200">
          Select contacts by clicking them. {selectedUsers.length} selected.
        </p>
      )}
      {paginatedContacts.length === 0 ? (
        <p className="rounded-2xl border border-dashed border-slate-300 px-4 py-12 text-center text-sm text-slate-500 dark:border-slate-700 dark:text-slate-400">
          {activeView === "trash"
            ? "Your trash is empty."
            : activeView === "favorites"
              ? "You have no favorite contacts yet."
              : "No contacts found."}
        </p>
      ) : (
        <div
          className={
            viewContact === "grid"
              ? "grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
              : "space-y-3"
          }
        >
          {paginatedContacts.map((contact) => {
            const isSelected = selectedUsers.includes(contact.id);
            const isTrashView = activeView === "trash";
            const isGridView = viewContact === "grid";
            return (
              <div
                key={contact.id}
                className={`min-w-0 rounded-2xl border p-4 transition sm:p-5 ${
                  isSelected
                    ? "border-sky-300 bg-sky-50 dark:border-sky-500/60 dark:bg-sky-400/10"
                    : "border-slate-200 hover:border-sky-200 hover:bg-slate-50 dark:border-slate-700 dark:hover:border-slate-600 dark:hover:bg-slate-800/70"
                } ${
                  isGridView
                    ? "flex flex-col gap-4"
                    : "grid grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-3 sm:gap-x-5"
                }`}
              >
                <div
                  onClick={() =>
                    isSelectMode && !isTrashView
                      ? selectUserHandler(contact.id)
                      : !isTrashView && navigate(`/contacts/${contact.id}`)
                  }
                  onKeyDown={(event) => {
                    if (
                      !isTrashView &&
                      (event.key === "Enter" || event.key === " ")
                    ) {
                      event.preventDefault();
                      if (isSelectMode) {
                        selectUserHandler(contact.id);
                      } else {
                        navigate(`/contacts/${contact.id}`);
                      }
                    }
                  }}
                  role={isTrashView ? undefined : "button"}
                  tabIndex={isTrashView ? -1 : 0}
                  className={`flex min-w-0 items-center gap-3 sm:gap-4 ${isTrashView ? "cursor-default" : "cursor-pointer"}`}
                >
                  <div
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl text-sm font-semibold transition ${isSelected ? "bg-sky-200 text-sky-800 dark:bg-sky-400/20 dark:text-sky-200" : "bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-200"}`}
                  >
                    {isSelected ? (
                      <FiCheckCircle aria-label="Selected" size={22} />
                    ) : (
                      <ContactAvatar
                        avatar={contact.avatar}
                        fullName={contact.fullName}
                        size="sm"
                        className="h-12 w-12 rounded-2xl"
                      />
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-semibold text-slate-900 dark:text-slate-100">
                      {contact.fullName}
                    </p>
                    <p className="mt-0.5 truncate text-sm text-slate-500 dark:text-slate-400">
                      ({contact.job || "No job title"})
                    </p>
                    <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                      {contact.phone}
                    </p>
                  </div>
                  {!isGridView && (
                    <div className="hidden min-w-0 flex-1 grid-cols-2 gap-x-4 gap-y-1.5 border-l border-slate-200 pl-4 text-xs text-slate-500 dark:border-slate-700 dark:text-slate-400 sm:grid">
                      <p className="truncate">{contact.email || "No email"}</p>
                      <p className="truncate">{contact.company || "No company"}</p>
                    </div>
                  )}
                </div>
                <div
                  className={`flex items-center gap-1 sm:gap-2 ${
                    isGridView
                      ? "justify-end"
                      : "col-start-1 col-end-3 justify-end border-t border-slate-100 pt-2 dark:border-slate-800 sm:col-start-2 sm:col-end-3 sm:border-0 sm:pt-0"
                  }`}
                >
                  {isTrashView ? (
                    <>
                      <button
                        type="button"
                        onClick={() => onRestore(contact.id)}
                        aria-label={`Restore ${contact.fullName}`}
                        title="Restore contact"
                        className="inline-flex items-center gap-2 rounded-lg p-2 text-emerald-700 hover:bg-emerald-50 dark:text-emerald-300 dark:hover:bg-emerald-400/10"
                      >
                        <FiRotateCcw aria-hidden="true" size={18} />
                        {!isGridView && <span className="hidden lg:inline">Restore</span>}
                      </button>
                      <button
                        type="button"
                        onClick={() => onPermanentlyDelete(contact.id)}
                        aria-label={`Delete ${contact.fullName} permanently`}
                        title="Delete permanently"
                        className="inline-flex items-center gap-2 rounded-lg p-2 text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-400/10"
                      >
                        <FiTrash2 aria-hidden="true" size={18} />
                        {!isGridView && <span className="hidden lg:inline">Delete</span>}
                      </button>
                    </>
                  ) : (
                    <>
                      {!isSelectMode && (
                        <>
                          <button
                            type="button"
                            onClick={() => onToggleFavorite(contact.id)}
                            aria-label={
                              contact.isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                            title={
                              contact.isFavorite
                                ? "Remove from favorites"
                                : "Add to favorites"
                            }
                            className={`inline-flex items-center gap-2 rounded-lg p-2 transition ${contact.isFavorite ? "bg-rose-50 text-rose-600 hover:bg-rose-100 dark:bg-rose-400/10 dark:text-rose-300 dark:hover:bg-rose-400/20" : "text-slate-500 hover:bg-slate-100 dark:text-slate-400 dark:hover:bg-slate-700"}`}
                          >
                            <FiHeart
                              aria-hidden="true"
                              size={18}
                              fill={contact.isFavorite ? "currentColor" : "none"}
                            />
                            {!isGridView && (
                              <span className="hidden lg:inline">
                                {contact.isFavorite
                                  ? "Favorite"
                                  : "Add favorite"}
                              </span>
                            )}
                          </button>
                          <EditContact
                            contact={contact}
                            onSave={onSave}
                            iconOnly={viewContact === "grid"}
                          />
                          <DeleteContact
                            contact={contact}
                            onDelete={onDelete}
                            iconOnly={viewContact === "grid"}
                          />
                        </>
                      )}
                      {isSelectMode && (
                        <span className="text-xs font-medium text-slate-500">
                          {isSelected ? "Selected" : "Click to select"}
                        </span>
                      )}
                    </>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}
      {sortedContacts.length > 0 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          sortedContacts={sortedContacts}
          startIndex={startIndex}
          endIndex={endIndex}
          totalPages={totalPages}
        />
      )}
    </section>
  );
}

export default ContactsList;

ContactsList.propTypes = {
  activeView: PropTypes.oneOf(["contacts", "favorites", "trash"]).isRequired,
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      fullName: PropTypes.string.isRequired,
      job: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
    }),
  ).isRequired,
  onSave: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onToggleFavorite: PropTypes.func.isRequired,
  onRestore: PropTypes.func.isRequired,
  onPermanentlyDelete: PropTypes.func.isRequired,
};
