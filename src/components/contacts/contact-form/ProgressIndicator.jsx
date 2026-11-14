import PropTypes from "prop-types";
import { FiCheck } from "react-icons/fi";

const steps = ["Details", "More info", "Avatar"];

function ProgressIndicator({ step }) {
  return (
    <div className="mb-6 px-2">
      <div className="relative flex items-center justify-between">
        <div className="absolute left-4 right-4 top-4 h-0.5 bg-slate-200 dark:bg-slate-700">
          <div
            className="h-full bg-sky-500 transition-[width] duration-500 ease-in-out"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
        {steps.map((label, index) => {
          const number = index + 1;
          const isComplete = step > number;
          const isActive = step === number;

          return (
            <div
              key={label}
              className="relative z-10 flex min-w-0 flex-col items-center gap-2"
            >
              <span
                className={`flex h-8 w-8 items-center justify-center rounded-full border-2 text-xs font-semibold transition-colors duration-300 ${
                  isComplete || isActive
                    ? "border-sky-500 bg-sky-500 text-white"
                    : "border-slate-300 bg-white text-slate-500 dark:border-slate-600 dark:bg-slate-900 dark:text-slate-400"
                }`}
                aria-current={isActive ? "step" : undefined}
              >
                {isComplete ? <FiCheck aria-hidden="true" size={15} /> : number}
              </span>
              <span
                className={`text-xs font-medium ${
                  isActive
                    ? "text-sky-600 dark:text-sky-400"
                    : "text-slate-500 dark:text-slate-400"
                }`}
              >
                {label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

ProgressIndicator.propTypes = {
  step: PropTypes.number.isRequired,
};

export default ProgressIndicator;
