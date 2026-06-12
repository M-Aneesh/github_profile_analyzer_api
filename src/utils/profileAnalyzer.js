const profileAnalyzer = (userProfile, userRepo) => {
    // https://api.github.com/users/${username}/repos 
    // scroll and find stargazers_count , language

  let totalStars = 0;

  const languageCount = {};

  userRepo.forEach((repo) => {
    // adds stars from each of the repositories
    totalStars += repo.stargazers_count;

    if (repo.language) {
      languageCount[repo.language] =
        (languageCount[repo.language] || 0) + 1;
    }
    /*
    suppose u have html lang , 
    if value is assigned it adds 1 to the value
    else funct assigns 1 to html lang value, 
    */
  });

  const mostUsedLanguage =
    Object.keys(languageCount).length > 0
      ? Object.keys(languageCount).reduce((a, b) =>
          languageCount[a] > languageCount[b] ? a : b
        )
      : "N/A";
      /*
      suppose languageCount has multiple objects like
      {
      html : 3 , css : 1 , javascript:5
      }
      if object's key have values 
      then we use reduce to get hold the single most used lang value and then we return the value 
      else we return N/A
      */

  return {
    username: userProfile.login,
    name: userProfile.name,
    followers: userProfile.followers,
    following: userProfile.following,
    publicRepos: userProfile.public_repos,
    totalStars,
    mostUsedLanguage,
    accountCreatedAt: userProfile.created_at.replace("T", " ").replace("Z", ""),
  };
};

export {profileAnalyzer};