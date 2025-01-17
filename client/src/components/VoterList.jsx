import { useState } from "react";
import { VOTER_DATA } from "./Data";
import EditAddPage from "./EditAddPage";

function VoterList() {
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const [voters, setVoters] = useState(VOTER_DATA);

  const [activeVoterForEdit, setActiveVoterForEdit] = useState();

  const voterList = voters.map((voter) => (
    <tr key={voter.id}>
      <td>{voter.firstName}</td>
      <td>{voter.lastName}</td>
      <td>{voter.id}</td>
      <td>
        <button
          className="edit-btn"
          onClick={() => {
            setIsEditing(true);
            setActiveVoterForEdit(voter);
          }}
        >
          Edit
        </button>
        <button className="delete-btn" onClick={() => deleteVoter(voter.id)}>
          Delete
        </button>
      </td>
    </tr>
  ));

  const addVoter = (firstName, lastName, id) => {
    const newVoter = { id, firstName, lastName };
    setVoters([...voters, newVoter]);
  };

  const deleteVoter = (id) => {
    const remainingVoters = voters.filter((voter) => id !== voter.id);
    setVoters(remainingVoters);
  };

  const editVoter = (firstName, lastName, id) => {
    const editedVoterList = voters.map((voter) => {
      if (id === voter.id) {
        return { ...voter, firstName, lastName };
      }
      return voter;
    });
    setVoters(editedVoterList);
  };

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
          <tbody>{voterList}</tbody>
        </table>
        <button onClick={() => setIsAdding(true)}>Add</button>
      </div>
      {(isAdding || isEditing) && (
        <EditAddPage
          addVoter={addVoter}
          isAdding={isAdding}
          closeForm={() => {
            setIsAdding(false);
            setIsEditing(false);
          }}
          editVoter={editVoter}
          isEditing={isEditing}
          activeVoter={activeVoterForEdit}
        />
      )}
    </>
  );
}

export default VoterList;
