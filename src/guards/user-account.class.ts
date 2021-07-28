export class UserAccount {
  id: string;
  accountId: string;
  roles: string[];

  constructor(user: any){
    this.id = user?.id;
    this.accountId = user?.accountId;
    this.roles = user?.roles || [];
  }
}