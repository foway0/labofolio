import env from './shared/environment';
console.log(env);
import ApiApplication from './app/app';

(async (): Promise<void> => {
  const app = new ApiApplication(env.SERVICE_HOST, env.SERVICE_PORT);
  await app.init();
  app.start(env);
})();
