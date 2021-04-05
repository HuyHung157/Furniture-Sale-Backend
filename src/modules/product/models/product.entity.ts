// import { ItemCategory } from 'src/category/entity/item-category.entity';
import { Entity, PrimaryGeneratedColumn, Column, UpdateDateColumn, CreateDateColumn, OneToMany } from 'typeorm'

@Entity({ name: 'product' })
export class Product {
	@PrimaryGeneratedColumn('uuid') id: string

	@Column('varchar', { length: 500, unique: true })
	name: string;

	@Column('varchar', { length: 500 })
	type: string;

	@Column('numeric')
	index: number;

	@CreateDateColumn({
		name: 'created_at',
		type: 'timestamp without time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	createdAt?: Date;

	@Column({ name: 'created_by', type: 'varchar', length: 300, nullable: true })
	createdBy?: string;

	@UpdateDateColumn({
		name: 'updated_at',
		type: 'timestamp without time zone',
		default: () => 'CURRENT_TIMESTAMP',
	})
	updatedAt?: Date;

	@Column({ name: 'updated_by', type: 'varchar', length: 300, nullable: true })
	updatedBy?: string;

	// @OneToMany(() => ItemCategory, category => category.itemId, {
	// 	nullable: true,
	// })
	// categoryId: ItemCategory[];
}