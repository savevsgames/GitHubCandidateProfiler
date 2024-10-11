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
        // Logic to remove candidates that have no id or are 404 from the list ie candidate.id === null
        const filteredCandidates = candidateList.filter(
          (candidate: Candidate) => candidate.id !== null
        );
        // Use the filtered candidates list to set the possible candidates and the active candidate
        setPossibleCandidates(filteredCandidates);
        setActiveCandidate(filteredCandidates[0]);
      }
    } catch (error) {
      setError("An error occurred while fetching the candidates");
      alert(error);
    }
  };

  // Fetch the possible candidates when the component mounts
  useEffect(() => {
    findCandidates();
    loadCandidatesFile();
  }, []);

  // Load the final candidates list from local storage || create a new file, with [], if it doesn't exist
  const loadCandidatesFile = async () => {
    try {
      const candidates = localStorage.getItem("finalCandidates");
      if (candidates) {
        const parsedCandidates: Candidate[] = JSON.parse(candidates);
        setFinalCandidates(parsedCandidates);
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

  // Update the local storage file with the final candidates list - takes an up to date list of candidates as an argument
  const updateCandidatesFile = async (finalCandidates: Candidate[]) => {
    try {
      const newCandidatesList: string = JSON.stringify(finalCandidates);
      localStorage.setItem("finalCandidates", newCandidatesList);
    } catch (error) {
      console.log("Error updating candidates file.", error);
    }
  };

  // Add a candidate to the final candidates list
  const addFinalCandidate = (candidate: Candidate) => {
    const finalCandidateList = [...finalCandidates, candidate];
    updateCandidatesFile(finalCandidateList);
  };

  // Update the possible candidates list after removing a candidate
  const updateCandidates = (removedCandidateId: string | number) => {
    const updatedCandidates = possibleCandidates.filter(
      (candidate: Candidate) => candidate.id !== removedCandidateId
    );
    setPossibleCandidates(updatedCandidates);
  };

  // use hook to update the local storage file whenever finalCandidates changes
  useEffect(() => {
    console.log("Final Candidates:", finalCandidates);
    updateCandidatesFile(finalCandidates);
  }, [finalCandidates]); // Triggered whenever finalCandidates changes

  // use hook to log the active candidate whenever it changes
  useEffect(() => {
    console.log("Active Candidate:", activeCandidate);
  }, [activeCandidate]);

  // use hook to set the active candidate whenever possibleCandidates changes
  useEffect(() => {
    if (possibleCandidates.length > 0) {
      setActiveCandidate(possibleCandidates[0]);
      console.log("Possible Candidates:", possibleCandidates);
    } else {
      setActiveCandidate(null); // No more candidates left
    }
  }, [possibleCandidates]); // Triggered whenever possibleCandidates changes

  // Add a candidate to the final list
  const addCandidateHandler = async (username: string) => {
    try {
      // Fetch the candidate's profile based on their username (activeCandidate)
      const gitUser = await searchGithubUser(username);
      // Add logic to make sure the username exists and the response was not 404
      if (!gitUser) {
        setError("The next candidate's profile does not exist");
        alert(error);

        return;
      }
      console.log("Adding", gitUser);
      // Add the candidate to the final candidates list
      setFinalCandidates([...finalCandidates, gitUser]);
      // Remove the candidate from the possible candidates list
      updateCandidates(gitUser.id);
      // Update the local storage file
      addFinalCandidate(gitUser);
    } catch (error) {
      setError("An error occurred while fetching the candidate's profile");
      alert(error);
    }
  };

  // THIS LOGIC IS NOT PASSING TESTING - NEED TO pass the active user, then remove them by
  // filtering out the active user from the possibleCandidates list instead of fetching the
  // user again from the API - that way i cannot get a 404 error
  // Remove a candidate from the possible candidates list
  const removeCandidateHandler = async (id: string) => {
    const candidateList = finalCandidates.filter(
      (candidate: Candidate) => candidate.id !== id
    );
    setFinalCandidates(candidateList);
    // console.log("Removing candidate: ", gitUser);
    updateCandidates(id);

    console.log(id, "removed");
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
      </main>
    </>
  );
};

export default CandidateSearch;
