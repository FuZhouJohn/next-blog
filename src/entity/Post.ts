import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { User } from "./User";
import { Comment } from "./Comment";
import posts from "../../pages/api/v1/posts";

@Entity("posts")
export class Post {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @ManyToOne("User", "posts")
  author: User;

  @Column("varchar")
  title: string;

  @Column("text")
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany("Comment", "post")
  comments: Comment[];
}
