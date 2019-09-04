module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/saveArticle', controller.article.index);
    router.get('/myArticle', controller.article.getMyArticle);
  };