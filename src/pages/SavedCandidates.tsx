import { useEffect, useState } from "react";
import { CandidateAPIResponse } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<CandidateAPIResponse[]>([]);

  const getCandidates = async () => {
    try {
      const candidates = localStorage.getItem("finalCandidates");
      if (candidates) {
        const parsedCandidates: CandidateAPIResponse[] = JSON.parse(candidates);
        setCandidates(parsedCandidates);
      } else {
        localStorage.setItem("finalCandidates", "[]");
        console.log(
          "No candidates found in local storage. Candidates file created."
        );
      }
    } catch (error) {
      console.log("Error loading candidates file.", error);
    }
  };

  const removeFinalCandidate = async (candidate: CandidateAPIResponse) => {
    const updatedCandidates = candidates.filter(
      (finalCandidate) => finalCandidate.id !== candidate.id
    );
    localStorage.setItem("finalCandidates", JSON.stringify(updatedCandidates));
    setCandidates(updatedCandidates);
  };

  useEffect(() => {
    getCandidates();
  }, []);

  // Log the final candidates whenever the component mounts
  useEffect(() => {
    console.log("Final Candidates:", candidates);
  }, [candidates]);

  return (
    <section id="profile-table">
      <table>
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Location</th>
            <th>Email</th>
            <th>Company</th>
            <th>Bio</th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => {
            const {
              id,
              avatar_url,
              login,
              name,
              location,
              email,
              company,
              bio,
            } = candidate;
            return (
              <tr key={id}>
                <td>
                  <img src={avatar_url} alt={name || "User Avatar"} />
                </td>
                <td id="data">{login || "No Name Given"}</td>
                <td id="data">{location || "No Location Specified"}</td>
                <td id="data">{email || "No Email Specified"}</td>
                <td id="data">{company || "None Specified"}</td>
                <td id="data">{bio || "There is no bio in user profile"}</td>
                <td>
                  <button
                    className="remove"
                    onClick={() => {
                      removeFinalCandidate(candidate);
                    }}
                  >
                    -
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default SavedCandidates;
