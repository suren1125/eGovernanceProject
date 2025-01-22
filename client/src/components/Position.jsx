import { useState } from "react";
import ModalForm from "./ModalForm";
import { POSITION_DATA } from "./Data";

function Position() {
  const [modalOpen, setModalOpen] = useState(false);
  const [positions, setPositions] = useState(POSITION_DATA);
  const [positionToEdit, setPositionToEdit] = useState(null);

  const fields = [
    { name: "description", label: "Description", type: "text" },
    { name: "maxVote", label: "Maximum Vote", type: "number" },
  ];

  const validatePositionForm = (formState) => {
    const errors = [];
    for (const field of fields) {
      if (!formState[field.name]) {
        errors.push(`${field.label}`);
      }
    }
    return errors.length > 0 ? errors : null;
  };

  const handleDeletePosition = (targetIndex) => {
    setPositions(positions.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditPosition = (idx) => {
    setPositionToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newPosition) => {
    positionToEdit === null
      ? setPositions([...positions, newPosition])
      : setPositions(
          positions.map((currPosition, idx) => {
            if (idx !== positionToEdit) return currPosition;
            return newPosition;
          })
        );
  };

  const positionList = positions.map((position, idx) => (
    <tr key={idx}>
      <td>{position.description}</td>
      <td>{position.maxVote}</td>
      <td>
        <button className="edit-btn" onClick={() => handleEditPosition(idx)}>
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => handleDeletePosition(idx)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="position-list">
        <div className="page-title">Positions</div>
        <table>
          <thead>
            <tr>
              <th>Description</th>
              <th>Maximum Vote</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            {positions.length > 0 ? (
              positionList
            ) : (
              <tr>
                <td colSpan="3" style={{ textAlign: "center" }}>
                  There are no positions to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={() => setModalOpen(true)}>Add</button>
        {modalOpen && (
          <ModalForm
            closeModal={() => {
              setModalOpen(false);
              setPositionToEdit(null);
            }}
            fields={fields}
            onSubmit={handleSubmit}
            validateFormCustom={validatePositionForm}
            defaultValue={positionToEdit !== null && positions[positionToEdit]}
          />
        )}
      </div>
    </>
  );
}

export default Position;
