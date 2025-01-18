import { useState } from "react";

function ModalForm({ onSubmit, defaultValue, closeModal }) {
  const [formState, setFormState] = useState(
    defaultValue || { description: "", maxVote: "" }
  );

  const [errors, setErrors] = useState("");

  const validateForm = () => {
    if (formState.description && formState.maxVote) {
      setErrors("");
      return true;
    } else {
      let errorFields = [];
      for (const [key, value] of Object.entries(formState)) {
        if (!value) {
          errorFields.push(key);
        }
      }
      setErrors(errorFields.join(", "));
      return false;
    }
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
          <div>
            <label htmlFor="description">Description</label>
            <input
              name="description"
              onChange={handleChange}
              value={formState.description}
            />
          </div>
          <div>
            <label htmlFor="maxVote">Maximum Vote</label>
            <input
              name="maxVote"
              onChange={handleChange}
              value={formState.maxVote}
            />
          </div>
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
