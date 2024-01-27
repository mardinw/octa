import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import * as hbs from 'express-handlebars';
import { formatNumber, logType, parseNumber, indexPage } from './helpers/numbers.helper';
import { formatDate } from './helpers/date.helper';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  const exphbs = hbs.engine({
      extname: 'hbs',
      defaultLayout: 'layout_main',
      layoutsDir: join(__dirname, '..', 'views', 'layouts'),
      partialsDir: join(__dirname, '..', 'views', 'partials'),
      helpers: { formatNumber, parseNumber, formatDate, indexPage},
  });

  app.engine('hbs', exphbs);

  app.setViewEngine('hbs');
  await app.listen(3000);
}
bootstrap();
