import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('otpgen')  

export class OTPGen {
  @ObjectIdColumn()  
  id: ObjectId;

  @Column()
  user_Id: string;

  @Column({ unique: true })  
  email: string;

  @Column()
  newOTP: number;
}
  
