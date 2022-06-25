const UserData = require("../models/userData");

exports.getGlobalUserDataList = async (req, res) => {
  try {
    const query = UserData.find();
    query.sort({ createTime: -1 });
    let result = await query;
    
    const count = await UserData.count();
    res.status(200).json({
      message: "get userData successfully!",
      result,
      count
    })
  } catch (err) {
    res.status(500).json({
      message: `failed to fetch userData, reason: ${err}`
    })
  }
};

exports.createSingleUserData = async (req, res) => {
  
  try {
    const userData = new UserData({
      ...req.body,
      createTime: {type:"text", content:Date.now(),isSprite:false},
      updateTime: {type:"text", content:Date.now(),isSprite:false},
    });
    const userDataWithId = await userData.save();
    res.status(201).json({
      message: "create userData successfully!",
      result: userDataWithId
    })
  } catch (err) {
    res.status(400).json({
      message: `failed to create event: ${err.message}`,
    });
  }
};


exports.createUserDataList = async (req, res) => {
  try {
    const userDataList = req.body.map(item => {
      const {_id,...rest} = item;
      return ({
      ...rest,
      createTime: {type:"text",content:Date.now(),isSprite:false},
      updateTime: {type:"text",content:Date.now(),isSprite:false},
    })});
    let userDataListWithId = await UserData.insertMany(userDataList)

    userDataListWithId = userDataListWithId.map(item => {
      
      return item;
    });
    res.status(201).json({
      message: "create userData successfully!",
      result: userDataListWithId
    })
  } catch (err) {
    res.status(400).json({
      message: `failed to create event: ${err.message}`,
    });
  }
};


exports.updateUserData = async (req, res) => {
  try {
    
    let { _id, ...rest } = req.body;
    const result = await UserData.updateOne(
      { _id },
      { ...rest, updateTime: {type:"text",content:Date.now(),isSprite:false} }
    )
    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Update successfully!" });
    } else {
      res.status(400).json({ message: "no such record" });
    }
  } catch (err) {
    res.status(500).json({
      message: `Couldn't update post: ${err}`,
    });
  }

};

exports.deleteUserData = async (req, res) => {
  try {
    const result = await UserData.deleteOne({ _id: req.params.id })

    if (result.deletedCount > 0) {
      res.status(200).json({ message: "Delete successfully!" });
    } else {
      res.status(401).json({ message: "Failed to delete!" });
    }
  } catch (err) {
    res.status(500).json({
      message: `Deleting posts failed: ${err}`,
    });
  }

};
