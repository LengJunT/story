module.exports = app => {
    const { router, controller } = app;
    router.get('/', controller.home.index);
    router.post('/registered', controller.registered.index);
    router.post('/login', controller.login.index);
    router.post('/checkToken', controller.token.index);
    router.post('/getUserInfo', controller.user.index);
  };