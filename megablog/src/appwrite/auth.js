import config from "../config/config";
import { Client, Account } from "appwrite";

export class Authservice {
  client = new Client();
  account;
  constructor() {
    this.client
      .setEndpoint(config.appwriteurl)
      .setProject(config.appwriteprojectid)
      
    this.account = new Account(this.client);
  }
  async login({ email, password }) {
    const loggedaccount = await this.account.createEmailSession(
      email,
      password
    );

    if (loggedaccount) {
      return loggedaccount;
    }
  }
  async createAccount({ email, password, name }) {
    try {
      const userAccount = await this.account.create(email, password, name);
      
      if (userAccount && userAccount.$id) {
        // Check if the userAccount has an $id property, indicating a successful account creation
        return this.login({ email, password });
      } else {
        console.log("Error creating account. User account:", userAccount);
        return null; // Return null if account creation fails
      }
    } catch (error) {
      console.log("Error creating account:", error);
      return null; // Return null in case of an error
    }
  }
  
  

  async getCurentuser() {
    try {
      return await this.account.get();
    } catch (error) {
      console.log(error);
    }
  }
  async logout() {
    try {
      const loggedout = await this.account.deleteSessions();
      if (loggedout) {
        return loggedout;
      }
    } catch (error) {
      console.log(error);
    }
  }
}

const authservice = new Authservice();
export default authservice;
