import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GamesModule } from './games/games.module';
import { ListsModule } from './lists/lists.module';
import { UsersModule } from './user/users.module';
import { Users } from './user/entity/user.entity';
import { Lists } from './lists/entity/list.entity';

const isProduction = process.env.NODE_ENV === 'production';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) =>
        isProduction
          ? {
              type: 'postgres',
              url: configService.get('DATABASE_URL'),
              ssl: {
                rejectUnauthorized: false,
              },
              entities: [Users, Lists],
              synchronize: true,
            }
          : {
              type: 'postgres',

              host: configService.get('DB_HOST'),
              port: configService.get<number>('DB_PORT'),
              username: configService.get('DB_USERNAME'),
              password: configService.get('DB_PASSWORD'),
              database: configService.get('DB_NAME'),
              entities: [Users, Lists],
              synchronize: true,
            },
      inject: [ConfigService],
    }),
    GamesModule,
    ListsModule,
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
