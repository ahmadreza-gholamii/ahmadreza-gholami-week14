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
      const phoneRegex = /^(?:(?:\+|00)98|98|0)?9\d{9}$/;
      const normalizedPhone = value.replace(/[\s()-]/g, "");
      if (!phoneRegex.test(normalizedPhone))
        return "Enter a valid Iranian mobile number";
      return "";
    }
    default:
      return "";
  }
};

const validateNoRepeat = (name, value, selectedContact) => {
  if (name === "phone" && value.trim()) {
    const isDuplicate = JSON.parse(
      localStorage.getItem("contacts") || "[]",
    ).some(
      (contact) =>
        contact.phone === value && contact.id !== selectedContact?.id,
    );
    return isDuplicate ? "This phone is already in use." : "";
  }
  return "";
};

export { validation, validateNoRepeat };
