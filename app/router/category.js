const express = require("express");
const categoryController = require("../controller/api/categoryController");
const router = express.Router();
const { authenticateToken } = require("../utils/jwt-helpers");

/**
 * @api {get} /api/categories All
 * @apiName getAll
 * @apiGroup Categories
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object} returns categories
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
router.get("/api/categories",categoryController.getAll);
/**
 * @api {patch} /api/categories/:id Update
 * @apiName EditCategories
 * @apiGroup Categories
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id User unique identifier
 * 
 * @apiSuccess {Object} returns update ad
 */
router.patch("/api/categories/:id",authenticateToken,categoryController.edit)
/**
 * @api {delete} /api/categories/:id Delete one categories
 * @apiName deleteCategory
 * @apiGroup Categories
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id The category unique identifier
 * 
 * @apiSuccess {Object} returns categories
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      }
 */
router.delete("/api/categories/:id",authenticateToken,categoryController.delete)

//! route pour créer une category en admin (benoit)






module.exports = router;

