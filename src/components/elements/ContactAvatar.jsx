import PropTypes from "prop-types";
import { CONTACT_AVATARS } from "./contactAvatars";

function ContactAvatar({ avatar, fullName, size = "md", className = "" }) {
  const selectedAvatar = CONTACT_AVATARS.find((item) => item.id === avatar);
  const sizeClasses = {
    sm: "h-12 w-12 rounded-2xl text-lg",
    md: "h-20 w-20 rounded-3xl text-3xl",
    lg: "h-24 w-24 rounded-[2rem] text-4xl",
  };

  return (
    <div
      className={`flex shrink-0 items-center justify-center font-bold ${sizeClasses[size]} ${className}`}
      style={
        selectedAvatar
          ? {
              backgroundColor: selectedAvatar.background,
              color: selectedAvatar.color,
            }
          : undefined
      }
      aria-label={selectedAvatar ? `${selectedAvatar.label} avatar` : undefined}
    >
      {selectedAvatar ? (
        <span aria-hidden="true">{selectedAvatar.emoji}</span>
      ) : (
        fullName
          .trim()
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase()
      )}
    </div>
  );
}

ContactAvatar.propTypes = {
  avatar: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["sm", "md", "lg"]),
  className: PropTypes.string,
};

export default ContactAvatar;
