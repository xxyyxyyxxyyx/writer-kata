const routes = require("next-routes")();
routes.add("/stories/new", "/stories/new");
routes.add("/stories/:address", "/stories/show");
routes.add("/stories/:address/paragraphs/new", "/stories/paragraphs/new");
module.exports = routes;
