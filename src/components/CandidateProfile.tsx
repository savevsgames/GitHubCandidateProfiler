import { CandidateProfileProps } from "../interfaces/Candidate.interface";

const CandidateProfile = ({
  id,
  name,
  username,
  email,
  html_url,
  avatar,
  location,
  company,
  bio,
  onAddCandidate,
  onRemoveCandidate,
}: CandidateProfileProps) => {
  return (
    <article className="profile-wrapper">
      <div key={id} className="profile-card">
        <img src={avatar} alt={username} />
        <h2>
          {username}({name})
        </h2>
        {html_url && (
          <p>
            Profile: <a href={html_url}>[Link to Profile]</a>
          </p>
        )}
        {location && <p>Location: {location}</p>}
        {email && <p>Email: {email}</p>}

        {company && <p>Company: {company}</p>}
        {bio && <p>Bio: {bio}</p>}
      </div>
      <div className="addRemoveButtons">
        <button className="remove" onClick={() => onRemoveCandidate(username)}>
          -
        </button>
        <button className="add" onClick={() => onAddCandidate(username)}>
          +
        </button>
      </div>
    </article>
  );
};
export default CandidateProfile;
