import { Entity, ObjectIdColumn, ObjectId, Column } from 'typeorm';
import { Admin } from '../entities/admin.entitiy';

@Entity('sessions')  

export class Session {
  @ObjectIdColumn()  
  id: ObjectId;

  @Column()  
  userId: string;  

  @Column()
  tokens: string;

  @Column({ default: 'admin' })
  type: string;

  @Column()
  timeStamp: string
}
