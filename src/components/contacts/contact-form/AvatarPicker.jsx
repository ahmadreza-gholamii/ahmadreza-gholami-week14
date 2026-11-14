import PropTypes from "prop-types";
import ContactAvatar from "../../elements/ContactAvatar";
import { CONTACT_AVATARS } from "../../elements/contactAvatars";

function AvatarPicker({ value, fullName, onChange, compact = false }) {
  return (
    <div>
      {!compact && (
        <div className="mb-5 flex flex-col items-center gap-3">
          <ContactAvatar avatar={value} fullName={fullName} size="md" />
          <div className="text-center">
            <p className="font-semibold text-slate-900 dark:text-white">
              Choose an avatar
            </p>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
              Or keep your initials as the avatar.
            </p>
          </div>
        </div>
      )}
      {compact && (
        <div className="mb-3 flex items-center gap-3">
          <ContactAvatar
            avatar={value}
            fullName={fullName}
            size="sm"
            className="h-10 w-10 rounded-xl"
          />
          <p className="text-sm font-medium text-slate-700 dark:text-slate-200">
            Avatar
          </p>
        </div>
      )}
      <div className="grid grid-cols-4 gap-2 sm:grid-cols-7">
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Use initials"
          aria-pressed={!value}
          className={`flex h-12 items-center justify-center rounded-xl border text-xs font-semibold text-slate-600 transition dark:text-slate-300 ${
            !value
              ? "border-sky-500 bg-sky-50 ring-2 ring-sky-100 dark:bg-sky-500/10 dark:ring-sky-500/20"
              : "border-slate-200 hover:border-sky-300 dark:border-slate-700"
          }`}
        >
          Aa
        </button>
        {CONTACT_AVATARS.map(({ id, label, emoji }) => (
          <button
            key={id}
            type="button"
            onClick={() => onChange(id)}
            aria-label={`${label} avatar`}
            aria-pressed={value === id}
            className={`flex h-12 items-center justify-center rounded-xl border text-2xl transition ${
              value === id
                ? "border-sky-500 bg-sky-50 ring-2 ring-sky-100 dark:bg-sky-500/10 dark:ring-sky-500/20"
                : "border-slate-200 hover:border-sky-300 dark:border-slate-700"
            }`}
          >
            {emoji}
          </button>
        ))}
      </div>
    </div>
  );
}

AvatarPicker.propTypes = {
  value: PropTypes.string,
  fullName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  compact: PropTypes.bool,
};

export default AvatarPicker;
