import { CandidateProfileProps } from "../interfaces/Candidate.interface";

const CandidateProfile = ({
  name,
  username,
  avatar,
  location,
  company,
  onAddCandidate,
  onRemoveCandidate,
}: CandidateProfileProps) => {
  return (
    <article className="profile-wrapper">
      <div key={username} className="profile-card">
        <img src={avatar} alt={username} />
        <h2>
          {username}({name})
        </h2>
        <p>Location: {location} </p>
        <p>Email: </p>
        <p>Company: {company}</p>
        <p>Bio: </p>
      </div>
      <div className="addRemoveButtons">
        <button className="remove" onClick={() => onAddCandidate(username)}>
          -
        </button>
        <button className="add" onClick={() => onRemoveCandidate(username)}>
          +
        </button>
      </div>
    </article>
  );
};
export default CandidateProfile;
