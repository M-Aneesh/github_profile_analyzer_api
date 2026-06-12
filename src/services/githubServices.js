import axios from "axios";

const fetchGithubProfile = async (username) =>{
    /* from github rest api 
    under this: https://docs.github.com/en/rest/users/users?apiVersion=2026-03-10#get-a-user--code-samples
    "url": "https://api.github.com/users/octocat",
     "repos_url": "https://api.github.com/users/octocat/repos"
    */
    const [getUserProfile , getUserRepo] = await Promise.all([
        //promise.all() to run 2 requests at once
         axios.get(`https://api.github.com/users/${username}`),
         axios.get(`https://api.github.com/users/${username}/repos`)
    ]);
    return{
        // get hold of both request's data
        userProfile : getUserProfile.data,
        userRepo : getUserRepo.data
    };
    };

    export {fetchGithubProfile};

    

