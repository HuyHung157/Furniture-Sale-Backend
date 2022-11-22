import { Module } from '@nestjs/common';
import { GqlModuleOptions, GraphQLModule } from '@nestjs/graphql';
import { mapKeys } from 'lodash';
import { CommonConstants } from '../constants/common.constants';
import { EnvironmentModule } from '../environment/environment.module';
import { EnvironmentService } from '../environment/environment.service';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRootAsync<ApolloDriverConfig>({
      driver: ApolloDriver,
      imports: [EnvironmentModule],
      useFactory: async (environmentService: EnvironmentService) => { 
        const options = {
          // TODO: REMOVE WHEN DEPLOY REAL PRODUCTION
          playground: !environmentService.isProductionMode(),
          introspection: true,
          installSubscriptionHandlers: true,
          autoSchemaFile: environmentService.getKey(
            CommonConstants.GQL_SCHEMA_PATH,
          ),
          formatError(err) {
            return err;
          },
          context: async ({ req, res, connection }) => {
            // subscriptions
            if (connection) {
              return { req: connection.context, res };
            }
            // queries and mutations
            return { req, res };
          },
          onHealthCheck: () => {
            return new Promise<void>((resolve, reject) => {
              // Replace the `true` in this conditional with more specific checks!
              if (true) {
                resolve();
              } else {
                reject();
              }
            });
          },
          subscriptions: {},
        };
        return options;
      },
      inject: [EnvironmentService],
    }),
  ],
})
export class GraphqlModule {}
