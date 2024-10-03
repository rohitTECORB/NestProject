import { Test, TestingModule } from '@nestjs/testing';
import { AuthController, UserController, VenderController } from './app.controller';
import { authController } from './controller/adminController/authController';
import { userController } from './controller/adminController/userController';
import { venderController } from './controller/adminController/vendorController';


describe('AppController', () => {
  let appController: AuthController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [authController, userController, venderController],
    }).compile();

    appController = app.get<AuthController>(AuthController);
  });

  // describe('root', () => {
  //   it('should return "Hello World!"', () => {
  //     expect(appController.getHello()).toBe('Hello World!');
  //   });
  // });
});
