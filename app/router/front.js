// 前端路由
'use strict';
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.get('/', controller.home.index);
  router.get('/list', controller.home.list);
  router.get('/getArticleById/:id', controller.home.getArticleById);
};
