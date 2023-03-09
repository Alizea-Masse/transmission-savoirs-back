const adDataMapper = require("../../models/ad");
const userDataMapper = require("../../models/user");
const debug = require("debug")("app:Debug");
const client = require("../../config/db");

const adController = {
  /**
   * Ad controller to get all ads
   * @param {*} _ Express request object (not used)
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAll(_, res) {
    try {
      const ads = await adDataMapper.getAll();
      if (!ads) {
        return res.status(404).json({
          status: "Nous n'avons trouvé aucune annonce.",
        });
      }
      return res.json(ads);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to get ad by category
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByCategory(req, res) {
    try {
      const adsByCategory = await adDataMapper.getAllByCategory(
        req.params.category_id
      );
      debug(adsByCategory);
      if (!adsByCategory) {
        return res.status(404).json({
          status: "Nous n'avons trouvé aucune annonce pour cette catégorie.",
        });
      }
      return res.json(adsByCategory);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to get ad by user
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByUser(req, res) {
    try {
      const adsByUser = await adDataMapper.getAllByUser(req.params.user_id);
      if (!adsByUser) {
        return res.status(404).json({
          status:
            "Nous n'avons trouvé aucune annonce pour cet·te utilisateur·ice.",
        });
      }
      return res.json(adsByUser);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async getUserAds(req, res) {
    try {
      const userAds = await adDataMapper.getAllByUser(req.params.user_id);
      if (!userAds) {
        return res.status(404).json({
          status:
            "Nous n'avons trouvé aucune annonce pour cet·te utilisateur·ice.",
        });
      }
      return res.json(userAds);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller creation ad by user
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async createUserAd(req, res) {
    try {
      const userAd = await adDataMapper.createUserAd(req.body);
      //console.log("####### req.body", req.body);
      if (!userAd) {
        return res.status(404).json({
          status: "L'annonce n'a pas pu être crée",
        });
      }
      return res.json(userAd);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to get ad by type
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getAllByType(req, res) {
    try {
      const adsByType = await adDataMapper.getAllByType(req.params.type_id);
      if (!adsByType) {
        return res.status(404).json({
          status: "Nous n'avons trouvé aucune annonce pour ce type.",
        });
      }
      return res.json(adsByType);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to get one and five similar ads
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async getOneWithSimilar(req, res) {
    try {
      const ad = await adDataMapper.getOneWithSimilar(req.params.id);

      if (!ad) {
        return res
          .status(500)
          .json({ message: "Nous n'avons trouvé aucune annonce." });
      }
      res.json(ad);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  async getAllByTypeAndCategory(req, res) {
    try {
      const adsByTypeAndCategory = await adDataMapper.getAllByTypeAndCategory(
        req.params.type_id,
        req.params.category_id
      );
      if (!adsByTypeAndCategory) {
        return res.status(404).json({
          status:
            "Nous n'avons trouvé aucune annonce pour ce type et cette catégorie.",
        });
      }
      return res.json(adsByTypeAndCategory);
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },

  /**
   * Ad controller to delete ad
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async delete(req, res) {
    try {
      const result = await client.query(
        `
          SELECT ad.id FROM ad WHERE user_id = $1;
        `,
        [req.user.id]
      );

      const found = result.rows.find((ad) => ad.id === Number(req.params.id));

      if (found) {
        const deleteAd = await adDataMapper.delete(req.params.id);
        if (!deleteAd) {
          return res.status(404).json({
            status: "L'annonce n'a pas pu être supprimé",
          });
        }
        return res.json(deleteAd);
      }

      res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé à supprimer l'annonce." });
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
  /**
   * Ad controller to update ad
   * @param {*} req Express request object
   * @param {*} res Express response object
   * @returns Route API JSON response
   */
  async edit(req, res) {
    try {
      const result = await client.query(
        `
          SELECT ad.id FROM ad WHERE user_id = $1;
        `,
        [req.user.id]
      );
      const found = result.rows.find((ad) => ad.id === Number(req.params.id));
      if (found) {
        const savedAd = await adDataMapper.edit(req.params.id, req.body);
        if (!savedAd) {
          res
            .status(404)
            .json({ message: "Votre annonce n'a pas été modifié." });
        }

        return res.json(savedAd);
      }
      res
        .status(401)
        .json({ message: "Vous n'êtes pas autorisé à modifier l'annonce." });
    } catch (err) {
      debug(err);
      res.status(500).json(err.toString());
    }
  },
};

module.exports = adController;
