import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import {
  Candidate,
  CandidateAPIResponse,
} from "../interfaces/Candidate.interface";
import CandidateProfile from "../components/CandidateProfile";

const mapCandidate = (candidate: CandidateAPIResponse): Candidate => {
  return {
    name: candidate.name,
    username: candidate.login,
    location: "",
    avatar: candidate.avatar_url,
    email: "",
    html_url: candidate.html_url,
    company: candidate.organizations_url,
  };
};

const CandidateSearch: React.FC = () => {
  const [possibleCandidates, setPossibleCandidates] = useState<Candidate[]>([]);
  const [finalCandidates, setFinalCandidates] = useState<Candidate[]>([]);
  const [activeCandidate, setActiveCandidate] = useState<Candidate | null>(
    null
  );
  console.log("Possible Candidates:", possibleCandidates);
  const [error, setError] = useState("");

  // Initial fetch of candidates
  const findCandidates = async () => {
    try {
      const response = await searchGithub();
      if (response.length === 0) {
        setError("No candidates found");
        alert(error);
      } else {
        const candidateList = response.map(
          (candidate: CandidateAPIResponse) => {
            return mapCandidate(candidate);
          }
        );
        console.log("Candidate List:", candidateList);
        setPossibleCandidates(candidateList);
        setActiveCandidate(candidateList[0]);
      }
    } catch (error) {
      setError("An error occurred while fetching the candidates");
      alert(error);
    }
  };

  // Fetch the possible candidates when the component mounts
  useEffect(() => {
    findCandidates();
  }, []);

  // Add a candidate to the final list
  const addCandidateHandler = async (username: string) => {
    try {
      const gitUser = await searchGithubUser(username);
      console.log("Adding", gitUser);
      setActiveCandidate(gitUser);
      setFinalCandidates([...finalCandidates, gitUser]);
      console.log("Final Candidates:", finalCandidates);
    } catch (error) {
      setError("An error occurred while fetching the candidate's profile");
      alert(error);
    }
  };

  // Remove a candidate from the possible candidates list
  const removeCandidateHandler = async (username: string) => {
    const gitUser = await searchGithubUser(username);
    console.log(gitUser);
    console.log("Removing candidate: ", gitUser);
    const updatedCandidates = finalCandidates.filter(
      (candidate: Candidate) => candidate.username !== username
    );
    setFinalCandidates(updatedCandidates);
    console.log(username, "removed");
  };

  return (
    <>
      <h1>CandidateSearch</h1>
      <main className="search-wrapper">
        {activeCandidate ? (
          <CandidateProfile
            key={activeCandidate.username}
            {...activeCandidate}
            onAddCandidate={addCandidateHandler}
            onRemoveCandidate={removeCandidateHandler}
          />
        ) : (
          <div>Loading...</div>
        )}
        <div>
          {finalCandidates.map((candidate) => {
            const { username } = candidate;
            return <div key={candidate.username}>{username}</div>;
          })}
        </div>
      </main>
    </>
  );
};

export default CandidateSearch;
