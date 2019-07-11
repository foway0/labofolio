const OpenApiValidator = require('express-openapi-validator').OpenApiValidator;

const core = require('../../core');
const routes = require('./routes');

const context = core.context;
const {utils, middleware, locales, bugsnag} = context;
const code = context.constant.statusCode;
const {i18next, cors} = middleware;
const config = context.getConfig();

class Service extends core.Application {

  constructor(ctx) {
    super(ctx);
  }

  async init() {
    this.app.use(cors(config.cors));
    // Install the I18next on your express app
    this.app.use(i18next('ko', ['ko', 'ja'], {
      ko: { translation: locales.ko },
      ja: { translation: locales.ja },
    }));
    // Install the bugsnag on your express app
    this.app.use(bugsnag.requestHandler);
    // Install the OpenApiValidator on your express app
    new OpenApiValidator({
      apiSpecPath: utils.parser.pathJoin(__dirname, 'web-oas.yaml'),
    }).install(this.app);

    // load route
    super.loadRoutes(routes);

    // TODO health Check
    this.app.get('/ping', async (req, res) => {
      const sequelize = context.getMysqlConnect();
      const result = await sequelize.query("SELECT 'pong'", {
        type: sequelize.QueryTypes.SELECT,
        plain: true
      });

      res.status(code.OK).send(result.pong);
    });

    // error handler
    this.app.use(bugsnag.errorHandler);
    this.app.use((err, req, res, next) => {
      // Will get here
      if(err.statusCode)
        res.status(err.statusCode).json({
          name: err.name,
          message: err.message,
        });
      // エラー扱いになるよ…
      else if(err.status && err.status === code.NOT_FOUND)
        res.status(code.NOT_FOUND).send('what??? (╯°□°）╯︵ ┻━┻');
      else if(err.status)
        res.status(err.status).json({
          errors: err.errors,
        });
      else
        res.status(code.SERVICE_UNAVAILABLE).end();

    });
  }
}

module.exports = env => {
  return new Service(env);
};