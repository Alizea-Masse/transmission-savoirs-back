const express = require("express");
const adController = require("../controller/api/adController");
const router = express.Router();
const { authenticateToken } = require("../utils/jwt-helpers");
/**
 * @api {get} /api/annonces All
 * @apiName GetAll
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object} returns all ads
 * @apiSuccessExample Succes-Response:
 *    [
      {
          "id": 6,
          "title": "Ad example apidoc category_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad",
          "user_id": 1,
          "condition_id": 2,
          "type_id": 1,
          "category_id": 1,
          "created_at": "2022-09-30T17:11:44.736Z",
          "updated_at": "2022-09-30T17:11:44.736Z"
      },
      {
          "id": 7,
          "title": "Ad2 example apidoc category_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad2",
          "user_id": 3,
          "condition_id": 1,
          "type_id": 2,
          "category_id": 1,
          "created_at": "2022-09-30T17:20:23.176Z",
          "updated_at": "2022-09-30T17:20:23.176Z"
      }
    ]
 */
router.get("/api/annonces",adController.getAll);
/**
 * @api {get} /api/annonces/category/:category_id All by category_id
 * @apiName GetAllByCategory
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} category_id Category unique identifier
 * 
 * @apiSuccess {Object} returns all ads with category_id parameter of query
 * @apiSuccessExample Succes-Response:
 *  [
      {
          "id": 6,
          "title": "Ad example apidoc category_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad",
          "user_id": 1,
          "condition_id": 2,
          "type_id": 1,
          "category_id": 1,
          "created_at": "2022-09-30T17:11:44.736Z",
          "updated_at": "2022-09-30T17:11:44.736Z"
      },
      {
          "id": 7,
          "title": "Ad2 example apidoc category_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad2",
          "user_id": 3,
          "condition_id": 1,
          "type_id": 2,
          "category_id": 1,
          "created_at": "2022-09-30T17:20:23.176Z",
          "updated_at": "2022-09-30T17:20:23.176Z"
      }
    ]
 */
router.get("/api/annonces/category/:category_id",adController.getAllByCategory);
/**
 * @api {get} /api/annonces/user/:user_id All by user_id
 * @apiName GetAllByUser
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} user_id User unique identifier
 * 
 * @apiSuccess {Object} returns all ads with user_id parameter of query
 * @apiSuccessExample Succes-Response:
 *    [
      {
          "id": 6,
          "title": "Ad example apidoc user_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad",
          "user_id": 3,
          "condition_id": 1,
          "type_id": 2,
          "category_id": 5,
          "created_at": "2022-09-30T17:11:44.736Z",
          "updated_at": "2022-09-30T17:11:44.736Z"
      },
      {
          "id": 7,
          "title": "Ad2 example apidoc user_id",
          "postal_code": "01000",
          "image": "nameOfImage",
          "description": "Description ad2",
          "user_id": 3,
          "condition_id": 2,
          "type_id": 1,
          "category_id": 2,
          "created_at": "2022-09-30T17:20:23.176Z",
          "updated_at": "2022-09-30T17:20:23.176Z"
      }
    ]
 */
router.get("/api/annonces/user/:user_id",adController.getAllByUser);
/**
   * @api {get} /api/annonces/type/:type_id All by type_id
   * @apiName GetAllByType
   * @apiGroup Ad
   * @apiVersion 1.0.0
   * 
   * @apiParam {Number} type_id Type unique identifier
   * 
   * @apiSuccess {Object} returns all ads with type_id parameter of query
   * @apiSuccessExample Succes-Response:
   *  [
        {
            "id": 6,
            "title": "Ad example apidoc type_id",
            "postal_code": "01000",
            "image": "nameOfImage",
            "description": "Description ad",
            "user_id": 5,
            "condition_id": 2,
            "type_id": 2,
            "category_id": 1,
            "created_at": "2022-09-30T17:11:44.736Z",
            "updated_at": "2022-09-30T17:11:44.736Z"
        },
        {
            "id": 7,
            "title": "Ad2 example apidoc type_id",
            "postal_code": "01000",
            "image": "nameOfImage",
            "description": "Description ad2",
            "user_id": 7,
            "condition_id": 1,
            "type_id": 2,
            "category_id": 3,
            "created_at": "2022-09-30T17:20:23.176Z",
            "updated_at": "2022-09-30T17:20:23.176Z"
        }
      ]
  */
router.get("/api/annonces/type/:type_id",adController.getAllByType) /* ajout /type */
/**
 * @api {get} /api/annonces/:id One With five similar
 * @apiName getOneWithSimilar
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id Ad unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
 *      "id": "mettre un exemple",
 *    }
 */
router.get("/api/annonces/:id",adController.getOneWithSimilar)
/**
 * @api {get} /api/annonces/category/:category_id/type/:type_id Get ad by category and type
 * @apiName getAllByCategoryAndType
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id Ad unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
 *      "id": "mettre un exemple",
 *    }
 */
router.get("/api/annonces/category/:category_id/type/:type_id", adController.getAllByTypeAndCategory)
/**
 * @api {get} /api/users/annonces/:user_id Get ad by user_id
 * @apiName getUserAds
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id Ad unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
 *      "id": "mettre un exemple",
 *    }
 */
router.get("/api/users/annonces/:user_id", adController.getUserAds)
/**
 * @api {post} /api/users/create-annonces Create
 * @apiName CreateUserAD
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
router.post("/api/users/create-annonces",authenticateToken,adController.createUserAd);
/**
 * @api {patch} /api/annonces/:id Update
 * @apiName Edit
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id User unique identifier
 * 
 * @apiSuccess {Object} returns update ad
 */
router.patch("/api/annonces/:id",authenticateToken,adController.edit)
 /**
 * @api {delete} /api/annonces/:id Delete
 * @apiName Delete
 * @apiGroup Ad
 * @apiVersion 1.0.0
 * 
 * @apiParam {Number} id Ad unique identifier
 * 
 * @apiSuccess {Object} returns ad
 * @apiSuccessExample Succes-Response:
 *    {
        "id": "mettre un exemple"
      },
 */
router.delete("/api/annonces/:id",authenticateToken,adController.delete)




module.exports = router;

