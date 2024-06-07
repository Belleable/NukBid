export const logout = async (req, res, next) => {
      try {
            res.clearCookie("userLoggedIn").json({success: true, text: "ออกจากระบบแล้ว"});
            
      } catch (error) {
            console.log("Cannot logout");
      }
}