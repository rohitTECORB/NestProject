import { Module } from '@nestjs/common';
import { AdminController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Admin } from './entities/admin.entitiy';
import { Session } from './entities/session.entity'
import { MethodServic } from './methods/methods.service';
import { AuthService } from './guards/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { OTPGen } from './entities/forgetPass.entity';
import {MailerModule} from '@nestjs-modules/mailer';
import { ConfigModule } from '@nestjs/config';
import { authController } from './controller/adminController/authController';
import { userController } from './controller/adminController/userController';
import { vendorController } from './controller/adminController/vendorController';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { User } from './entities/user.entity';
import { ViewController } from './app.controller'
import { Vendor } from './entities/vendor.entity';


@Module({
  imports: [ 
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
      serveRoot: '/static', 
    }),
    JwtModule.register({
    secret: '123456', 
    signOptions: {expiresIn:'5m'}, 
  }),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      host: 'localhost',
      port: 27017,
      synchronize: false,
      database: 'AdminTesting',
      entities: [Admin, Session, OTPGen , Vendor, User,
        __dirname + '/**/*.entity{.ts, .js}'
      ],
        
    }),
    TypeOrmModule.forFeature([Admin, Session, OTPGen, User,Vendor ]),
    MailerModule.forRoot({
      transport: {
        host:'smtp.mailtrap.io',
        port: 587,
        auth: {
          user: process.env.EMAIL_USERNAME,
          pass: process.env.EMAIL_PASSWORD,
        },
      },
      defaults: {
        from: '"No Reply" <no-reply@mailtrap.io>',
      },
    }) ,
    ConfigModule.forRoot({envFilePath:'.env', isGlobal:true})
  ],
  controllers: [AdminController, ViewController],
  providers: [MethodServic, authController, userController, vendorController, AuthService],
})
export class AppModule {}
