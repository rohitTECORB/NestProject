import { timeStamp } from 'console';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('admins')  

export class Admin {
  @ObjectIdColumn()  
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  user_id: string
  
  @Column({ unique: true })  
  email: string;

  @Column()
  password: string;

  @Column()
  contact: string;

  @Column()
  token: string;

  @Column()
  otp: number;

  @Column()
  isDelete:Boolean;

  @Column()
  isActive: Boolean;

  @Column()
  updatedAt: Date

  @Column()
  createdAt: Date
 
}
  
