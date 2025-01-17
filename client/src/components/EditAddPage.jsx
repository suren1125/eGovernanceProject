import { useEffect, useState } from "react";

function EditAddPage(props) {
  const {
    isAdding,
    isEditing,
    addVoter,
    editVoter,
    closeForm,
    activeVoterForEdit,
  } = props;
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [id, setId] = useState("");

  //   useEffect(() => {
  //     setFirstName(activeVoterForEdit?.firstName);
  //     setLastName(activeVoterForEdit?.lastName);
  //     setId(activeVoterForEdit?.id);
  //   }, [activeVoterForEdit]);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isAdding && (firstName && lastName && id) !== "") {
      addVoter?.(firstName, lastName, id);
      setFirstName("");
      setLastName("");
      setId("");
      closeForm();
    }
    if (isEditing && (firstName && lastName && id) !== "") {
      editVoter?.(firstName, lastName, id);
      closeForm();
    }
  };

  return (
    <div className="page-container">
      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="fname">First Name</label>
            <input
              id="fname"
              name="fname"
              type="text"
              onChange={(e) => setFirstName(e.target.value)}
              value={firstName}
            />
          </div>
          <div>
            <label htmlFor="lname">Last Name</label>
            <input
              id="lname"
              name="lname"
              type="text"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="voter-id">Voter ID</label>
            <input
              id="voter-id"
              name="voter-id"
              type="text"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
}

export default EditAddPage;
