import { useState } from "react";

function CandidateList(props) {
  const [candidates] = useState(props.candidates);

  const candidateList = candidates.map((candidate) => (
    <tr key={candidate.id}>
      <td>{candidate.firstName}</td>
      <td>{candidate.lastName}</td>
      <td>{candidate.position}</td>
      <td>
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </td>
    </tr>
  ));

  return (
    <>
      <div className="candidate-list">
        <table>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Position</th>
            <th>Tools</th>
          </tr>
          {candidateList}
        </table>
      </div>
    </>
  );
}

export default CandidateList;
