import { Connection, QueryRunner } from 'typeorm';

export abstract class BaseService {
  constructor(
    protected readonly connection: Connection,
  ) { }

  protected async performActionInTransaction(
    handler: (queryRunner: QueryRunner) => any
  ) {
    const queryRunner = this.connection.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
      await handler(queryRunner);
      await queryRunner.commitTransaction();
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}
