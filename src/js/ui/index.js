import NoroffAPI from "../api";
import api from "../api/instance.js";
import { generateFeedHTML } from "./post/generateFeedHTML.js";
import { generateSinglePostHTML } from "./post/generateSinglePostHTML.js";

export default class NoroffApp extends NoroffAPI {

  static form = {
    handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      return Object.fromEntries(formData.entries());
    }
  }

  static events = {
    login: async (event) => {
      const data = NoroffApp.form.handleSubmit(event);

      try {
        await api.auth.login(data)
      } catch(error) {
        alert(error.message);
      }
    },

    register: async (event) => {
      const data = NoroffApp.form.handleSubmit(event);
      const { name, email} = data;
      try {
        await api.auth.register(data);
        alert(`Registration successful!\nUsername: ${name}\nEmail: ${email}`);
        console.log(data);
        window.location.href = "/auth/login/";
      } catch(error) {
        alert(`${error.message}.\nPlease try again.`);
      }
    },

    logout: (event) => {
      event.preventDefault();

      NoroffAPI.user = null;
      NoroffAPI.token = null;
    
      alert("You have successfully logged out.");
      window.location.href = "/";
    },

    post: {
      create: async (event) => {
        const data = NoroffApp.form.handleSubmit(event);
        const media = {
          url: data['media[url]'],
          alt: data['media[alt]']
        };
        const { title, body, tags } = data;
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()) : [];

        try {
          await api.post.create({ 
            title,
            body,
            tags: tagsArray,
            media
          })
        } catch(error) {
          alert(error.message);
        }
      },

      delete: () => {},

      displayPosts: async () => {
        try {
          const posts = await api.posts.getPosts();
          const postData = posts.data;
          console.log(postData); //delete later
          const postFeed = document.querySelector('.feed');
          postFeed.innerHTML = '';
          postData.forEach(post => {
            const postHTML = generateFeedHTML(post);
            postFeed.appendChild(postHTML);
          })
        } catch(error) {
          alert(error.message)
        }
      },

      displaySinglePost: async () => {
        try {
          const params = new URLSearchParams(window.location.search);
          const postId = params.get('id');
      
          const post = await api.post.readPost(postId);
          const postData = post.data;
      
          const singlePostFeed = document.querySelector('.single-post');
          singlePostFeed.innerHTML = "";
          const singlePostHTML = generateSinglePostHTML(postData);
          singlePostFeed.appendChild(singlePostHTML);
        } catch(error) {
          alert(error.message)
        }
      },

      update: () => {},
    }
  }
}