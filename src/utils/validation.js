const normalizePhone = (phone) => {
  return phone.replace(/\D/g, "").replace(/^(?:0098|98)/, "0");
};

const validation = (name, value) => {
  switch (name) {
    case "fullName":
      if (!value.trim()) return "Full name is required";
      if (value.trim().length < 3) return "Name must be at least 3 characters";
      return "";
    case "email":
      if (!value.trim()) return "";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
        return "Invalid email address";
      return "";
    case "phone": {
      if (!value.trim()) return "Phone number is required";
      const normalizedPhone = normalizePhone(value);
      if (!/^09\d{9}$/.test(normalizedPhone))
        return "Enter a valid Iranian mobile number";
      return "";
    }
    default:
      return "";
  }
};

const validateNoRepeat = (name, value, selectedContact) => {
  if (name === "phone" && value.trim()) {
    const contacts = JSON.parse(localStorage.getItem("contacts") || "[]");
    const normalizedValue = normalizePhone(value);
    const isDuplicate = contacts.some(
      (contact) =>
        normalizePhone(contact.phone) === normalizedValue &&
        contact.id !== selectedContact?.id,
    );
    return isDuplicate ? "This phone is already in use." : "";
  }
  return "";
};
export { validation, validateNoRepeat, normalizePhone };
