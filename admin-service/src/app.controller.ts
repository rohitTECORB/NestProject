import { Controller, Post, Body, Delete, Patch , Get, Res, ParseIntPipe, Param, Query} from '@nestjs/common';
import { authController } from './controller/adminController/authController';
import { userController } from './controller/adminController/userController';
import { vendorController } from './controller/adminController/vendorController';
import { UserDto } from './dto/user.dto';
import { AuthDto } from './dto/auth.dto';
import { query, Response } from 'express';
import { join } from 'path';
import { VendorDto } from './dto/vendor.dto';
import { Vendor } from './entities/vendor.entity';



@Controller('static')
export class ViewController {

  @Get('user')
  getUser(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'views', 'user.html'));
  }

  @Get('vendor')
  getVendor(@Res() res: Response) {
    res.sendFile(join(__dirname, '..' , 'public','views' ,'vendor.html'));
  }

  @Get('admin')
  getAdmin(@Res() res: Response) {
    res.sendFile(join(__dirname, '..', 'public', 'views','admin.html'));
  }
}



@Controller('adminController')
export class AdminController {
  constructor(private readonly  authController: authController,
  private readonly userController: userController,
  private readonly vendorController: vendorController
 ){}

  //Auth Routes
  @Post ('signup')
  async signup(@Body() SignupDto:AuthDto){
    return await this.authController.adminSignUp(SignupDto);
  }

  @Post ('login')
  async login(@Body() LoginDto: AuthDto){
    return await this.authController.login(LoginDto);
  }

  @Post ('logout')
  async logout(@Body() LogoutDto: AuthDto){
    return await this.authController.logout(LogoutDto)
  }
 

  // User Routes
 @Post('addUser')
 async addUser(@Body() userSignUpDto: UserDto){
  return await this.userController.addUser(userSignUpDto)
 }

  @Patch('updatePassword')
  async updatePassword(@Body() UpdatePasswordDto:UserDto){
    return await this.userController.updatePassword(UpdatePasswordDto)
  }

  @Post('forgetpassUser')
  async forgetpassword(@Body() ForgetPassDto: UserDto){
    return await this.userController.forgetPass(ForgetPassDto)
  }

  @Get('varifyUserOTP')
  async varifyOTP(@Body() ForgetPassDto: UserDto ){
    return await this.userController.varifyOTP(ForgetPassDto)
  }

  @Post('EditUserProfile')
  async EditUserProfile(@Body() EditUserDto:UserDto){
    return await this.userController.EditUserProfile(EditUserDto)
  }

  @Get('userProfileDetails')
  async userProfileDetails(@Query() UserProfileDto:UserDto){
    return await this.userController.userProfileDetails(UserProfileDto)
  }

  @Post('userUpdateStatus')
  async userUpdateStatus(@Body() UserProfileUpdateDto:UserDto){
    return await this.userController.UpdateuserStatus(UserProfileUpdateDto)
  }

  @Get('userListing')
  async userListing (@Query() userListingDto: UserDto){
    return await this.userController.userlisting(userListingDto)
  }

  @Post('adminDeleteUser')
  async adminDeleteUser (@Body() DeleteUserDto:UserDto){
    return await this.userController.adminDeleteUser(DeleteUserDto)
  }

  // Vendor Routes
   @Post('addVender')
   async newVendorSignUp(@Body() VendorSignupDto:VendorDto){
    console.log("enter controller" )
    return await this.vendorController.addVender(VendorSignupDto)
   }


   @Post('updateVendorPass')
   async updateVendorPassword(@Body() updatePasswordDto:VendorDto){
     return await this.vendorController.updatePassword(updatePasswordDto)
   }

   @Post('forgetPassVendor')
   async forgetPass(@Body() forgetPassDto:VendorDto){
     return await this.vendorController.forgetPass(forgetPassDto)
   }

   @Post('varifyVendorOTP')
   async varifyVendorOTP(@Body() varifyVendorOTPDto: VendorDto){
    return await this.vendorController.varifyOTP(varifyVendorOTPDto)
   }


   @Post('EditVendorProfile')
   async EditVendorProfile(@Body() editVendorprofile: VendorDto){
    return await this.vendorController.EditVendorProfile(editVendorprofile)
   }


   @Get('vendorProfileDetails')
   async vendorProfileDetails(@Query() vendorProfileDto: VendorDto){
    console.log('enter controller')
    return await this.vendorController.vendorProfileDetails(vendorProfileDto)
   }


   @Post ('UpdateVendorStatus')
   async UpdatevendorStatus(@Body() updateVendorDto: VendorDto){
    return await this.vendorController.UpdatevendorStatus(updateVendorDto);
   }


   @Get('vendorlisting')
   async vendorlisting(@Query() vendorListingDto: VendorDto){
    return await this.vendorController.vendorlisting(vendorListingDto)
   }

   
  @Post('adminDeleteVendor')
  async adminDeleteVendor (@Body() DeleteVendorDto:VendorDto){
    return await this.vendorController.adminDeleteVendor(DeleteVendorDto)
  }



}











