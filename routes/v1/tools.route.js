const express = require("express");
const toolsController = require("../../controller/tools.controller");
const viewCount = require("../../middleware/viewCount");

const router = express.Router();

router
  .route("/")
  /**
   * @api {get} /products all products
   * @apiDescription Get all the products
   * @apiPermission admin
   *
   * @apiHeader {string} authorization User's access token
   *
   * @apiParam {number{1-}}.........[page-1]......list page
   * @apiParam {number{1-100}}.......[limit=10].....users per page
   *
   * @apiSuccess {Object[]} all the products.
   *
   * @apiError {unauthorized 401} unauthorized only authenticated users can access the data
   * @apiError (forbidden 403)  forbidden   only admin can access the data
   */
  .get(toolsController.getAllTools)
  /**
   * @api {post} /products save a products
   * @apiDescription Get all the products
   * @apiPermission admin
   *
   * @apiHeader {string} authorization User's access token
   *
   * @apiParam {number{1-}}.........[page-1]......list page
   * @apiParam {number{1-100}}.......[limit=10].....users per page
   *
   * @apiSuccess {Object[]} all the products.
   *
   * @apiError {unauthorized 401} unauthorized only authenticated users can access the data
   * @apiError (forbidden 403)  forbidden   only admin can access the data
   */
  .post(toolsController.saveAtool);

router
  .route("/test")
  .get(toolsController.getTest)
  .post(toolsController.postUser);

router
  .route("/:id")
  .get(viewCount, toolsController.getToolDetails)
  .patch(toolsController.updateTool)
  .delete(toolsController.deleteTool);

module.exports = router;
