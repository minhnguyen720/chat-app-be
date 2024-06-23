import { User } from 'src/entities/user.entity';
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryColumn()
  id: string;

  @Column()
  content: string;

  @Column()
  createdDate: Date;

  @Column()
  status: string;

  @Column()
  owner: string;

  @Column()
  receiver: string;

  @OneToOne(() => User)
  @JoinColumn()
  createdUser: string;
}
