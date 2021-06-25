import { Entity, Column, OneToMany } from 'typeorm'
import { BaseEntity } from "src/infrastructure/models/base.entity"
import { ProductCategory } from '@modules/category/models/product-category.entity';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
  //TODO auto generate or self-defined in FE
  // @Column({
  //   name: 'product_code',
  //   type: 'varchar',
  //   length: 10,
  //   unique: true
  // }) 
  // productCode: string;

  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column({
    name: 'type',
    type: 'varchar',
    nullable: true,
  })
  type: string;

  @Column({
    name: 'index',
    type: 'numeric',
    nullable: true,
    unique: true
  })
  index: number;

  @Column({
    name: 'description',
    type: 'varchar',
    nullable: true,
  })
  description?: string;

  @Column({
    name: 'price',
    type: 'float',
    default: 0,
  })
  price: number;

  @Column({
    name: 'reference_price',
    type: 'float',
    default: 0
  })
  referencePrice

  @Column({
    name: 'discount',
    type: 'float',
    default: 0,
  })
  discount: number;

  @Column({
    name: 'size',
    type: 'varchar',
    nullable: true,
  })
  size: string;

  @Column({
    name: 'color',
    type: 'varchar',
    nullable: true,
  })
  color: string;

  @Column({
    name: 'picture_url',
    type: 'varchar',
    nullable: true,
  })
  pictureUrl: string;

  @OneToMany(() => ProductCategory, productCate => productCate.product, { nullable: true, })
  categories: ProductCategory[];
}