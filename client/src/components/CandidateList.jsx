import { CANDIDATE_DATA } from "./Data";

function CandidateList() {
  const candidates = CANDIDATE_DATA;
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
          <tbody>{candidateList}</tbody>
        </table>
      </div>
    </>
  );
}

export default CandidateList;
