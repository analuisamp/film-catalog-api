import { BeforeInsert, CreateDateColumn, Entity,PrimaryGeneratedColumn, Column, ManyToMany, JoinTable } from 'typeorm'
import { Genre } from './genres.entity';
import { randomUUID } from 'node:crypto'

@Entity('movies')

export class Movie {

  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  director: string

  @JoinTable()
  @ManyToMany(() => Genre, genre => genre.movies, {
    cascade:true,
  })
  genres: Genre[];

  @Column()
  duration: string

  @Column()
  synopsis: string

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

