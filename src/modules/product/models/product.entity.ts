// import { ItemCategory } from 'src/category/entity/item-category.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm'
import { BaseEntity } from "src/infrastructure/models/base.entity"
import { ProductCategory } from 'src/modules/category/models/product-category';

@Entity({ name: 'product' })
export class Product extends BaseEntity {
	@Column('varchar', { length: 500, unique: true })
	name: string;

	@Column('varchar', { length: 500 })
	type: string;

	@Column('numeric')
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
  })
	size: string;

	@Column({
    name: 'color',
    type: 'varchar',
  })
	color: string;
	
	@Column({
    name: 'picture_url',
    type: 'varchar',
    nullable: true,
  })
  pictureUrl: string;

	@OneToMany(() => ProductCategory, productCate => productCate.product)
	productCategory: ProductCategory[];
}