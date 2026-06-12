import pool from "../config/db.js";
import { fetchGithubProfile } from "../services/githubServices.js";
import { profileAnalyzer } from "../utils/profileAnalyzer.js";

const createProfileAnalysis = async (req, res) => {
  try {
    const { username } = req.body;

    //if in body , username is empty field then it shows the above message and status code
    if (!username) {
      return res.status(400).json({
        success: false,
        message: "Username is required",
      });
      
    }
    // Check if profile already exists
    const [existingProfile] = await pool.query(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username]
    );

    //if existing Data exists then message gets displayed and no data is inserted into the db
    if (existingProfile.length > 0) {
      return res.status(409).json({
        success: false,
        message: "Profile already exists",
        data: existingProfile[0],
      });
    
    }

    const { userProfile, userRepo } =
      await fetchGithubProfile(username);

    const analysis =
      profileAnalyzer(userProfile, userRepo);

    const query = `
      INSERT INTO github_profiles (
        username,
        name,
        followers,
        following,
        public_repos,
        total_stars,
        most_used_language,
        account_created_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?)
    `;

    await pool.query(query, [
      analysis.username,
      analysis.name,
      analysis.followers,
      analysis.following,
      analysis.publicRepos,
      analysis.totalStars,
      analysis.mostUsedLanguage,
      analysis.accountCreatedAt,
    ]);

    res.status(201).json({
      success: true,
      message: "Profile analyzed and stored successfully",
      data: analysis,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getAllProfiles = async (req, res) => {
  try {
    const { language, minFollowers, minPublicRepo , sortBy } = req.query;

    let query = `
      SELECT *
      FROM github_profiles
      WHERE 1 = 1
    `;

    const values = [];

    // Filter by language
    if (language) {
      query += ` AND most_used_language = ?`;
      values.push(language);
    }

    // Filter by minimum amt of followers
    if (minFollowers) {
      query += ` AND followers >= ?`;
      values.push(Number(minFollowers));
    }
    // Filter by minimum amt of public repositories
    if(minPublicRepo){
      query += `AND public_repos >= ?`;
      values.push(Number(minPublicRepo));
    }

    // Sorting
    if (sortBy === "followers") {
      query += ` ORDER BY followers DESC`;
    } else if (sortBy === "stars") {
      query += ` ORDER BY total_stars DESC`;
    } else if (sortBy === "public"){
      query += `ORDER BY public_repos DESC`
    } else {
      query += ` ORDER BY analyzed_at DESC`;
    }

    const [profiles] = await pool.query(query, values);

    res.status(200).json({
      success: true,
      count: profiles.length,
      data: profiles,
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getProfileByUsername = async (req, res) => {
  try {
    const { username } = req.params;

    const [profile] = await pool.query(
      "SELECT * FROM github_profiles WHERE username = ?",
      [username]
    );

    if (profile.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Profile not found",
      });
    }

    res.status(200).json({
      success: true,
      data: profile[0],
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteProfile = async(req,res) =>{
    try{
        const { username } = req.params;
        const [existingProfile] = await pool.query(
            "SELECT * FROM github_profiles WHERE username = ?",[username]
        );
        if(existingProfile.length === 0){
            return res.status(404).json({
                success:false,
                message:"Profile not found",
            });
        }
        await pool.query("DELETE FROM github_profiles WHERE username=?",[username]);
        res.status(200).json({
            success: true,
            message:"Profile deleted successfully",
        });
    }catch(error) {
        res.status(500).json({
            success:false,
            message: error.message,
        });
    }
}

export {createProfileAnalysis , getAllProfiles , getProfileByUsername , deleteProfile};