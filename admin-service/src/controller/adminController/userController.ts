import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment  from 'moment'

import { MethodServic } from '../../methods/methods.service'
import { Admin } from '../../entities/admin.entitiy';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity'
import { AuthService } from '../../guards/auth.service';
import { UserDto } from '../../dto/user.dto';
import { User } from 'src/entities/user.entity';



export class userController{

    constructor(
        @InjectRepository(Admin)
        private readonly adminRepository: Repository<Admin>,
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        @InjectRepository(OTPGen)
        private readonly otpRepository: Repository<OTPGen>,
    
        private readonly methodsService: MethodServic,
        private readonly authService: AuthService
      ){}



  async addUser(SignupDto: UserDto) {
        try {
          const { email, name, contact } = SignupDto;
   
          if (!email || !name || !contact) {
            return {
              code: 400,
              message: 'Please enter correct details',
            };
          }     
          const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
          const resultEmail = emailRegex.test(email)   
          if (!resultEmail) {
            return {
              code: 400,
              message: 'Invalid email format',
              result: resultEmail
            };
          }
          const existingUser = await this.userRepository.findOne({ where: { email } });         
          if (existingUser) {
            return {
              code:400,
              message: 'Email Already Exist'
            }
          }else{
          const pass = await this.methodsService.generateRandomPassword(5)        
          var User_obj: any = {
            name: name,
            email: email,
            password: pass, 
            contact: contact,
            isActive: true,
            isDelete: false,
            createdAt: new Date(),
            updateAt: new Date()
          };    

          const savedUser = await this.userRepository.save(User_obj);
     
          const token = await this.authService.generateToken(savedUser.id.toString());
             
          const session: any = {
            vendorId: savedUser.id.toString(),
            type: 'user',
            token: token,
          };    
          const savedSession = await this.sessionRepository.save(session);     
          return {
            code: 200,
            message: 'user added successfully',
            result: {savedUser, pass},
            session: savedSession,
          };
        }
        } catch (error) {
          console.log('Error during vendor signup:', error);
          return{
            code: 500,
            message: 'Internal Server Error'
          }
        }
      }
      
      


   async updatePassword(updatePasswordDto:  UserDto){
    try{
      const {oldpassword, newpassword, email} = updatePasswordDto;
      console.log(oldpassword)
      console.log(newpassword)
      console.log(email)
      if(!oldpassword || !newpassword || !email){
        return {
          code: 400,
          message: 'Bad Request'
        }
      }
      
      let check = await this.userRepository.findOne({where:{email}})
      console.log(check)
      console.log(check.password)
      const user_id = check.id.toString();
      console.log(user_id)
      if(!check){
        return {
          code: 400,
          message: 'Bad Request'
        }
      }else{
        const validatePassword = await this.methodsService.compare_pass({'password':oldpassword, '_password': check.password})
        console.log(validatePassword)
        if(validatePassword == true){
         
           let check = await this.userRepository.update(user_id, { password: newpassword });
           return {
            code: 200,
            message: 'Password successfully updated',
            result: check
           }
        }else{
          return {
            code:400,
            message: 'Please enter correct password'
          }
        }
      }
    }catch(error){
      return {
        code: 500,
        message: 'Internal server error',
        result: error
      }
    }
 }


async forgetPass(forgetPassDto:  UserDto){
  try{
    const {email} = forgetPassDto;
    console.log(email)
    if(!email){
      return{
        code: 400,
        message: ' Bad Request'
      }
    }else{
      const check = await this.userRepository.findOne({where:{email}});
      
      if(check){
        const user_id = check.id.toString()
        const newOTP = await this.methodsService.generateOTP(4)
       
        const saved_OTP = {
          user_id,
          newOTP,
          email
        }
        const savedOTP = await this.otpRepository.save(saved_OTP)
        const send_email = await this.methodsService.sendEmail({newOTP, email})
      }else{
        return {
        code:400,
        message: 'Bad Request',
      }   
    }
   }
  }catch(error){
    console.log('Internal server error', error)
  }
 }



async varifyOTP(ForgetPassDto: UserDto){
  try{
    const {email, OTP} = ForgetPassDto;
    console.log(email)
    console.log(OTP)
      const check = await this.otpRepository.findOne({where:{email}});
      if(!check){
        return{
          code: 400,
          message: 'Email Id does not exist'
        }
     }else{
      const otpStatus = await this.methodsService.verifyOTP({'dbOTP': check.newOTP, '_otp': OTP})
      if(otpStatus == true){
        const newcheck = await this.userRepository.findOne({where:{email}});
        const pass = newcheck.password;
        const send_email = await this.methodsService.sendEmail1({pass, email})
        return{
          code:200,
          message: 'OTP varification successfull',
          result: otpStatus
        }
      } else{
        return{
          code:400,
          message:'OTP varification failed. Please enter correct otp',
          result: otpStatus
        }
      }
   }     
  }catch(error){
    console.log('Internal server error', error)
  }
 }



 async EditUserProfile(EditUserDto: UserDto) {
  try {
    const data = EditUserDto;
    console.log(data.email);
    
    const status = data.status;
    const _id: any = data.user_id;
    
    if (!_id   ) {
      return {
        code: 400,
        message: 'Bad Request: Please enter correct data',
      };
    }
    const check = await this.userRepository.findOne(_id);   
    if (check) {    
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const result1 = emailRegex.test(data.email)
      if ( data.email  && !result1) {
        return {
          code: 400,
          message: 'Invalid email format',
          result: result1
        }
      }

      const contact = check.contact;
      
      let status1: Boolean = check.isActive;
      if (status === 'Active') {
        status1 = true;
      } else if (status === 'Inactive') {
        status1 = false;
      }

      const updatedData = {
        name: data.name ? data.name : check.name,
        email: data.email ? data.email : check.email,
        contact: data.contact ? data.contact : contact,
        isActive: status1,
        updatedAt: new Date()
      };

      const savedObj = await this.userRepository.update(_id, updatedData);
      
      return {
        code: 200,
        message: 'Profile edit successful',
        result: savedObj,
      };
    } else {
      return {
        code: 404,
        message: 'User not found',
      };
    }
  } catch (error) {
    return {
      code: 500,
      message: 'Internal Server Error',
      result: error.message,
    };
  }
}



async  userProfileDetails(UserProfileDto: UserDto) {
  try {
  
    const reqData = UserProfileDto;
    const _id:any = reqData.user_id;
    console.log(_id)
    if (!_id) {
      return {
        code: 400,
        message: 'Bad Request: Missing userId'
      }
    }
    const check = await this.userRepository.findOne(_id);
    console.log(check)
    if (!check) {
      return{
        code: 400,
        message: "User with this userId does exist",    
      }
    } else {
     return {
      code:200,
      message: " User found successfully",
      result: check
     }
    }
  } catch (error) {
    console.error(error); 
    return {
      code: 500,
      message: 'Internal Server Error',
      result: error.message,

    }
  }
}


async UpdateuserStatus(UserStatusUpdateDto: UserDto){
  try{
    const reqData = UserStatusUpdateDto;
    const status = reqData.status;
    console.log(status)
    const _id:any = reqData.user_id;  
    console.log(_id)
    if(!_id){
      return{
        code:400,
        message: 'Bad Request: Missing userId',
      }
    }else{
    const check = await this.userRepository.findOne(_id);
    console.log(check)
      if(check){
        if(status == 'Active'){
          var new_Obj ={
            'isActive': true        
            }
        }else{
          var new_Obj ={
            'isActive': false
          }
        }
        const updatedStatus =  await this.userRepository.update(_id, new_Obj);
        return{
          code:200,
          message:'Status updated successfull',
          result: updatedStatus
        }
      }else{
        return{
          code:400,
          message: 'Bad Request',
        }
      }
    }
  }catch(error){
    return{
      code: 500,
      message: 'Internal Server Error',
      result: error.message
    }

  }
}

 
  async userlisting(userListingDto: UserDto){
      try {
          const data = userListingDto;
          const page:any = data.pageNo || 1;
          const page1 = parseInt(page, 10); 
          const perPage:any = data.perPage || 10;
          const perPage1 = parseInt(perPage, 10); 
          let obj_data: any = { 'isDelete': false };

          if (data.search && data.search.trim() !== '' && data.toDate && data.fromDate) {
              obj_data = {
                  $or: [
                      { name: { '$regex': data.search, '$options': 'i' } },
                      { email: { '$regex': data.search, '$options': 'i' } },
                      { contact: { '$regex': data.search, '$options': 'i' } }
                  ],
                  isDelete: false,
                  createdAt: { '$gte': new Date(data.fromDate), '$lte': new Date(data.toDate) },                 
              };            
          } else if (data.search && data.search!== '') {
              obj_data = {
                  $or: [
                      { name: { '$regex': data.search, '$options': 'i' } },
                      { email: { '$regex': data.search, '$options': 'i' } },
                      { contact: { '$regex': data.search, '$options': 'i' } }
                  ],
                  isDelete: false,
              };
          } else if (data.fromDate && data.toDate) {
              obj_data = {
                  createdAt: { '$gte': new Date(data.fromDate), '$lte': new Date(data.toDate) },
                  isDelete: false
              };
          }       
          const total: number = await this.userRepository.count(obj_data);
       
          const usrData = await this.userRepository.find({
            where: obj_data,
            order: {
              createdAt: 'DESC',
            }, 
            skip: (page1 - 1) * perPage1, 
            take: perPage1,               
          });
          const length: number = usrData.length;
          console.log(length);
          var newObj_data = [];
          var obj_data1 = {};
      
          var status1;
          for(let i = 0; i < length; i++){
            
              var objectId = usrData[i].id;
              var id =  objectId.toString()
            obj_data1={
              name: usrData[i].name,
              email: usrData[i].email,
              contact: usrData[i].contact, 
              user_id: id,
              status:usrData[i].isActive,
              createdAt: moment(usrData[i].createdAt).format('YYYY/MM/DD'),
          }
              newObj_data.push(obj_data1)
          }
         
          return {
            code: 200,
            message: 'userlisting found successfully',
            result: newObj_data, total
          
          }   
      } catch (error) {
          console.error('Error occurred:', error);
          return {
              code: 500,
              message: 'Internal Server Error', error,
          }
      }
  }

  async adminDeleteUser(DeleteUserDto:UserDto){ 
    try{
      const data = DeleteUserDto;
    
      const id:any = data.user_id;
      console.log(id)
      const chck = await this.userRepository.findOne(id);
  
      if(!chck){
        return{
          code: 400,
          message: ' Bad Request'
        }
      }else{
        const userDeleted = await this.userRepository.update(id,{isDelete:true})
        return   {
          code: 200,
          message: 'userDeleted successfully',
          result: userDeleted
        }   
      }
    }catch(error){
      return {
        code: 500,
        message: 'Internal Server Error', error,
    }
    }
  }



}