import { Entity, Column, OneToMany } from "typeorm";
import { BaseEntity } from "src/infrastructure/models/base.entity";
import { ProductCategory } from "./product-category";

@Entity({ name: 'category' })
export class Category extends BaseEntity {
  @Column({ 
    type: 'varchar',
    length: 500, 
    unique: true
  })
  name: string;

  @Column({ 
    type: 'varchar',
    length: 500, 
    nullable: true
  })
  type?: string;

  @Column({ 
    name: 'index',
    type: 'numeric',
  })
  index: number;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'picture_url',
    type: 'varchar',
    nullable: true,
  })
  pictureUrl: string;

  @Column({
    name: 'icon_fa',
    type: 'varchar',
    nullable: true,
  })
  iconFa: string;

  @Column({
    name: 'is_show_home',
    type: 'boolean', 
    default: false
  })
  isShowHome: boolean;

  @Column({
    name: 'index_home',
    type: 'numeric', 
    nullable: true,
  })
  indexHome: number;

  @OneToMany(() => ProductCategory, productCate => productCate.category, { nullable: true, })
  products: ProductCategory[];
}