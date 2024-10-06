import { useState, useEffect } from "react";
import { searchGithub, searchGithubUser } from "../api/API";
import Candidate from "../interfaces/Candidate.interface";

// export interface Candidate {
//   name: string;
//   username: string;
//   location: string;
//   avatar: string;
//   email: string;
//   html_url: string;
//   company: string;
// }

// response for one user:
// avatar_url
// : 
// "https://avatars.githubusercontent.com/u/14284298?v=4"
// events_url
// : 
// "https://api.github.com/users/AndrewMangeni/events{/privacy}"
// followers_url
// : 
// "https://api.github.com/users/AndrewMangeni/followers"
// following_url
// : 
// "https://api.github.com/users/AndrewMangeni/following{/other_user}"
// gists_url
// : 
// "https://api.github.com/users/AndrewMangeni/gists{/gist_id}"
// gravatar_id
// : 
// ""
// html_url
// : 
// "https://github.com/AndrewMangeni"
// id
// : 
// 14284298
// login
// : 
// "AndrewMangeni"
// node_id
// : 
// "MDQ6VXNlcjE0Mjg0Mjk4"
// organizations_url
// : 
// "https://api.github.com/users/AndrewMangeni/orgs"
// received_events_url
// : 
// "https://api.github.com/users/AndrewMangeni/received_events"
// repos_url
// : 
// "https://api.github.com/users/AndrewMangeni/repos"
// site_admin
// : 
// false
// starred_url
// : 
// "https://api.github.com/users/AndrewMangeni/starred{/owner}{/repo}"
// subscriptions_url
// : 
// "https://api.github.com/users/AndrewMangeni/subscriptions"
// type
// : 
// "User"
// url
// : 
// "https://api.github.com/users/AndrewMangeni"

const mapCandidate = (candidate: any): Candidate => {
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
