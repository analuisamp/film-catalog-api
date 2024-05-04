import { Entity, BeforeInsert, CreateDateColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { randomUUID } from 'node:crypto'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date

  @BeforeInsert()
  generatedId() {
    if (this.id) {
      return
    }
    this.id = randomUUID()
  }
}
