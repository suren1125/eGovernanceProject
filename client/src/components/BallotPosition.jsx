import { CANDIDATE_DATA } from "./Data";
import { POSITION_DATA } from "./Data";

function BallotPosition() {
  const candidates = CANDIDATE_DATA;
  const positions = POSITION_DATA;

  return (
    <div className="ballot-position">
      <h1>Ballot Position</h1>
      <form>
        {positions.map((position) => (
          <fieldset key={position.id}>
            <legend>{position.description}</legend>
            <div className="candidate-options">
              {candidates.map((candidate) => {
                if (candidate.position === position.description)
                  return (
                    <label key={candidate.id} className="candidate-option">
                      <input
                        type="radio"
                        name={`position-${position.description}`}
                        value={candidate.firstName}
                      />
                      <div className="candidate-info">
                        <span>{`${candidate.firstName} ${candidate.lastName}`}</span>
                      </div>
                    </label>
                  );
              })}
            </div>
          </fieldset>
        ))}
        <button type="reset">Reset</button>
      </form>
    </div>
  );
}

export default BallotPosition;
