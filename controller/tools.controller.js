const { ObjectId } = require("mongodb");
const { getDb } = require("../utils/dbConnect");

let products = [
  { id: 1, name: "Hammer" },
  { id: 2, name: "Hammer2" },
  { id: 3, name: "Hammer3" },
];

module.exports.getAllTools = async (req, res, next) => {
  try {
    const db = getDb();

    const result = await db
      .collection("tools")
      .find()
      // .project({ _id: 0 })
      .toArray();
    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.saveAtool = async (req, res, next) => {
  try {
    const db = getDb();
    const tool = req.body;
    const result = await db.collection("tools").insertOne(tool);

    if (!result.insertedId) {
      return res
        .status(400)
        .send({ status: false, error: "something went wrong!" });
    }
    res.send({ success: true, message: `successfull: ${result.insertedId}` });
  } catch (error) {
    next(error);
  }
};

module.exports.getToolDetails = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not A valid Tool id." });
    }
    const filter = { _id: ObjectId(id) };

    const result = await db.collection("tools").findOne(filter);

    if (!result) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't find a tool with this id" });
    }

    res.status(200).json({ success: true, data: result });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTool = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not A valid Tool id." });
    }
    const filter = { _id: ObjectId(id) };
    const newData = req.body;

    // const result = await db
    //   .collection("tools")
    //   .updateMany({ quantity: { $exists: false } }, { $set: { quantity: 5 } });
    const result = await db
      .collection("tools")
      .updateOne(filter, { $set: newData });

    if (!result.modifiedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't update tool" });
    }

    res
      .status(200)
      .json({ success: true, message: "successfully updated the tool." });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTool = async (req, res, next) => {
  try {
    const db = getDb();
    const { id } = req.params;

    if (!ObjectId.isValid(id)) {
      return res
        .status(400)
        .json({ success: false, error: "Not A valid Tool id." });
    }
    const filter = { _id: ObjectId(id) };

    const result = await db.collection("tools").deleteOne(filter);

    if (!result.deletedCount) {
      return res
        .status(400)
        .json({ success: false, error: "Couldn't delete the tool" });
    }

    res
      .status(200)
      .json({ success: true, message: "successfully deleted the tool." });
  } catch (error) {
    next(error);
  }
};

module.exports.postUser = async (req, res, next) => {
  for (let i = 0; i < 100000; i++) {
    const db = getDb();
    db.collection("test").insertOne({ name: `test ${i}`, age: i });
  }
};
module.exports.getTest = async (req, res, next) => {
  const db = getDb();

  const result = await db.collection("test").find({ age: 99999 }).toArray();
  res.json(result);
};
