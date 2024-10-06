export type Candidate = {
  id: string | number;
  name: string | null;
  username: string; // Cannot be null
  location: string | null;
  avatar: string | undefined; // Cannot be null
  email: string | null;
  html_url: string | undefined; // Cannot be null
  company: string | null;
  bio: string | null;
};

export interface CandidateProfileProps extends Candidate {
  onAddCandidate: (username: string) => void;
  onRemoveCandidate: (username: string) => void;
}

export type CandidateAPIResponse = {
  avatar_url: string | undefined; // Cannot be null
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
  html_url: string | undefined; // Cannot be null
  id: string | number; // Cannot be null
  location: string | null;
  login: string; // Cannot be null
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
