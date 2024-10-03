import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as moment  from 'moment'
import { MethodServic } from '../../methods/methods.service'
import { Admin } from '../../entities/admin.entitiy';
import { Repository } from 'typeorm';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity'
import { AuthService } from '../../guards/auth.service';
import { VendorDto } from '../../dto/vendor.dto';
import { Vendor } from '../../entities/vendor.entity'





export class vendorController{

    constructor(
        @InjectRepository(Vendor)
        private readonly vendorRepository: Repository<Vendor>,
        @InjectRepository(Session)
        private readonly sessionRepository: Repository<Session>,
        @InjectRepository(OTPGen)
        private readonly otpRepository: Repository<OTPGen>,
    
        private readonly methodsService: MethodServic,
        private readonly authService: AuthService
      ){}



      async addVender(SignupDto: VendorDto) {
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
          const existingVendor = await this.vendorRepository.findOne({ where: { email } });         
          if (existingVendor) {
            return {
              code:400,
              message: 'Email Already Exist'
            }
          }else{

          const pass = await this.methodsService.generateRandomPassword(5)        
          var vendor_obj: any = {
            name: name,
            email: email,
            password: pass, 
            contact: contact,
            isActive: true,
            isDelete: false,
            createdAt: new Date(),
            updateAt: new Date()
          };    

          const savedVendor = await this.vendorRepository.save(vendor_obj);
     
          const token = await this.authService.generateToken(savedVendor.id.toString());
             
          const session: any = {
            vendorId: savedVendor.id.toString(),
            type: 'vendor',
            token: token,
          };    
          const savedSession = await this.sessionRepository.save(session);     
          return {
            code: 200,
            message: 'Signup successful',
            result: {savedVendor, pass},
            session: savedSession,
          };
        }
        } catch (error) {
          console.log('Error during vendor signup:', error);
          throw new InternalServerErrorException('Something went wrong')
        }
      }
    



      async updatePassword(updatePasswordDto:  VendorDto){
        try{
          const {oldpassword, newpassword, email} = updatePasswordDto;
     
          if(!oldpassword || !newpassword || !email){
            return {
              code: 400,
              message: 'Bad Request'
            }
          }         
          let check = await this.vendorRepository.findOne({where:{email}})
     
          const vendor_id = check.id.toString();
       
          if(!check){
            return {
              code: 400,
              message: 'Bad Request'
            }
          }else{
            const validatePassword = await this.methodsService.compare_pass({'password':oldpassword, '_password': check.password})
        
            if(validatePassword == true){             
               let check = await this.vendorRepository.update(vendor_id, { password: newpassword });
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
    


     async forgetPass(forgetPassDto:  VendorDto){
      try{
        const {email} = forgetPassDto;   
        if(!email){        
          return{
            code: 400,           
            message: 'Email Id Does not exist'
          }         
        }else{
          const check = await this.vendorRepository.findOne({where:{email}});  
          const _id:any = check.id;             
          if(check){
            const vendor_id = _id.toString();
            const newOTP = await this.methodsService.generateOTP(4); 
                 
            const saved_OTP = {
              vendor_id,
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



 async varifyOTP(varifyVendorOTPDto: VendorDto){
  try{
    const {email, OTP} = varifyVendorOTPDto;
   
      const check = await this.otpRepository.findOne({where:{email}});
      if(!check){
        return{
          code: 400,
          message: 'Email Id does not exist'
        }
     }else{
      const otpStatus = await this.methodsService.verifyOTP({'dbOTP': check.newOTP, '_otp': OTP})
      if(otpStatus == true){
        const newcheck = await this.vendorRepository.findOne({where:{email}});
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


 async EditVendorProfile(EditVendorDto: VendorDto) {
  try {
    const data = EditVendorDto;
 
    
    const status = data.status;
    const _id: any = data.vendor_id;
    
    if (!_id   ) {
      return {
        code: 400,
        message: 'Bad Request: Please enter correct data',
      };
    }
    const check = await this.vendorRepository.findOne(_id);   
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
      } else if (status === 'Deactive') {
        status1 = false;
      }
      const updatedData = {
        name: data.name ? data.name : check.name,
        email: data.email ? data.email : check.email,
        contact: data.contact ? data.contact : contact,
        isActive: status1,
        updatedAt: new Date()
      };
      const savedObj = await this.vendorRepository.update(_id, updatedData); 
      return {
        code: 200,
        message: 'Profile edit successful',
        result: savedObj,
      };
    } else {
      return {
        code: 404,
        message: 'vendor not found',
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



async  vendorProfileDetails(vendorProfileDto: VendorDto) {
  try {  
    const reqData = vendorProfileDto;
    const _id:any = reqData.vendor_id;
    if (!_id) {
      return {
        code: 400,
        message: 'Bad Request: Missing vendorId'
      }
    }
    const check = await this.vendorRepository.findOne(_id);
  
    if (check) {
      return{
        code: 200,
        message: "vendor with this vendorId exist",
        result: check
      }
    } else {
      return {
        
          code: 400,
          message: 'Vendor does not exist with this vendorId'
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



async UpdatevendorStatus(VendorStatusUpdateDto: VendorDto){
  try{
    const reqData = VendorStatusUpdateDto;
    const status = reqData.status;
    console.log(status)
  
    const _id:any = reqData.vendor_id;  
    console.log(_id)
   
    if(!_id){
      return{
        code:400,
        message: 'Bad Request: Missing vendorId',
      }
    }else{
    const check = await this.vendorRepository.findOne(_id);
  
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
        const updatedStatus =  await this.vendorRepository.update(_id, new_Obj);
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


async vendorlisting(VendorListingDto: VendorDto){
  try {
      const data = VendorListingDto;

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

      const total: number = await this.vendorRepository.count(obj_data);
     

      const usrData = await this.vendorRepository.find({
        where: obj_data,
        order: {
          createdAt: 'DESC',
        }, 
        skip: (page1 - 1) * perPage1, 
        take: perPage1,               
      });    
      
      const length: number = usrData.length;
     
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
          vendor_id: id,
          status:usrData[i].isActive,
          createdAt: moment(usrData[i].createdAt).format('YYYY/MM/DD'),
      }
          newObj_data.push(obj_data1)
      }
    
      return {
        code: 200,
        message: 'vendorlisting found successfully',
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

async adminDeleteVendor(DeleteVendorDto:VendorDto){ 
  try{
    const data = DeleteVendorDto;
  
    const id:any = data.vendor_id;
    console.log(id)
    const chck = await this.vendorRepository.findOne(id);

    if(!chck){
      return{
        code: 400,
        message: ' Bad Request'
      }
    }else{
      const vendorDeleted = await this.vendorRepository.update(id,{isDelete:true})
      return   {
        code: 200,
        message: 'vendorDeleted successfully',
        result: vendorDeleted
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