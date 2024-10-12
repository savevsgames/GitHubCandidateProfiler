import { CandidateProfileProps } from "../interfaces/Candidate.interface";

const CandidateProfile: React.FC<CandidateProfileProps> = ({
  candidate: { id, name, username, email, avatar, location, company, bio },
  onAddCandidate,
  onRemoveCandidate,
}) => {
  return (
    <article className="profile-wrapper">
      <div key={id} className="profile-card">
        <img src={avatar} alt={username} />
        <h2>{username}</h2>
        {username && (
          <p>
            Profile:{" "}
            <a target="_blank" href={`https://github.com/${username}`}>
              [Link to Profile]
            </a>
          </p>
        )}
        {name && <p>Name: {name}</p>}
        {location && <p>Location: {location}</p>}
        {email && <p>Email: {email}</p>}

        {company && <p>Company: {company}</p>}
        {bio && <p>Bio: {bio}</p>}
      </div>
      <div className="addRemoveButtons">
        <button className="remove" onClick={() => onRemoveCandidate(id)}>
          -
        </button>
        <button className="add" onClick={() => onAddCandidate(id)}>
          +
        </button>
      </div>
    </article>
  );
};
export default CandidateProfile;
