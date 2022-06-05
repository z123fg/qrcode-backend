const UserData = require("../models/userData");

exports.getUserData = async (req, res) => {
  try {
    const query = UserData.find();
    query.sort({ createTime: -1 });
    const result = await query;
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

exports.postUserData = async (req, res) => {
  try {
    const userData = new UserData({
      ...req.body,
      createTime: Date.now(),
      updateTime: Date.now(),
    });
    const userDataWithId = await userData.save();
    const { id: _id, ...rest } = userDataWithId;
    res.status(201).json({
      message: "create userData successfully!",
      result: { ...rest, id }
    })
  } catch (err) {
    res.status(400).json({
      message: `failed to create event: ${err.message}`,
    });
  }
};


exports.postUserDataList = async (req, res) => {
  try {
    const userDataList = req.body.map(item => ({
      ...item,
      createTime: Date.now(),
      updateTime: Date.now(),
    }));
    let userDataListWithId = await UserData.insertMany(userDataList)

    userDataListWithId = userDataListWithId.map(item => {
      const { id: _id, ...rest } = item;
      return { id, ...rest };
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


exports.patchUserData = async (req, res) => {
  try {
    let { id, ...rest } = req.body;
    const result = await UserData.updateOne(
      { _id: id },
      { ...rest, updateTime: Date.now() }
    )
    if (result.matchedCount > 0) {
      res.status(200).json({ message: "Update successfully!" });
    } else {
      res.status(401).json({ message: "no such record" });
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
