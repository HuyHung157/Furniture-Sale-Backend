import { InterfaceType, Field } from "@nestjs/graphql";

@InterfaceType()
export abstract class SubscribePayLoadBase {
  @Field(type => String)
  type: string
}
