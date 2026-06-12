import express from "express";
import env from "dotenv";
import pool from "./config/db.js";
import { fetchGithubProfile } from "./services/githubServices.js";
import { profileAnalyzer } from "./utils/profileAnalyzer.js";
import profileRoutes from "./routes/profileRoutes.js";

env.config();

const app = express();
app.use(express.json());
app.use("/api/profiles", profileRoutes);

app.get("/profileData/:username", async (req, res) => {
  try {
    const { username } = req.params;

    const { userProfile, userRepo } =
      await fetchGithubProfile(username);

    const analysis =
      profileAnalyzer(userProfile,userRepo);

    res.status(200).json(analysis);

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
});

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    project: "GitHub Profile Analyzer API",
    endpoints: {
      //not saved in db
      userProfile: "GET /profileData/:username",

      analyzeProfile: "POST /api/profiles",
      getAllProfiles: "GET /api/profiles",
      //Filter profiles [values provided are for example]
      FilterBylanguage: "GET /api/profiles?language=javascript",
      FilterByMinFollowers: "GET /api/profiles?minFollowers=10",
      FilterByPublicRepositories: "GET /api/profiles?minPublicRepo=5",
      //Sorting
      SortByFollowers: "GET /api/profiles?sortBy=followers",
      SortByStars : "GET /api/profiles?sortBy=stars",
      SortByPublic: "GET /api/profiles?sortBy=public",


      getSingleProfile: "GET /api/profiles/:username",
      deleteProfile: "DELETE /api/profiles/:username"

    }
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const connection = await pool.getConnection();

    console.log("MySQL Connected Successfully");

    connection.release();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });

  } catch (error) {
  console.error("Database Connection Failed");
  console.error(error);
  }
};

startServer();