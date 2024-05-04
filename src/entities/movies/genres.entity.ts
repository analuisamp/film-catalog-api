import { BeforeInsert, Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, } from 'typeorm'
import { Movie } from './movies.entity'
import { randomUUID } from 'node:crypto'

@Entity('genres')
export class Genre {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @ManyToMany(() => Movie, movie => movie.genres)
  movies: Movie[]

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
