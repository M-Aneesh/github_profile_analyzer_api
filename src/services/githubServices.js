import axios from "axios";
import env from "dotenv";

env.config();
const headers = {
  Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
};

const fetchGithubProfile = async (username) => {
  const [getUserProfile, getUserRepo] = await Promise.all([
    /* from github rest api 
    under this: https://docs.github.com/en/rest/users/users?apiVersion=2026-03-10#get-a-user--code-samples
    "url": "https://api.github.com/users/octocat",
     "repos_url": "https://api.github.com/users/octocat/repos"
    */
    axios.get(
      `https://api.github.com/users/${username}`,
      { headers }
    ),
    axios.get(
      `https://api.github.com/users/${username}/repos`,
      { headers }
    ),
  ]);

  return {
    userProfile: getUserProfile.data,
    userRepo: getUserRepo.data,
  };
};

export { fetchGithubProfile };

    

