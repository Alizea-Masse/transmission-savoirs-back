const expressJSDocSwagger = require('express-jsdoc-swagger');

const options = {
  info : {
    version : '1.0.0',
    title : 'Savoir',
    description : 'savoir is a knowledge sharing app project'
  },
  baseDir : __dirname,
  filesPattern : ['../router/*.js', '../models/*.js'],
  swaggerUIPath : process.env.API_DOCS_ROUTE,
  exposeApiDocs : true,
  apiDocsPath : '/api/docs'
};

/**
 * Swagger middleware factory
 * @param {Object} app Express application
 * @returns Express JSDoc Swagger middleware that create web documentation
 */

module.exports = (app) => expressJSDocSwagger(app)(options);
