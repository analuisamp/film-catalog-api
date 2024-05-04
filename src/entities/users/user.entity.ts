import { Entity, BeforeInsert, CreateDateColumn, PrimaryGeneratedColumn, Column } from 'typeorm';
import { randomUUID } from 'node:crypto'

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  name: string;

  @Column()
  password: string;

  @Column({ default: 1 })
  role: number;

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
