import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ContactDetails from "./components/contacts/ContactDetails";
import { useEffect, useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function App() {
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark",
  );
  const [contacts, setContacts] = useState(() => {
    return JSON.parse(localStorage.getItem("contacts") || "[]");
  });

  useEffect(() => {
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  const saveContact = (formData, selectedContact) => {
    if (selectedContact) {
      setContacts((prevContacts) =>
        prevContacts.map((contact) =>
          contact.id === selectedContact.id
            ? {
                ...contact,
                ...formData,
                updatedAt: new Date().toISOString(),
              }
            : contact,
        ),
      );
      toast.success("Contact Updated");
      return;
    }
    const newContact = {
      ...formData,
      id: crypto.randomUUID(),
      createdAt: new Date().toISOString(),
      updatedAt: null,
      isDeleted: false,
    };
    setContacts((prevContacts) => [...prevContacts, newContact]);
    toast.success("Contact Created");
  };

  const deleteContacts = (ids) => {
    const selectedIds = Array.isArray(ids) ? ids : [ids];
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        selectedIds.includes(contact.id)
          ? { ...contact, isDeleted: true }
          : contact,
      ),
    );
    toast.success("Contact(s) moved to trash!");
  };
  const restoreContacts = (ids) => {
    const selectedIds = Array.isArray(ids) ? ids : [ids];
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        selectedIds.includes(contact.id)
          ? { ...contact, isDeleted: false }
          : contact,
      ),
    );
    toast.success("Contact Restored");
  };
  const permanentlyDelete = (ids) => {
    const selectedIds = Array.isArray(ids) ? ids : [ids];
    setContacts((prevContacts) =>
      prevContacts.filter((contact) => !selectedIds.includes(contact.id)),
    );
    toast.success("Contact Deleted Permanently");
  };
  const toggleFavorite = (id) => {
    setContacts((prevContacts) =>
      prevContacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact,
      ),
    );
  };
  return (
    <BrowserRouter>
      <div
        className={`${isDarkMode ? "dark bg-slate-950 text-slate-100" : "bg-slate-100 text-slate-900"} min-h-screen transition-colors`}
      >
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout
                contacts={contacts}
                saveContact={saveContact}
                toggleFavorite={toggleFavorite}
                deleteContacts={deleteContacts}
                restoreContacts={restoreContacts}
                permanentlyDelete={permanentlyDelete}
                isDarkMode={isDarkMode}
                onToggleTheme={() => setIsDarkMode((mode) => !mode)}
              />
            }
          />
          <Route
            path="/contacts/:id"
            element={
              <ContactDetails
                contacts={contacts}
                saveContact={saveContact}
                deleteContacts={deleteContacts}
                toggleFavorite={toggleFavorite}
              />
            }
          />
        </Routes>
      </div>
      <Toaster theme={isDarkMode ? "dark" : "light"} />
    </BrowserRouter>
  );
}
export default App;
