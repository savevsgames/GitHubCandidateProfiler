import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import {Candidate, CandidateAPIResponse } from "../interfaces/Candidate.interface";


const mapCandidate = (candidate: CandidateAPIResponse): Candidate => {
  return {
    name: candidate.login,
    username: candidate.login,
    location: "",
    avatar: candidate.avatar_url,
    email: "",
    html_url: candidate.html_url,
    company: candidate.organizations_url,
  };
}

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

  const lookupCandidateHandler = async (username: string) => {
    try {
      const user = await searchGithubUser(username);
      console.log(user);
      setLookupCandidate(user);
    } catch (error) {
      setError("An error occurred while fetching the candidate's profile");
      alert(error);
    }
  };

  return (
    <>
      <h1>CandidateSearch</h1>
      <main>
        {candidates.map((candidate) => {
          const githubUser: Candidate = mapCandidate(candidate);
          return (
            <div key={githubUser.username}>
              <h2>{githubUser.name}</h2>
              <h3>{githubUser.username}</h3>
              <img src={githubUser.avatar} alt={githubUser.username} />
              <button
                onClick={() => lookupCandidateHandler(githubUser.username)}
              >
                {githubUser.username}'s Profile
              </button>
            </div>
          );
        })}
      </main>
    </>
  );
};

export default CandidateSearch;
