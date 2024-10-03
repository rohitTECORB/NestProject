import { timeStamp } from 'console';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('users')  

export class User {
  @ObjectIdColumn()  
  id: ObjectId;

  @Column()
  name: string;

  @Column({ unique: true })  
  email: string;

  @Column({unique:true})
  password: string;

  @Column()
  contact: string;

  @Column()
  token: string;

  @Column()
  otp: number;

  @Column()
  isActive: Boolean;

  @Column()
  updatedAt: Date

  @Column()
  createdAt: Date

  @Column()
  isDelete:Boolean

  @Column()
  toDate: Date

  @Column()
  fromDate: Date
}
  
