import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {TypeOrmModule} from '@nestjs/typeorm'

@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type: 'mongodb',
    //   url: 'mongodb+srv://Rohit:<db_password>@cluster0.82vdz.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    //   useNewUrlParser: true,
    //   useUnifiedTopology: true,
    //   synchronize: true,
    //   entities: [__dirname + '/**/*.entity{.ts,.js}'],
    // })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
