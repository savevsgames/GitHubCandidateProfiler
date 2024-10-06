// TODO: Create an interface for the Candidate objects returned by the API
//  candidate's name, username, location, avatar, email, html_url, and company
export type Candidate = {
  name: string | null;
  username: string | null;
  location: string | null;
  avatar: string | null;
  email: string | null;
  html_url: string | null;
  company: string | null;
};

export type CandidateAPIResponse = {
  avatar_url: string | null;
  bio: string | null;
  blog: string | null;
  company: string | null;
  created_at: string | null;
  email: string | null;
  events_url: string | null;
  followers: string | number | null;
  followers_url: string | null;
  following: string | number | null;
  following_url: string | null;
  gists_url: string | null;
  gravatar_id: string | null;
  hireable: string | null;
  html_url: string | null;
  id: string | number | null;
  location: string | null;
  login: string | null;
  name: string | null;
  node_id: string | null;
  organizations_url: string | null;
  public_gists: string | number | null;
  public_repos: string | number | null;
  received_events_url: string | null;
  repos_url: string | null;
  site_admin: boolean;
  starred_url: string | null;
  subscriptions_url: string | null;
  twitter_username: string | null;
  type: string | null;
  updated_at: string | null;
  url: string | null;
};
