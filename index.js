(async () => {
  const {context} = require('./core');
  const shared = require('./shared');
  context.setParams('environment', shared.environment);
  context.setParams('constant', shared.constant);
  context.setParams('config', shared.config);
  context.setParams('models', require('./tools/mysql/models'));
  context.setParams('locales', require('./tools/locales'));
  context.setParams('middleware', require('./middleware'));

  await context.init();

  let server;
  switch (context.environment.SERVICE_MODE) {
    case 'web-api':
      server = require('./mode/web-api/app')(context);
      await server.init();
      return server.start();
    default:
      throw Error('server mode ERROR!');
  }
})().catch(err => {
  console.log(err);
  process.exit(1);
});