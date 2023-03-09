const client = require("../config/db");
const debug = require("debug")("app:Debug");
const adDataMapper = {
  /**
   *
   * @return {Object} Results of query in JSON formatted
   */
  async getAll() {
    try {
      const result = await client.query(
        `
          SELECT ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
          category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
          condition.id AS condition_id, condition.name AS condition_name,
          type.id AS type_id, type.name AS type_name, "user".id AS user_id, "user".pseudo AS user_name, "user".pronoun AS gender, picture.id AS picture_id, picture.name AS picture_name, picture.slug AS picture_slug 
          FROM ad
          JOIN "user" ON "user".id = ad.user_id JOIN category ON category.id = ad.category_id JOIN condition ON condition.id = ad.condition_id JOIN type ON type.id = ad.type_id JOIN picture ON picture.id = "user".picture_id
        `
      );

      if (result.rowCount === 0) {
        throw new Error("Il n'y a aucune annonce.");
      }
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {Number} category_id Unique identifier for category
   * @return {Object} Results of query in JSON formatted
   */
  async getAllByCategory(category_id) {
    try {
      const result = await client.query(
        // todo: quelle sont les infos importantes pour le front ?
        `
          SELECT ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
          category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
          condition.id AS condition_id, condition.name AS condition_name,
          type.id AS type_id, type.name AS type_name, "user".id AS user_id, "user".pseudo AS user_name, "user".pronoun AS gender, picture.id AS picture_id, picture.name AS picture_name, picture.slug AS picture_slug 
          FROM ad
          JOIN "user" ON "user".id = ad.user_id JOIN category ON category.id = ad.category_id JOIN condition ON condition.id = ad.condition_id JOIN type ON type.id = ad.type_id JOIN picture ON picture.id = "user".picture_id
          WHERE category_id = $1
        `,
        [category_id]
      );
      if (result.rowCount === 0) {
        throw new Error(
          "Nous n'avons trouvé aucune annonce pour cette categorie."
        );
      }
      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {Number} user_id Unique identifier of user
   * @return {Object} Results of query in JSON formatted
   */
  async getAllByUser(user_id) {
    try {
      const result = await client.query(
        // todo: quelle sont les infos importantes pour le front ?
        `
          SELECT ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
          category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
          condition.id AS condition_id, condition.name AS condition_name,
          type.id AS type_id, type.name AS type_name, "user".id AS user_id, "user".pseudo AS user_name, "user".pronoun AS gender, picture.id AS picture_id, picture.name AS picture_name, picture.slug AS picture_slug 
          FROM ad 
          JOIN "user" ON "user".id = ad.user_id JOIN category ON category.id = ad.category_id JOIN condition ON condition.id = ad.condition_id JOIN type ON type.id = ad.type_id JOIN picture ON picture.id = "user".picture_id
          WHERE user_id = $1;
        `,
        [user_id]
      );
      if (result.rowCount === 0) {
        throw new Error(
          "Nous n'avons trouvé annonce pour cet·te utilisateur·ice"
        );
      }

      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {Number} type_id Unique identifier of type
   * @return {Object} Results of query in JSON formatted
   */
  async getAllByType(id) {
    try {
      const result = await client.query(
        `SELECT ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
        category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
        condition.id AS condition_id, condition.name AS condition_name,
        type.id AS type_id, type.name AS type_name, "user".id AS user_id, "user".pseudo AS user_name, "user".pronoun AS gender, picture.id AS picture_id, picture.name AS picture_name, picture.slug AS picture_slug 
        FROM ad 
        JOIN "user" ON "user".id = ad.user_id JOIN category ON category.id = ad.category_id JOIN condition ON condition.id = ad.condition_id JOIN type ON type.id = ad.type_id JOIN picture ON picture.id = "user".picture_id WHERE type_id = $1`,
        [id]
      );
      if (result.rowCount === 0) {
        throw new Error("Nous n'avons trouvé aucune annonce pour ce type.");
      }

      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   *
   * @param {Number} id Unique identifier of ad
   * @return {Object} Results of query in JSON formatted
   */
  async getOneWithSimilar(id) {
    try {
      const resultAd = await client.query(
        `
      SELECT ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
      category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
      condition.id AS condition_id, condition.name AS condition_name,
      type.id AS type_id, type.name AS type_name, "user".id AS user_id, "user".pseudo AS user_name, "user".pronoun AS gender, "user".email AS user_email, picture.id AS picture_id, picture.name AS picture_name, picture.slug AS picture_slug 
      FROM ad 
      JOIN "user" ON "user".id = ad.user_id JOIN category ON category.id = ad.category_id JOIN condition ON condition.id = ad.condition_id JOIN type ON type.id = ad.type_id JOIN picture ON picture.id = "user".picture_id 
      WHERE ad.id = $1`,
        [id]
      );
      if (resultAd.rowCount === 0) {
        throw new Error("Nous n'avons trouvé aucune annonce.");
      }

      const category = resultAd.rows[0].category_id;
      const resultWithoutID = await client.query(
        `
        SELECT ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
        category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
        condition.id AS condition_id, condition.name AS condition_name,
        type.id AS type_id, type.name AS type_name, "user".id AS user_id, "user".pseudo AS user_name, "user".pronoun AS gender, picture.id AS picture_id, picture.name AS picture_name, picture.slug AS picture_slug 
        FROM ad 
        JOIN "user" ON "user".id = ad.user_id 
        JOIN category ON category.id = ad.category_id 
        JOIN condition ON condition.id = ad.condition_id 
        JOIN type ON type.id = ad.type_id 
        JOIN picture ON picture.id = "user".picture_id
        WHERE ad.id != $1
        ORDER BY created_at DESC
        `,
        [id]
      );

      let sameCategory = resultWithoutID.rows.filter(
        (sameCategory) => sameCategory.category_id === category
      );

      if (resultWithoutID.rowCount === 0) {
        throw new Error("Il n'y a pas d'annonces similaires");
      }

      return {
        post: resultAd.rows[0],
        similarPosts: sameCategory.slice(0, 3),
      };
    } catch (err) {
      debug(err);
    }
  },

  async getAllByTypeAndCategory(type_id, category_id) {
    try {
      const result = await client.query(
        `SELECT ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
        category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
        condition.id AS condition_id, condition.name AS condition_name,
        type.id AS type_id, type.name AS type_name, "user".id AS user_id, "user".pseudo AS user_name, "user".pronoun AS gender, picture.id AS picture_id, picture.name AS picture_name, picture.slug AS picture_slug 
        FROM ad 
        JOIN "user" ON "user".id = ad.user_id 
        JOIN category ON category.id = ad.category_id 
        JOIN condition ON condition.id = ad.condition_id 
        JOIN type ON type.id = ad.type_id 
        JOIN picture ON picture.id = "user".picture_id 
        WHERE type_id = $1 AND category_id = $2`,
        [type_id, category_id]
      );
      if (result.rowCount === 0) {
        throw new Error(
          "Nous n'avons trouvé aucune annonce qui correspond à ce type et cette categorie."
        );
      }

      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   * @async
   * @param {Number} id Unique identifier of ad
   * @return {Object} Result of query in JSON formatted
   */
  async delete(id) {
    try {
      const result = await client.query("DELETE FROM ad WHERE id = $1", [id]);
      debug(result);
      if (result.rowCount === 0) {
        throw new Error("L'annonce n'a pas pu être supprimée.");
      }

      return result.rows;
    } catch (err) {
      debug(err);
    }
  },
  /**
   * @param {Object} ad User ad to modify
   * @return {Object} Results of query in JSON formatted
   */

  async createUserAd(ad) {
    try {
      /**
       * @param {String} prop Keys of ad object
       * @return {Array}
       */
      const fields = Object.keys(ad);
      //console.log("######### fields",fields)
      /**
       * @param {String} index field index of ad object
       */

      const argument = Object.keys(ad).map((_, index) => `$${index + 1}`);
      //console.log("######### argument",argument);
      const values = Object.values(ad);
      //console.log("######### values",values);
      const result = await client.query(
        `
          INSERT INTO "ad"
          (${fields})
          VALUES
          (${argument})
          RETURNING *
          `,
        [...values]
      );
      //console.log(result);
      if (result.rowCount === 0) {
        throw new Error("L'annonce n'a pas pu être crée");
      }

      return result.rows[0];
    } catch (err) {
      debug(err);
    }
  },

  /**
   *
   * @param {String} prop fields of table Ad
   * @return {Object} results of query in JSON formatted
   */
  async edit(id, ad) {
    try {
      const fields = Object.keys(ad).map(
        (prop, index) => `"${prop}" = $${index + 1}`
      );

      const values = Object.values(ad);

      const savedAd = await client.query(
        `
              UPDATE "ad" SET
                  ${fields}
              WHERE id = $${fields.length + 1}
              RETURNING *
          `,
        [...values, id]
      );
      //console.log(fields);
      if (savedAd.rowCount === 0) {
        throw new Error("L'annonce n'a pas pu être modifiée.");
      }

      return { modification: savedAd.rows[0], message: "annonce modifiée" };
    } catch (err) {
      debug(err);
    }
  },
};

module.exports = adDataMapper;
