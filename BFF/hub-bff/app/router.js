module.exports = app => {
  const { router, controller, middleware } = app;
  const checkToken = middleware.checkToken({}, app)
  router.get('/', controller.home.index);
  router.post('/login', controller.login.index);
  router.post('/registered', controller.registered.index)
  // 保存文章
  router.post('/saveArticle', checkToken, controller.article.saveArticleController)
  // 获取当前用户的文章列表
  router.get('/myArticle', checkToken, controller.article.getMyArticle)
  // 获取当前用户的指定文章
  router.get('/myArticle/:id', checkToken, controller.article.getMyArticle)
};