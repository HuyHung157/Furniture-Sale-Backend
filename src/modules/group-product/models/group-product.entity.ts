import { BaseEntity } from '@infrastructure/models/base.entity';
import { Category } from '@modules/category/models/category.entity';
import { Product } from '@modules/product/models/product.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity({ name: 'group-product' })
export class GroupProduct extends BaseEntity {
  @Column('varchar', { length: 500, unique: true })
  name: string;

  @Column('varchar', { length: 500 })
  description: string;

  @OneToMany(() => Product, (product) => product.groupProduct, {
    nullable: true,
  })
  products: Product[];

  @ManyToOne(() => Category, (category) => category.groupProducts, {
    nullable: true,
  })
  @JoinColumn({ name: 'category_id' })
  categories: Category;
}
