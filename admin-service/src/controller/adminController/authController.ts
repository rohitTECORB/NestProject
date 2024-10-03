import { Injectable, ConflictException, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Admin } from '../../entities/admin.entitiy';
import { Session } from '../../entities/session.entity';
import { OTPGen } from '../../entities/forgetPass.entity'
import { MethodServic } from '../../methods/methods.service'


import { AuthService } from '../../guards/auth.service';
import { AuthDto } from 'src/dto/auth.dto';


@Injectable()

export class authController {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
    @InjectRepository(Session)
    private readonly sessionRepository: Repository<Session>,
    @InjectRepository(OTPGen)
    private readonly otpRepository: Repository<OTPGen>,

    private readonly methodsService: MethodServic,
    private readonly authService: AuthService
  ){}


  async adminSignUp(SignupDto: AuthDto) {
    try {
      const { email, name, contact } = SignupDto;
      console.log(email);
      console.log(name);
      console.log(contact);
  
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
  
      const existingAdmin = await this.adminRepository.findOne({ where: { email } });
      if (existingAdmin) {
        throw new ConflictException('Email already exists');
      }
  
      var admin_obj: any = {
        name: name,
        email: email,
        // password: hashedPassword, 
        contact: contact,
        isActive: true,
        isDelete: false,
        createdAt: new Date(),
        updateAt: new Date()
      };
      const savedAdmin = await this.adminRepository.save(admin_obj);
      const token = await this.authService.generateToken(savedAdmin.id.toString());
      console.log(token);
  
      const session: any = {
        userId: savedAdmin.id.toString(),
        type: 'admin',
        token: token,
      };

      const savedSession = await this.sessionRepository.save(session);
  
      return {
        code: 200,
        message: 'Signup successful',
        result: savedAdmin,
        session: savedSession,
      };
    } catch (error) {
      console.log('Error during admin signup:', error.response);
      throw new InternalServerErrorException('Something went wrong')
  
    }
  }


  async login(LoginDto: AuthDto){
    try{
      const {name, password, email} =  LoginDto;
     
      const check:any = await this.adminRepository.findOne({where:{email}});
     
      if(!check){
        throw new ConflictException('Email does not esist');
      }else{
        let passwordStatus = await this.methodsService.compare_pass({'password': password, 'user_password': check.password});
      
        if(passwordStatus == false){
          throw new ConflictException('Wrong Password')
        }else{   
          const check_id = check.id.toString()    
          let token = await this.authService.generateToken(check_id)
          console.log(token)
          
          let dlt_session = await this.sessionRepository.delete({userId:check_id});
         
          let obj:any = {
            'userId': check_id,
            'tokens': token,
            'type': 'admin',
            'timeStamp': Date.now()
          }
        
          let save_session = await this.sessionRepository.save(obj);

          return{
            code: 200,
            message: 'Login successful',
            result: token,
            session: save_session
          }
      } 
    }
  }catch(error){
    console.log(error);
    return {
      code: 500,
      message:'Internal server error',
    }
  }
}


  async logout(LogoutDto: AuthDto){
    try{
      const { email } = LogoutDto;
      if(!email){
        return {
          code: 400,
          message: 'Bad Request',
        }
      }else{
        const check = await this.adminRepository.findOne({where:{email}})
        console.log(check)
        if(check){
        const check_id = check.id.toString();
        console.log(check_id)

        var deletedUser = await this.sessionRepository.delete({userId:check_id})
        console.log(deletedUser)
        return {
          code:200,
          message:'Logout successfull',
          result:deletedUser
        }
      
      }else{
        return {
          code:400,
          message: 'Admin with this email does not exist'
        }
      }
    }
  }catch(error){
    console.log(error)
    return{
      code:500,
      message: 'Internal Server error'
    }

  }
}

}

