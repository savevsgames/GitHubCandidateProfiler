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
    location: candidate.location,
    avatar: candidate.avatar_url,
    email: candidate.email,
    company: candidate.company,
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
      // console.log("Response:", response);
      if (response.length === 0) {
        setError("No candidates found");
        alert(error);
      } else {
        const candidateList = [];
        for (const candidate of response) {
          const candidateProfile = await searchGithubUser(candidate.login);
          const mappedCandidate = mapCandidate(candidateProfile);
          candidateList.push(mappedCandidate);
        }
        // console.log("Candidate List:", candidateList);
        // Logic to remove candidates that have no id or are 404 from the list ie candidate.id === null
        const filteredCandidates = candidateList.filter(
          (candidate: Candidate) => candidate.id !== undefined
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

  const refreshCandidates = async () => {
    // If there is only one possible candidate left, fetch more candidates so that if the page refreshes, there are still candidates to display
    if (possibleCandidates.length === 1) {
      findCandidates();
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
  const updatePossibleCandidates = (candidateId: number) => {
    const updatedCandidates = possibleCandidates.filter(
      (candidate: Candidate) => candidate.id !== candidateId
    );
    setPossibleCandidates(updatedCandidates);

    // If there are no more possible candidates, this will fetch more
    refreshCandidates();
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
  const addCandidateHandler = async (id: number) => {
    try {
      const candidateToAdd: Candidate = possibleCandidates.find(
        (candidate: Candidate) => candidate.id === id
      ) as Candidate;

      setFinalCandidates([...finalCandidates, candidateToAdd]);
      // Remove the candidate from the possible candidates list
      updatePossibleCandidates(candidateToAdd.id);
      // Update the local storage file
      addFinalCandidate(candidateToAdd);
    } catch (error) {
      setError("An error occurred while fetching the candidate's profile");
      alert(error);
    }
  };

  // Remove a candidate from the possible candidates list
  const removeCandidateHandler = async (id: number) => {
    const candidateList = finalCandidates.filter(
      (candidate: Candidate) => candidate.id !== id
    );
    setFinalCandidates(candidateList);
    console.log("Removing candidate: ", id);
    updatePossibleCandidates(id);
  };

  return (
    <section id="search">
      <h1>CandidateSearch</h1>
      <main className="search-wrapper">
        {activeCandidate ? (
          <CandidateProfile
            key={activeCandidate.id}
            candidate={activeCandidate}
            onAddCandidate={addCandidateHandler}
            onRemoveCandidate={removeCandidateHandler}
          />
        ) : (
          <article id="loading-circle">
            <div id="loading-text">
              Finding candidates and looking up their information...
            </div>
            <div id="loading"></div>
          </article>
        )}
      </main>
    </section>
  );
};

export default CandidateSearch;
