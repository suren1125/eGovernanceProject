import { useState } from "react";

function ModalForm({
  onSubmit,
  fields,
  defaultValue,
  closeModal,
  validateFormCustom,
}) {
  const [formState, setFormState] = useState(defaultValue);
  const [errors, setErrors] = useState("");

  // Generic form validation
  const validateForm = () => {
    if (validateFormCustom) {
      // Use custom validation if provided
      const validationErrors = validateFormCustom(formState);
      console.log(validationErrors);
      if (validationErrors) {
        setErrors(validationErrors.join(", "));
        return false;
      }
    } else {
      const errorFields = Object.entries(formState)
        .filter(([key, value]) => !value)
        .map(([key]) => key);
      if (errorFields.length > 0) {
        setErrors(errorFields.join(", "));
        return false;
      }
    }

    setErrors("");
    return true;
  };

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    onSubmit(formState);
    closeModal();
  };

  return (
    <div
      className="modal-container"
      onClick={(e) => {
        if (e.target.className === "modal-container") closeModal();
      }}
    >
      <div className="modal">
        <form>
          {fields.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name}>{field.label}</label>
              <input
                name={field.name}
                type={field.type || "text"} // Default to text if no type provided
                onChange={handleChange}
                value={formState[field.name] || ""}
              />
            </div>
          ))}
          {errors && <div className="error">{`Please include: ${errors}`}</div>}
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalForm;
