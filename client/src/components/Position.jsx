import { POSITION_DATA } from "./Data";

function Position() {
  const positions = POSITION_DATA;
  const positionList = positions.map((position) => (
    <tr key={position.id}>
      <td>{position.positionName}</td>
      <td>{position.maxVote}</td>
      <td>
        <button className="edit-btn">Edit</button>
        <button className="delete-btn">Delete</button>
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
          <tbody>{positionList}</tbody>
        </table>
      </div>
    </>
  );
}

export default Position;
