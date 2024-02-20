import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { 
  formatNumber, 
  logType, 
  parseNumber, 
  indexPage, 
  eqPage,
  addPage,
  subPage,
} from './helpers/numbers.helper';
import { formatDate } from './helpers/date.helper';
import { cssHelper } from './helpers/css.helper';
import * as session from 'express-session';
// import * as passport from 'passport';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const exphbs = hbs.engine({
      extname: 'hbs',
      defaultLayout: 'layout_main',
      layoutsDir: join(__dirname, '..', 'views', 'layouts'),
      partialsDir: join(__dirname, '..', 'views', 'partials'),
      helpers: { 
        formatNumber, 
        parseNumber, 
        formatDate, 
        indexPage, 
        logType, 
        cssHelper, 
        eqPage,
        addPage,
        subPage,
      },
  });

  const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.use(
    session({
      secret: process.env.JWT_SECRET,
      resave: false,
      saveUninitialized: false,
    }),
  );

  // check session
  app.use(function(req, res, next) {
    res.locals.session = req.session;
    const flashErrors: string[] = req.session.flashErrors;
    if (flashErrors) {
      res.locals.flashErrors = flashErrors;
      req.session.flashErrors = null;
    }
    next();
  });

  app.engine('hbs', exphbs);

  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
