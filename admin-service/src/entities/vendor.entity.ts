
import { timeStamp } from 'console';
import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';

@Entity('vendor')  

export class Vendor {
  @ObjectIdColumn()  
  id: ObjectId;

  @Column()
  name: string;

  @Column()
  vendor_id: string
  
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
  createdAt: Date;

}
  
