import { useNavigate, useParams } from "react-router-dom";
import EditContact from "./EditContact";
import DeleteContact from "./DeleteContact";
import PropTypes from "prop-types";
import {
  FiArrowLeft,
  FiBriefcase,
  FiHeart,
  FiMail,
  FiPhone,
  FiUser,
} from "react-icons/fi";
import ContactAvatar from "../elements/ContactAvatar";

function ContactDetails({
  contacts,
  saveContact,
  deleteContacts,
  toggleFavorite,
}) {
  const { id } = useParams();
  const navigate = useNavigate();

  const contact = contacts.find((contact) => contact.id === id);

  if (!contact) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-slate-100 px-5 text-slate-900 dark:bg-slate-950 dark:text-white">
        <h1 className="text-2xl font-bold">Contact not found</h1>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="rounded-xl bg-sky-600 px-4 py-2.5 text-sm font-semibold text-white hover:bg-sky-500"
        >
          Go back to contacts
        </button>
      </div>
    );
  }

  const details = [
    { label: "Phone", value: contact.phone || "Not provided", Icon: FiPhone },
    { label: "Email", value: contact.email || "Not provided", Icon: FiMail },
    { label: "Company", value: contact.company || "Not provided", Icon: FiBriefcase },
    { label: "Job title", value: contact.job || "Not provided", Icon: FiUser },
  ];

  return (
    <main className="min-h-screen bg-slate-100 px-4 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <button
          type="button"
          onClick={() => navigate("/")}
          className="mb-5 inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-800 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
        >
          <FiArrowLeft aria-hidden="true" size={16} />
          Back to contacts
        </button>
        <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <div className="bg-linear-to-br from-sky-600 to-indigo-700 px-6 py-8 text-white sm:px-8">
            <div className="flex flex-col items-start gap-5 sm:flex-row sm:items-center">
              <ContactAvatar
                avatar={contact.avatar}
                fullName={contact.fullName}
                size="md"
                className="h-20 w-20 ring-1 ring-white/40"
              />
              <div className="min-w-0">
                <p className="text-sm font-medium text-sky-100">Contact profile</p>
                <h1 className="mt-1 wrap-break-words text-2xl font-bold sm:text-3xl">{contact.fullName}</h1>
                <p className="mt-1 text-sky-100">{contact.job || "No job title"}{contact.company ? ` · ${contact.company}` : ""}</p>
              </div>
              <button
                type="button"
                onClick={() => toggleFavorite(contact.id)}
                aria-pressed={Boolean(contact.isFavorite)}
                aria-label={
                  contact.isFavorite
                    ? "Remove from favorites"
                    : "Add to favorites"
                }
                className={`inline-flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition sm:ml-auto ${
                  contact.isFavorite
                    ? "bg-white text-rose-600 shadow-sm hover:bg-rose-50"
                    : "bg-white/15 text-white ring-1 ring-white/30 hover:bg-white/25"
                }`}
              >
                <FiHeart
                  aria-hidden="true"
                  size={16}
                  fill={contact.isFavorite ? "currentColor" : "none"}
                />
                {contact.isFavorite ? "Favorited" : "Add to favorites"}
              </button>
            </div>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid gap-3 sm:grid-cols-2">
              {details.map(({ label, value, Icon }) => (
                <div key={label} className="flex min-w-0 items-center gap-3 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-sky-600 shadow-sm dark:bg-slate-700 dark:text-sky-300">
                    <Icon aria-hidden="true" size={18} />
                  </span>
                  <div className="min-w-0">
                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{label}</p>
                    <p className="mt-0.5 truncate text-sm font-semibold text-slate-800 dark:text-slate-100">{value}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-800/60">
              <h2 className="text-sm font-semibold text-slate-800 dark:text-slate-100">Notes</h2>
              <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-slate-600 dark:text-slate-300">{contact.notes || "No notes added."}</p>
            </div>
            <div className="mt-6 flex flex-wrap justify-end gap-2 border-t border-slate-100 pt-5 dark:border-slate-800">
              <EditContact contact={contact} onSave={saveContact} />
              <DeleteContact contact={contact} onDelete={deleteContacts} />
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}

export default ContactDetails;

ContactDetails.propTypes = {
  contacts: PropTypes.array.isRequired,
  saveContact: PropTypes.func.isRequired,
  deleteContacts: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
};
