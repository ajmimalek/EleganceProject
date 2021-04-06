const { router } = require("../app");
const user = require("../models/user");

if (!require.files)
  return res.status(400).send("Please Enter Valid Data");
  const {data,mimetype}= req.files.file;
  user.ProfileDp.Data = data;
  user.ProfileDp.ContentType=mimetype;
  await user.save();
  res.header("id", user._id).sendStatus(201);
});
router.get("/:id",async(req,res)=> {
    const {id}=req.params;
    const user = await UserModel.findById({_id: id}).select({});
    if (!user) return res.sendStatus(400);
    res.send(user);
});
modeule.exports = router;

}
