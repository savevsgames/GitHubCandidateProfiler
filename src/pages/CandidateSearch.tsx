import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import {
  Candidate,
  CandidateAPIResponse,
} from "../interfaces/Candidate.interface";
import CandidateProfile from "../components/CandidateProfile";

const mapCandidate = (candidate: CandidateAPIResponse): Candidate => {
  return {
    id: candidate.id,
    name: candidate.name,
    username: candidate.login,
    location: "",
    avatar: candidate.avatar_url,
    email: "",
    html_url: candidate.html_url,
    company: candidate.organizations_url,
    bio: candidate.bio,
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

  useEffect(() => {
    if (possibleCandidates.length > 0) {
      setActiveCandidate(possibleCandidates[0]);
    } else {
      setActiveCandidate(null); // No more candidates left
    }
  }, [possibleCandidates]); // Triggered whenever possibleCandidates changes

  const updateCandidates = (removedCandidate: Candidate) => {
    const updatedCandidates = possibleCandidates.filter(
      (candidate: Candidate) => candidate.username !== removedCandidate.username
    );
    setPossibleCandidates(updatedCandidates);
  };

  // Add a candidate to the final list
  const addCandidateHandler = async (username: string) => {
    try {
      // Fetch the candidate's profile based on their username (activeCandidate)
      const gitUser = await searchGithubUser(username);
      console.log("Adding", gitUser);
      // Add the candidate to the final candidates list
      setFinalCandidates([...finalCandidates, gitUser]);
      // Remove the candidate from the possible candidates list
      updateCandidates(gitUser);
      console.log("Final Candidates:", finalCandidates);
      // Set the active candidate to the next candidate in the possible candidates list
      setActiveCandidate(possibleCandidates[0]);
    } catch (error) {
      setError("An error occurred while fetching the candidate's profile");
      alert(error);
    }
  };

  // Remove a candidate from the possible candidates list
  const removeCandidateHandler = async (username: string) => {
    // Fetch the candidate's profile based on their username (activeCandidate)
    const gitUser = await searchGithubUser(username);
    console.log(gitUser);
    console.log("Removing candidate: ", gitUser);
    // Update the possible candidates list
    updateCandidates(gitUser);
    // Set the active candidate to the next candidate in the possible candidates list
    setActiveCandidate(possibleCandidates[0]);
    console.log(username, "removed");
  };

  return (
    <>
      <h1>CandidateSearch</h1>
      <main className="search-wrapper">
        {activeCandidate ? (
          <CandidateProfile
            key={activeCandidate.id}
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
            return <div key={candidate.id}>{username}</div>;
          })}
        </div>
      </main>
    </>
  );
};

export default CandidateSearch;
