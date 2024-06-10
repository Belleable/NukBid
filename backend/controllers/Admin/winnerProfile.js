import Users from "../../api/models/Users.js";

export const winnerProfile = async (req, res) => {
      try {
        
          const { username } = req.params
          console.log(username);
          const userprofile = await Users.find({ username: username})
          
          res.json({success: true, data: userprofile});
      } catch (error) {
          console.error("Error fetching goods:", error);
          res.status(500).json({ success: false, text: "Failed to fetch goods", error: error.message });
      }
};