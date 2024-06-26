import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity()
export class Chat {
  @PrimaryColumn()
  id: string;

  @Column({
    type: 'jsonb',
    nullable: true,
    default: () => "'[]'",
    array: false,
  })
  conversation: Array<{
    createdDate: Date;
    status: string;
    content: string;
  }>;

  @Column()
  owner: string;

  @Column()
  receiver: string;
}
