const client = require("../config/db");
const debug = require("debug")("app:Debug");

const userDataMapper = {
  async getAllUsers() {
    try {
      const users = await client.query('SELECT * FROM "user"');
      if (users.rowCount === 0) {
        throw new Error("Il n'a aucun·e utilisateur·ice");
      }

      return {
        users: users.rows,
      };
    } catch (err) {
      debug(err);
    }
  },

  async getUserProfil(id) {
    try {
      const resultUser = await client.query(
        `
            SELECT "user".id, "user".pseudo, "user".email, "user".password, "user".birthdate, "user".pronoun, "user".firstname, "user".lastname, "user".postal_code, "user".description, "user".picture_id, "user".role_id, "user".created_at, "user".updated_at,
            picture.name, picture.slug
            FROM "user"
            JOIN picture ON picture.id = "user".picture_id
            WHERE "user".id = $1;
          `,
        [id]
      );
      const adsOfUser = await client.query(
        `
            SELECT
            ad.id, ad.title, ad.postal_code, ad.image, ad.description, ad.created_at, ad.updated_at,
            category.id AS category_id, category.name AS category_name, category.slug AS category_slug,
            condition.id AS condition_id, condition.name AS condition_name,
            type.id AS type_id, type.name AS type_name
            FROM "ad"
            JOIN "category" ON category.id = ad.category_id
            JOIN "condition" ON condition.id = ad.condition_id
            JOIN "type" ON type.id = ad.type_id
            WHERE user_id = $1;
          `,
        [id]
      );
      if (resultUser.rowCount === 0) {
        throw new Error("Nous n'avons trouvé aucun profil d'utilisateur·ice.");
      }
      return {
        user: resultUser.rows[0],
        adsOfUser: adsOfUser.rows,
      };
    } catch (error) {
      debug(error);
    }
  },

  async edit(id, user) {
   try{

     const fields = Object.keys(user).map(
       (prop, index) => `"${prop}" = $${index + 1}`
     );
     debug(fields);
     const values = Object.values(user);
     debug(values);


     const savedUser = await client.query(
       `
                 UPDATE "user" SET
                     ${fields}
                 WHERE id = $${fields.length + 1}
                 RETURNING *
             `,
       [...values, id]
     );
      if (savedUser.rowCount === 0) {
     throw new Error("L'utilisateur·ice n'a pas pu être modifié·e");
      }
     return {
       user: savedUser.rows[0],
     };
   }catch(error){
    debug(error)
   }
    

  },

  async delete(id) {
    try {
      const result = await client.query('DELETE FROM "user" WHERE id = $1', [
        id,
      ]);
      if (result.rowCount === 0) {
        throw new Error("L'utilisateur·ice n'a pas pu être supprimé·e");
      }
      return {message : "L'utilisateur·ice a bien été supprimé·e"};
    } catch (err) {
      debug(err);
    }
  },

  async getAllAvatars() {
    try {
      const results = await client.query("SELECT * FROM picture");
      //console.log(results);
      if (results.rowCount === 0) {
        throw new Error("No avatars");
      }
      return results.rows;
    } catch (err) {
      debug(err);
    }
  },
};

module.exports = userDataMapper;
