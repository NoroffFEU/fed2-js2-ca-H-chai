import { API_BASE } from "./constants";
import { headers } from "./headers";

export default class NoroffAPI {
  
  static get user() {
    try{
      return JSON.parse(localStorage.getItem("user")).name;
    } catch(error) {
      return null;
    }
  }

  static set user(userData) {
    localStorage.setItem("user", JSON.stringify(userData));
  }

  static set token(accessToken) {
    localStorage.setItem("token", accessToken);
  }
  
  static apiBase = API_BASE;

  static paths = {
    login: `${NoroffAPI.apiBase}/auth/login`,
    register: `${NoroffAPI.apiBase}/auth/register`,
    socialPost: `${NoroffAPI.apiBase}/social/posts`,
    socialProfiles: `${NoroffAPI.apiBase}/social/profiles`
  }

  auth = {
    login: async ({ email, password }) => {
      const body = JSON.stringify({ email, password });
  
      const response = await fetch(NoroffAPI.paths.login, {
        headers: headers(true),
        method: "POST",
        body,
      });

      const { data } = await NoroffAPI.util.handleResponse(response, "Could not login this account");
      const { accessToken: token, ...user } = data;
      NoroffAPI.token = token;
      NoroffAPI.user = user;
      window.location.href = "/post/feed/?page=1";
      return data;
    },

    register: async ({ name, email, password }) => {
      const body = JSON.stringify({ name, email, password });
  
      const response = await fetch(NoroffAPI.paths.register, {
        headers: headers(true),
        method: "POST",
        body,
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not register this account");
      return data;
    },
  }

  static util = {
    handleResponse: async (response, errorMessage, output = "json") => {
      if (response.ok) {

        if (response.status === 204) {
          return null;
        }
        
        return await response[output]();
      }

      const errorData = await response[output]();
      const errorDetail = errorData.errors[0]?.message || "Unknown error";

      throw new Error(`${errorMessage}: ${errorDetail}`);
    },

  }

  post = {
    create: async ({ title, body: content, tags, media }) => {
      const body = JSON.stringify({ title, body: content, tags, media });

      const response = await fetch(NoroffAPI.paths.socialPost, {
        headers: headers(true),
        method: "POST",
        body,
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not create post");
      window.location.href = "/post/feed/?page=1";
      return data;
    },

    delete: async (id) => {
      const response = await fetch(`${NoroffAPI.paths.socialPost}/${id}`, {
        headers: headers(),
        method: "DELETE"
      });
      const data = await NoroffAPI.util.handleResponse(response, "Could not delete post.");
      alert("The post was deleted!");
      window.location.href = `/profile/?name=${NoroffAPI.user}`;
      return data;
    },

    readPost: async (id, tag = null) => {
      const url = new URL(`${NoroffAPI.paths.socialPost}/${id}`);
      url.searchParams.append("_author", true);
      url.searchParams.append("_comments", true);
      if(tag) {
        url.searchParams.append("_tag", tag);
      }

      const response = await fetch(url.toString(), {
        headers: headers(),
        method: "GET"
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not get the post");
      return data
    },

    update: async (id, { title, body: content, tags, media }) => {
      const body = JSON.stringify({ title, body: content, tags, media });

      const response = await fetch(`${NoroffAPI.paths.socialPost}/${id}`, {
        headers: headers(true),
        method: "PUT",
        body,
      });
      await NoroffAPI.util.handleResponse(response, "Could not update post");
      window.location.href = `/post/?id=${id}`;
    },

    comment: async (id, { body: comment, replyToId }) => {
      const body = { body: comment };
      if (replyToId !== undefined) {
        body.replyToId = replyToId;
      }
      const responseBody = JSON.stringify(body);
      const response = await fetch(`${NoroffAPI.paths.socialPost}/${id}/comment`, {
        headers: headers(true),
        method: "POST",
        body: responseBody,
      });
      const data = await NoroffAPI.util.handleResponse(response, "Could not comment on the post");
      return data;
    },

    deleteComment: async (id, commentId) => {
      const response = await fetch(`${NoroffAPI.paths.socialPost}/${id}/comment/${commentId}`, {
        headers: headers(),
        method: "DELETE"
      });
      const data = await NoroffAPI.util.handleResponse(response, "Could not delete comment.");
      alert("The comment was deleted.");
      return data;
    },
  }

  posts = {
    getPosts: async (limit = 12, page = 1, tag) => {
      const url = new URL(NoroffAPI.paths.socialPost);  
      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);
      url.searchParams.append("_author", true);
      url.searchParams.append("_comments", true);
      if(tag) {
        url.searchParams.append("_tag", tag);
      }

      const response = await fetch(url.toString(), {
        headers: headers(),
        method: "GET"
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not get posts");
      return data;
    },

    getAllPosts: async () => {
      const response = await fetch(NoroffAPI.paths.socialPost, {
        headers: headers(),
        method: "GET"
      });

      const data = await NoroffAPI.util.handleResponse(response, "Could not get all posts");
      return data;
    }
  }

  profile = {
    readUsersPosts: async (name, limit = 12, page = 1) => {
      const url = new URL(`${NoroffAPI.paths.socialProfiles}/${name}/posts`);
      url.searchParams.append("_author", true);
      url.searchParams.append("_comments", true);
      url.searchParams.append("limit", limit);
      url.searchParams.append("page", page);

      const response = await fetch(url.toString(), {
        headers: headers(),
        method: "GET"
      })
      const data = await NoroffAPI.util.handleResponse(response, "Could not get user's post.");
      return data;
    },

    readProfile: async function readProfile(name) {
      const response = await fetch(`${NoroffAPI.paths.socialProfiles}/${name}`, {
        headers: headers(),
        method: "GET"
      });
      const data = await NoroffAPI.util.handleResponse(response, "Could not get profile.");
      return data;
    },

    update: async (name, { bio, avatar, banner }) => {
      const body = JSON.stringify({ bio, avatar, banner });

      const response = await fetch(`${NoroffAPI.paths.socialProfiles}/${name}`, {
        headers: headers(true),
        method: "PUT",
        body,
      })
      await NoroffAPI.util.handleResponse(response, "Could not update profile.");
      window.location.href = `/profile/?name=${name}`;
    },

    follow: async (name) => {
      const response = await fetch(`${NoroffAPI.paths.socialProfiles}/${name}/follow`, {
        headers: headers(),
        method: "PUT"
      });
      const data = await NoroffAPI.util.handleResponse(response, "Could not follow the user.");
      return data;
    },

    unfollow: async (name) => {
      const response = await fetch(`${NoroffAPI.paths.socialProfiles}/${name}/unfollow`, {
        headers: headers(),
        method: "PUT"
      });
      const data = await NoroffAPI.util.handleResponse(response, "Could not unfollow the user.");
      return data;
    },
  }
}