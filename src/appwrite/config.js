import React from 'react'
import { Client, Storage, Databases, Query, ID } from "appwrite";
import conf from '../conf/conf';

export class Service {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId)

        this.databases = new Databases();
        this.storage = new Storage();
    }
    // Create Documents
    async createPost({ title, slug, content, featuredImage, status, userId }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId
                })
        } catch (error) {
            console.log(error)
        }
    }

    // Update Documents
    async updatePost(slug, { title, content, featuredImage, status }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title,
                    content,
                    featuredImage,
                    status
                })
        } catch (error) {
            console.log(error)
        }
    }

    // Delete Document
    async updatePost({ slug }) {
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
            return true
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // Get Document - one Document
    async getPost(slug) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug
            )
        } catch (error) {
            console.log(error)
        }
    }

    // Get PostS
    async getPosts(queries = [Query.equal("status", "active")]) {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                queries
            )
        } catch (error) {
            console.log(error)
            return false
        }
    }

    // File Upload
    async uploadFile(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteBucketId,
                ID.unique(),
                file
            )
        } catch (error) {
            console.log(error);
        }
    }

    // Delete File
    async deleteFile(fileId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteBucketId,
                fileId
            )
            return true
        } catch (error) {

        }
    }

    // Get File Preview
    async getFilePreview(fileId) {
        return this.storage.getFilePreview(
            conf.appwriteBucketId,
            fileId
        )
    }


}

const service = new Service();
export default service