// TODO: Create an interface for the Candidate objects returned by the API
//  candidate's name, username, location, avatar, email, html_url, and company
export interface Candidate {
  name: string;
  username: string;
  location: string;
  avatar: string;
  email: string;
  html_url: string;
  company: string;
}

export default Candidate;
