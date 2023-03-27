/* Defines the user entity */
export interface User {
    name : string ;
    email: string;
    phonenumber: string;
    username: string;
    password: string;
    confirmPassword: string;
    isRememberMe : boolean
}

export interface MyFormData {
    form1: {
      name: string;
      email: string;
      phone: string;
    };
    form2: {
      address: string;
      city: string;
      state: string;
    };
    form3: {
        password: string;
        confirmPassword: string;
       
      };
  }