import { useState } from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import ContactsList from "./ContactsList";
import PropTypes from "prop-types";
import Modal from "../modal/Modal";

function MainLayout({
  contacts,
  saveContact,
  deleteContacts,
  toggleFavorite,
  restoreContacts,
  permanentlyDelete,
  isDarkMode,
  onToggleTheme,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeView, setActiveView] = useState("contacts");
  const [addModalOpen, setAddModalOpen] = useState(false);

  const visibleContacts = contacts.filter((contact) => {
    if (activeView === "trash") return contact.isDeleted;
    if (contact.isDeleted) return false;
    if (activeView === "favorites") return contact.isFavorite;
    return true;
  });

  const filteredContacts = visibleContacts.filter((contact) => {
    const query = searchQuery.toLowerCase().trim();
    if (!query) return true;
    return Object.values(contact).some((value) => {
      if (value === null || value === undefined) return false;
      return String(value).toLowerCase().includes(query);
    });
  });

  return (
    <main className="min-h-screen bg-slate-100 p-3 transition-colors dark:bg-slate-950 sm:p-6 lg:p-8">
      <div className="mx-auto flex max-w-7xl flex-col items-stretch gap-5 lg:flex-row lg:items-start lg:gap-6">
        <Sidebar
          contacts={contacts}
          activeView={activeView}
          onViewChange={setActiveView}
          onAddContact={() => setAddModalOpen(true)}
          isDarkMode={isDarkMode}
          onToggleTheme={onToggleTheme}
        />
        <div className="flex w-full flex-col gap-4">
          <Header
            searchQuery={searchQuery}
            onSearch={setSearchQuery}
            onAddContact={() => setAddModalOpen(true)}
          />
          <ContactsList
            activeView={activeView}
            contacts={filteredContacts}
            onSave={saveContact}
            onDelete={deleteContacts}
            onToggleFavorite={toggleFavorite}
            onRestore={restoreContacts}
            onPermanentlyDelete={permanentlyDelete}
          />
        </div>
      </div>
      {addModalOpen && (
        <Modal
          title="Add Contact"
          setModalOpen={setAddModalOpen}
          onSave={saveContact}
        />
      )}
    </main>
  );
}
export default MainLayout;
MainLayout.propTypes = {
  contacts: PropTypes.array.isRequired,
  saveContact: PropTypes.func.isRequired,
  deleteContacts: PropTypes.func.isRequired,
  toggleFavorite: PropTypes.func.isRequired,
  restoreContacts: PropTypes.func.isRequired,
  permanentlyDelete: PropTypes.func.isRequired,
  isDarkMode: PropTypes.bool.isRequired,
  onToggleTheme: PropTypes.func.isRequired,
};
