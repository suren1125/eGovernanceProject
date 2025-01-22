import { useState } from "react";
import { VOTER_DATA } from "./Data";
import ModalForm from "./ModalForm";

function VoterList() {
  // const [isEditing, setIsEditing] = useState(false);
  // const [isAdding, setIsAdding] = useState(false);
  // const [voters, setVoters] = useState(VOTER_DATA);
  // const [activeVoterForEdit, setActiveVoterForEdit] = useState();

  const [modalOpen, setModalOpen] = useState(false);
  const [voters, setVoters] = useState(VOTER_DATA);
  const [voterToEdit, setVoterToEdit] = useState(null);

  const fields = [
    { name: "firstName", label: "First Name", type: "text" },
    { name: "lastName", label: "Last Name", type: "text" },
    { name: "id", label: "Voter ID", type: "text" },
  ];

  const validateVoterForm = (formState) => {
    const errors = [];
    for (const field of fields) {
      if (!formState[field.name]) {
        errors.push(`${field.label}`);
      }
    }
    return errors.length > 0 ? errors : null;
  };

  const handleDeleteVoter = (targetIndex) => {
    setVoters(voters.filter((_, idx) => idx !== targetIndex));
  };

  const handleEditVoter = (idx) => {
    setVoterToEdit(idx);
    setModalOpen(true);
  };

  const handleSubmit = (newVoter) => {
    voterToEdit === null
      ? setVoters([...voters, newVoter])
      : setVoters(
          voters.map((currVoter, idx) => {
            if (idx !== voterToEdit) return currVoter;
            return newVoter;
          })
        );
  };

  const voterList = voters.map((voter, idx) => (
    <tr key={idx}>
      <td>{voter.firstName}</td>
      <td>{voter.lastName}</td>
      <td>{voter.id}</td>
      <td>
        <button
          className="edit-btn"
          onClick={() => {
            handleEditVoter(idx);
          }}
        >
          Edit
        </button>
        <button className="delete-btn" onClick={() => handleDeleteVoter(idx)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  // const addVoter = (firstName, lastName, id) => {
  //   const newVoter = { id, firstName, lastName };
  //   setVoters([...voters, newVoter]);
  // };

  // const deleteVoter = (id) => {
  //   const remainingVoters = voters.filter((voter) => id !== voter.id);
  //   setVoters(remainingVoters);
  // };

  // const editVoter = (firstName, lastName, id) => {
  //   const editedVoterList = voters.map((voter) => {
  //     if (id === voter.id) {
  //       return { ...voter, firstName, lastName };
  //     }
  //     return voter;
  //   });
  //   setVoters(editedVoterList);
  // };

  return (
    <>
      <div className="voter-list">
        <div className="page-title">Voters</div>
        <table>
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Voter ID</th>
              <th>Tools</th>
            </tr>
          </thead>
          <tbody>
            {voters.length > 0 ? (
              voterList
            ) : (
              <tr>
                <td colSpan="4" style={{ textAlign: "center" }}>
                  There are no voters to display.
                </td>
              </tr>
            )}
          </tbody>
        </table>
        <button onClick={() => setModalOpen(true)}>Add</button>
      </div>
      {modalOpen && (
        <ModalForm
          closeModal={() => {
            setModalOpen(false);
            setVoterToEdit(null);
          }}
          fields={fields}
          onSubmit={handleSubmit}
          validateFormCustom={validateVoterForm}
          defaultValue={voterToEdit !== null && voters[voterToEdit]}
        />
      )}
    </>
  );
}

export default VoterList;
