import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";

const CandidateSearch = () => {
  const [candidates, setCandidates] = useState([]);
  const [lookupCandidate, setLookupCandidate] = useState("");
  const [error, setError] = useState("");

  const findCandidates = async () => {
    // Fetch the candidates from the API
    // If the fetch fails, return an error and setError
    // Otherwise, setCandidates with the results from the API
    try {
      const response = await searchGithub();
      if (response.length === 0) {
        setError("No candidates found");
        alert(error);
      } else {
        setCandidates(response);
      }
    } catch (error) {
      setError("An error occurred while fetching the candidates");
      alert(error);
    }
  };

  useEffect(() => {
    findCandidates();
  }, []);

  return (
    <>
      <h1>CandidateSearch</h1>
      <main>
        {candidates.map((candidate)=>{
          return (
            <div key={candidate.id}>
              <h2>{candidate.login}</h2>
              <img src={candidate.avatar_url} alt={candidate.login} />
              <button
                onClick={async () => {
                  const user = await searchGithubUser(candidate.login);
                  console.log(user);
                }}
              >
                View Details
              </button>
            </div>
          )
        })}</main>;
    </>
  );
};

export default CandidateSearch;
