import config from "../config/config";
import { Client, Databases, ID, Query, Storage } from "appwrite";

export class Service {
  client = new Client();
  databases;
  storage;

  constructor() {
    this.client
      .setEndpoint(config.appwriteurl)
      .setProject(config.appwriteprojectid);
    this.databases = new Databases(this.client);
    this.storage = new Storage(this.client);
  }

  async createPost({ title, slug, content, featuredImage, status, userId }) {
    try {
      const post = await this.databases.createDocument(
        config.appwritedatabseid,
        config.appwritecollectionid,
        slug, // this is unique id you can use id.unique() also,
        {
          title,
          content,
          featuredImage,
          userId,
          status,
        }
      );

      if (post) {
        return post;
      }
    } catch (error) {
      console.log("error is :", error);
    }
  }
  async updatepost(slug, { title, content, featuredImage, status }) {
    try {
      const update = await this.databases.updateDocument(
        config.appwritedatabseid,
        config.appwritecollectionid,
        slug,  
        {
          title,
          content,
          featuredImage,
          status,
        }
      );
      if (update) {
        return update;
      }
    } catch (error) {
      console.log("it seems this error is :", error);
    }
  }
  async deletepost(slug) {
    try {
      await this.databases.deleteDocument(
        config.appwritedatabseid,
        config.appwritecollectionid,
        slug
      );
      return true;
    } catch (error) {
      console.log("new error is", error);
      return false;
    }
  }

  async getPost(slug) {
    try {
      return await this.databases.getDocument(
        config.appwritedatabseid,
        config.appwritecollectionid,
        slug
      );
    } catch (error) {
      console.log(error);
    }
  }

  async getPosts(query =  new Query("status", "true")) {
    try {
      return await this.databases.listDocuments(
        config.appwritedatabseid,
        config.appwritecollectionid,
        query
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  // file upload services

  async uploadFile(file) {
    try {
      return await this.storage.createFile(
        config.appwritebucketid,
        ID.unique(),
        file
      );
    } catch (error) {
      console.log(error);
      return false;
    }
  }

  async deletedFile(fileid) {
    try {
      await this.storage.deleteFile(config.appwritebucketid, fileid);
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  getfilePreview(fileId) {
    return this.storage.getFilePreview(config.appwritebucketid, fileId);
  }
}

const service = new Service();
export default service;
