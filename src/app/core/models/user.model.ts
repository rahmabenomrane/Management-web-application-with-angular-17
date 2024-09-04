export class User {
    username: any;
    password: any;
    fullname: any;
    pathPhoto: any;

    newPassword: string;
    confirmPassword: string;
    token: string;
    usernameExists: boolean;
    constructor(
        username: string, 
        password: string, 
        newPassword: string, 
        confirmPassword: string, 
        fullname: string, 
        token: string, 

    ) {
      this.username = username;
      this.password = password;
      this.newPassword = newPassword;
      this.confirmPassword = confirmPassword;
      this.fullname = fullname;
      this.token = token;
    }
  
    validatePassword(): boolean {
        return this.newPassword === this.confirmPassword;
    }
  }
  