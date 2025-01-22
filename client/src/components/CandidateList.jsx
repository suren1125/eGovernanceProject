import { useState } from "react";
import { CANDIDATE_DATA } from "./Data";
import ModalForm from "./ModalForm";

function CandidateList() {
  const [modalOpen, setModalOpen] = useState(false);
  const [candidates, setCandidates] = useState(CANDIDATE_DATA);
  const [candidateToEdit, setCandidateToEdit] = useState(null);

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "position", label: "Position", type: "text" },
  ];

  const validateCandidateForm = (formState) => {
    const errors = [];
    for (const field of fields) {
      if (!formState[field.name]) {
        errors.push(`${field.label}`);
      }
    }
    return errors.length > 0 ? errors : null;
  };

  const handleDeleteCandidate = (targetIndex) => {
    setCandidates(candidates.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditCandidate = (idx) => {
    setCandidateToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newCandidate) => {
    candidateToEdit === null
      ? setCandidates([...candidates, newCandidate])
      : setCandidates(
          candidates.map((currCandidate, idx) => {
            if (idx !== candidateToEdit) return currCandidate;
            return newCandidate;
          })
        );
  };

  const candidateList = candidates.map((candidate, idx) => (
    <tr key={idx}>
      <td>{candidate.firstName}</td>
      <td>{candidate.lastName}</td>
      <td>{candidate.position}</td>
      <td>
        <button className="edit-btn" onClick={() => handleEditCandidate(idx)}>
          Edit
        </button>
        <button
          className="delete-btn"
          onClick={() => handleDeleteCandidate(idx)}
        >
          Delete
        </button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="candidate-list">
        <div className="page-title">Candidates</div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Position</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            {candidates.length > 0 ? (
              candidateList
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  There are no candidates to display.
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
              setCandidateToEdit(null);
            }}
            fields={fields}
            onSubmit={handleSubmit}
            defaultValue={
              candidateToEdit !== null && candidates[candidateToEdit]
            }
            validateFormCustom={validateCandidateForm}
          />
        )}
      </div>
    </>
  );
}

export default CandidateList;
