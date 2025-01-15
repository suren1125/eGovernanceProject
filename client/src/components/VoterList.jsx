import { VOTER_DATA } from "./Data";

function VoterList() {
  const voters = VOTER_DATA;
  const voterList = voters.map((voter) => (
    <tr key={voter.id}>
      <td>{voter.firstName}</td>
      <td>{voter.lastName}</td>
      <td>{voter.id}</td>
      <td>
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
      </td>
    </tr>
  ));

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
      </div>
    </>
  );
}

export default VoterList;
