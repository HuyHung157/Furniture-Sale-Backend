import { UserAccount } from "@guards/user-account.class";

export interface TokenData{
  id: string; // account ID
  user: UserAccount;
}