export class UserAccount {
  id?: string;
  uid: string;
  email: string;
  roles?: string[];

  constructor(user: any) {
    this.id = user?.id;
    this.uid = user?.uid;
    this.email = user?.email;
    this.roles = user?.roles;
  }
}
