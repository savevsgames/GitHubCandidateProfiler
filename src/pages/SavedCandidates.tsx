import { useEffect, useState } from "react";
import { Candidate } from "../interfaces/Candidate.interface";

const SavedCandidates = () => {
  const [candidates, setCandidates] = useState<Candidate[]>([]);

  const getCandidates = async () => {
    try {
      const candidates = localStorage.getItem("finalCandidates");
      if (candidates) {
        const parsedCandidates: Candidate[] = JSON.parse(candidates);
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

  const removeFinalCandidate = async (candidate: Candidate) => {
    const updatedCandidates = candidates.filter(
      (finalCandidate) => finalCandidate.id !== candidate.id
    );
    localStorage.setItem("finalCandidates", JSON.stringify(updatedCandidates));
    setCandidates(updatedCandidates);
  };

  const sortCandidates = (candidates: Candidate[]) => {
    return candidates.sort((a, b) => {
      if (a.username < b.username) {
        return -1;
      }
      if (a.username > b.username) {
        return 1;
      }
      return 0;
    });
  };

  const filterCandidatesLocation = (candidates: Candidate[]) => {
    return candidates.filter((candidate) => {
      return candidate.location !== null;
    });
  };

  const filterCandidatesEmail = (candidates: Candidate[]) => {
    return candidates.filter((candidate) => {
      return candidate.email !== null;
    });
  };

  const filterCandidatesCompany = (candidates: Candidate[]) => {
    return candidates.filter((candidate) => {
      return candidate.company !== null;
    });
  };

  const filterCandidatesBio = (candidates: Candidate[]) => {
    return candidates.filter((candidate) => {
      return candidate.bio !== null;
    });
  };

  const refreshPage = () => {
    window.location.reload();
  };

  // Used in development and testing only
  // const deleteLocalStorage = async () => {
  //   localStorage.removeItem("finalCandidates");
  //   setCandidates([]);
  // };

  useEffect(() => {
    getCandidates();
    // deleteLocalStorage(); // Used in development and testing only
  }, []);

  // Log the final candidates whenever the component mounts
  useEffect(() => {
    console.log("Final Candidates:", candidates);
  }, [candidates]);

  return (
    <section id="profile-table">
      <h3
        id="filter"
        onClick={() => {
          refreshPage();
        }}
      >
        Click to Refresh and Remove Filters
      </h3>
      <table id="candidate-table">
        <thead>
          <tr id="table-headers">
            <th>Image</th>
            <th
              id="sort"
              onClick={() => setCandidates(sortCandidates([...candidates]))}
            >
              Name (click to sort)
            </th>
            <th
              id="filter"
              onClick={() =>
                setCandidates(filterCandidatesLocation([...candidates]))
              }
            >
              Location (click to filter)
            </th>
            <th
              id="filter"
              onClick={() =>
                setCandidates(filterCandidatesEmail([...candidates]))
              }
            >
              Email (click to filter)
            </th>
            <th
              id="filter"
              onClick={() =>
                setCandidates(filterCandidatesCompany([...candidates]))
              }
            >
              Company (click to filter)
            </th>
            <th
              id="filter"
              onClick={() =>
                setCandidates(filterCandidatesBio([...candidates]))
              }
            >
              Bio (click to filter)
            </th>
            <th>Reject</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((candidate) => {
            const {
              id,
              avatar,
              username,
              name,
              location,
              email,
              company,
              bio,
            } = candidate;
            return (
              <tr key={id}>
                <td>
                  <img src={avatar} alt={name || "User Avatar"} />
                </td>
                <td id="data">
                  View{" "}
                  <a href={`https://github.com/${username}`}>
                    {username + "'s " || "View Profile"}
                  </a>
                  profile
                </td>
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
