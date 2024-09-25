import NoroffAPI from "../api";
import api from "../api/instance.js";
import { authGuard } from "../utilities/authGuard.js";
import { generateFeedHTML } from "./post/generateFeedHTML.js";
import { generateSinglePostHTML } from "./post/generateSinglePostHTML.js";

export default class NoroffApp extends NoroffAPI {

  constructor() {
    super()
    this.router()
    this.replyToId = null;
  }

  async router(pathname = window.location.pathname) {
    switch (pathname) {
      case "/":
        await this.views.login();
        break;
      case "/auth/login/":
        await this.views.login();
        break;
      case "/auth/register/":
        await this.views.register();
        break;
      case "/post/":
        await this.views.post();
        break;
      case "/post/edit/":
        await this.views.postEdit();
        break;
      case "/post/create/":
        await this.views.postCreate();
        break;
      case "/post/feed/":
      await this.views.feed();
      break;
      case "/profile/":
        await this.views.profile();
        break;
      case "/profile/update/":
      await this.views.profileUpdate();
      break;
      default:
        await this.views.notFound();
    }
  }

  static form = {
    handleSubmit(event) {
      event.preventDefault();
      const form = event.target;
      const formData = new FormData(form);
      return Object.fromEntries(formData.entries());
    }
  }

  setReplyToId(event) {
    const existingReplyMessage = document.querySelector(".reply-message");
    const originalCommentToReset = document.querySelector(".comment-item[data-replying='true']");
    
    if (originalCommentToReset) {
      originalCommentToReset.style.backgroundColor = "transparent";
      existingReplyMessage.innerHTML = "";
      originalCommentToReset.dataset.replying = "false";
    }

    const originalComment = event.target.closest(".comment-item");
    this.replyToId = Number(originalComment.id);
    const originalCommentUser = originalComment.dataset.username;
    originalComment.style.backgroundColor = "#dedede";
    
    existingReplyMessage.innerHTML = `<button class="cancel" type="button"><i class="fa-solid fa-circle-xmark"></i></button>Replying to <span class="reply-to">${originalCommentUser}</span>`;
    originalComment.dataset.replying = "true";
    
    const cancelButton = document.querySelector(".cancel");
    cancelButton.addEventListener("click", () => {
      existingReplyMessage.innerHTML = "";
      this.replyToId = null;
      originalComment.style.backgroundColor = "transparent";
      originalComment.dataset.replying = "false";
    });
  }
  
  setupReplyButtons() {
    const replyButtons = document.querySelectorAll(".reply-button");
    replyButtons.forEach(button => {
      button.addEventListener("click", (event) => this.setReplyToId(event));
    });
  }
  

  setupReplyButtons() {
    const replyButtons = document.querySelectorAll(".reply-button");
    replyButtons.forEach(button => {
      button.addEventListener("click", (event) => this.setReplyToId(event));
    })
  }

  views = {
    register: async () => {
      const form = document.forms["register"];
      form.addEventListener("submit", this.events.register);
    },

    login: async () => {
      const form = document.forms["login"];
      form.addEventListener("submit", this.events.login);
    },

    feed: async () => {
      this.events.logout();
      this.events.myPage();
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page') || localStorage.getItem("page") || 1;
      this.events.post.displayPosts(Number(page));
    },

    postCreate: async () => {
      authGuard();
      this.events.logout();
      this.events.myPage();
      const form = document.forms["createPost"];
      form.addEventListener("submit", this.events.post.create);
    },

    postEdit: async () => {
      authGuard();
      this.events.logout();
      this.events.myPage();
      this.events.post.update();
      this.events.post.delete();
    },

    post: async () => {
      this.events.logout();
      this.events.myPage();
      this.events.post.displaySinglePost();
    },

    profile: async () => {
      authGuard();
      this.events.logout();
      this.events.myPage();
      this.animation.headerPadding();
      const params = new URLSearchParams(window.location.search);
      const page = params.get('page') || 1;
      this.events.profile.displayProfilePage(Number(page));
    },

    profileUpdate: async () => {
      authGuard();
      this.events.logout();
      this.events.profile.updateProfile();
    },

    notFound: async () => {
      alert("Page cannot be found in /src/views");
    }
  }

  currentPage = 1;  

  events = {
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
        window.location.href = "/auth/login/";
      } catch(error) {
        alert(`${error.message}.\nPlease try again.`);
      }
    },

    logout: () => {
      const logoutButton = document.querySelector(".logout-button");
      logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
  
        NoroffAPI.user = null;
        NoroffAPI.token = null;
        localStorage.page = null;
      
        alert("You have successfully logged out.");
        window.location.href = "/";
      });
    },

    myPage: () => {
      const myPageLink = document.querySelector(".my-page");
      myPageLink.href = `/profile/?name=${NoroffAPI.user}`;
    },

    post: {
      create: async (event) => {
        const data = NoroffApp.form.handleSubmit(event);
        const media = {
          url: data['media[url]'],
          alt: data['media[alt]']
        };
        const { title, body, tags } = data;
        const tagsArray = tags ? tags.split(',').map(tag => tag.trim()).filter(tag => tag.length > 0) : [];

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

      delete: () => {
        const deleteButton = document.querySelector(".delete-button");
        deleteButton.addEventListener("click", async () => {
          try {
            const params = new URLSearchParams(window.location.search);
            const postId = params.get('id');

            const isConfirmed = window.confirm("Are you sure you want to delete this post?");
            if (isConfirmed) {
              await api.post.delete(postId)
            }
          } catch (error) {
            alert(error.message);
          }
        })
      },

      displayPosts: async (page = 1) => {
        try {
          const posts = await api.posts.getPosts(12, page);
          const { data, meta } = posts;
          const { currentPage, pageCount } = meta;
          const postFeed = document.querySelector('.feed');
          postFeed.innerHTML = '';
          data.forEach(post => {
            const postHTML = generateFeedHTML(post);
            postFeed.appendChild(postHTML);
          })
          const newUrl = `${window.location.pathname}?page=${page}`;
          window.history.replaceState({}, '', newUrl);
          this.pagination.feedPagination(currentPage, pageCount);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });

          const article = document.querySelectorAll(".post-container");
          article.forEach(post => {
            post.addEventListener("click", () => {
              const params = new URLSearchParams(window.location.search);
              const pageNumber = params.get('page');
              localStorage.setItem("page", pageNumber);
            })
          });

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
          const postAuthor = postData.author.name;

          const editButton = document.createElement("button");
          editButton.classList.add("edit-button", "button-dark");
          editButton.textContent = "Edit";
          const editIcon = document.createElement("i");
          editIcon.classList.add("fa-regular", "fa-pen-to-square");
          editButton.insertBefore(editIcon, editButton.firstChild);
          editButton.dataset.id = postId;
          if(postAuthor === NoroffAPI.user) {
            editButton.style.display = "block";
          } else {
            editButton.style.display = "none";
          }
          const headerNav = document.querySelector(".header-nav");
          headerNav.insertBefore(editButton, headerNav.firstChild);
          editButton.addEventListener("click", () => {
            window.location.href = `/post/edit/?id=${postId}`;
          })

          const singlePostFeed = document.querySelector('.single-post');
          singlePostFeed.innerHTML = "";
          const singlePostHTML = generateSinglePostHTML(postData);
          singlePostFeed.appendChild(singlePostHTML);

          const backProfileButton = document.querySelector(".back-to-profile-page");
          backProfileButton.href = `/profile/?name=${postAuthor}`;
          backProfileButton.textContent = `${postAuthor}'s page`;
          const backIcon = document.createElement("i");
          backIcon.classList.add("fa-solid", "fa-chevron-left", "back-to-profile-icon");
          backProfileButton.insertBefore(backIcon, backProfileButton.firstChild);

          const form = document.forms["comment"];
          form.addEventListener("submit", this.events.post.comment);

          const backButton = document.querySelector(".back-link-on-single-page");
          const previousPage = localStorage.getItem("page");
          backButton.href = `/post/feed/?page=${previousPage}`;

          this.events.post.deleteComment();
          this.setupReplyButtons();
          this.pagination.singlePostPagination();
        } catch(error) {
          alert(error.message)
        }
      },

      update: async () => {
        try {
          const params = new URLSearchParams(window.location.search);
          const postId = params.get('id');
          const post = await api.post.readPost(postId);
          const { data } = post;
          const { title, body, tags, media } = data;

          document.getElementById('title').value = title;
          document.getElementById('content').value = body;
          document.getElementById('tags').value = tags.join(',');
          document.getElementById('img-url').value = media.url;
          document.getElementById('img-alt').value = media.alt;

          document.forms["editPost"].addEventListener("submit", async (event) => {
            const updatedData = NoroffApp.form.handleSubmit(event);
            updatedData.tags = updatedData.tags.split(',').map(tag => tag.trim());
            updatedData.media = {
              url: updatedData['media[url]'],
              alt: updatedData['media[alt]']
            };
            await api.post.update(postId, updatedData);
          });
      
        } catch (error) {
          alert(error.message);
        }
      },

      comment: async (event) => {
        const data = NoroffApp.form.handleSubmit(event);
        const comment = data.comment;
        if (!comment || comment.trim() === "") {
          alert("Comment cannot be empty.");
          return;
        }

        const params = new URLSearchParams(window.location.search);
        const postId = params.get('id');
        
        if(this.replyToId) {
          try {
            await api.post.comment(postId, { body: comment, replyToId: this.replyToId });
            location.reload();
          } catch (error) {
            alert(error.message);
          }
        } else {
          try {
            await api.post.comment(postId, { body: comment });
            location.reload();
          } catch (error) {
            alert(error.message);
          }
        }
      },

      deleteComment: () => {
        const commentDeleteButtons = document.querySelectorAll(".comment-delete-button");
        commentDeleteButtons.forEach(button => {
          button.addEventListener("click", async (event) => {
            try {
              const params = new URLSearchParams(window.location.search);
              const postId = params.get('id');
              const commentItem = event.target.closest(".comment-item");
              const commentID = commentItem.id;
              const isConfirmed = window.confirm("Are you sure you want to delete this comment?");
              if(isConfirmed) {
                await api.post.deleteComment(postId, commentID);
                commentItem.remove();
              }
              const postData = await api.post.readPost(postId);
              const updatedCommentNumber = postData.data.comments.length;
              const commentNumber = document.querySelector(".section-title");
              commentNumber.textContent = `Comment (${updatedCommentNumber})`;
            } catch (error) {
              alert(error.message);
            }
          })
        })
      },

    },

    profile: {
      displayProfilePage: async (page = 1) => {
        const params = new URLSearchParams(window.location.search);
        const name = params.get('name');

        try {
          const userPostsData = await api.profile.readUsersPosts(name, 12, page);
          const userProfile = await api.profile.readProfile(name);
          const postData = userPostsData.data;
          const userData = userProfile.data
          const userAvatar = document.querySelector(".avatar");
          userAvatar.src = userData.avatar.url;
          const userName = document.querySelector(".username");
          userName.textContent = userData.name;
          const bio = document.querySelector(".bio");
          bio.textContent = userData.bio
          document.querySelector(".followers").textContent = userData._count.followers;
          document.querySelector(".following").textContent = userData._count.following;
          document.querySelector(".posts").textContent = userData._count.posts;
          const profileHeader = document.querySelector(".profile-header");
          const bannerURL = userData.banner.url;
          profileHeader.style.backgroundImage = `url(${bannerURL})`;

          const buttonArea = document.querySelector(".button-area");
          const updateButton= document.createElement("button");
          updateButton.classList.add("update-button");
          updateButton.textContent = "Update Profile";
          const followButton= document.createElement("button");
          followButton.classList.add("follow-button");
          followButton.id = "toggle-button";
          followButton.textContent = "Follow";
          buttonArea.append(updateButton, followButton)
          if(name === NoroffAPI.user) {
            updateButton.style.display = "block";
            followButton.style.display = "none"
          } else {
            updateButton.style.display = "none";
            followButton.style.display = "block"
          }
          updateButton.addEventListener("click", () => {
            window.location.href = "/profile/update/"
          })
          const postFeed = document.querySelector('.feed');
          postFeed.innerHTML = '';
          postData.forEach(post => {
            const postHTML = generateFeedHTML(post);
            postFeed.appendChild(postHTML);
          });
          const totalPosts = userData._count.posts;
          const pageCount = Math.ceil(totalPosts / 12);
          const newUrl = `${window.location.pathname}?name=${name}&page=${page}`;
          window.history.replaceState({}, '', newUrl);
          this.currentPage = page;
          this.pagination.profilePagination(this.currentPage, pageCount);
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
          });
          this.events.profile.follow();
        } catch(error) {
          alert(error.message);
        }
      },

      updateProfile: async () => {
        try {
          const userName = NoroffAPI.user;
          const userData = await api.profile.readProfile(userName);
          const { data } = userData;
          const { bio, avatar, banner } = data;

          document.getElementById("bio").value = bio || '';
          document.getElementById("banner").value = banner.url || '';
          document.getElementById("banner-alt").value = banner.alt || '';
          document.getElementById("avatar").value = avatar.url || '';
          document.getElementById("avatar-alt").value = avatar.alt || '';
          document.forms["updateProfile"].addEventListener("submit", async(event) => {
            event.preventDefault();
            const updatedProfile = NoroffApp.form.handleSubmit(event);
            updatedProfile.banner = {
              url: updatedProfile["banner[url]"],
              alt: updatedProfile["banner[alt]"]
            };
            updatedProfile.avatar = {
              url: updatedProfile["avatar[url]"],
              alt: updatedProfile["avatar[alt]"]
            };
            await api.profile.update(userName, updatedProfile);
          });

          const backProfileButton = document.querySelector(".back-to-profile-page");
          backProfileButton.href = `/profile/?name=${NoroffAPI.user}`;
          backProfileButton.textContent = "My profile page";
          const backIcon = document.createElement("i");
          backIcon.classList.add("fa-solid", "fa-chevron-left", "back-to-profile-icon");
          backProfileButton.insertBefore(backIcon, backProfileButton.firstChild);
        } catch (error) {
          alert(error.message)
        }
      },

      follow: () => {
        const toggleButton = document.getElementById("toggle-button");
        toggleButton.addEventListener("click", async () => {
          try {
            const params = new URLSearchParams(window.location.search);
            const userName = params.get('name');
            toggleButton.disabled = true;
            if (toggleButton.textContent === "Follow") {
              await api.profile.follow(userName);
              toggleButton.textContent = "Unfollow";
            } else {
              await api.profile.unfollow(userName);
              toggleButton.textContent = "Follow";
            }
            const userProfile = await api.profile.readProfile(userName);
            const userData = userProfile.data;
            const followers = userData._count.followers;
            document.querySelector(".followers").textContent = followers;
          } catch (error) {
            alert(error.message);
          }
          toggleButton.disabled = false;
        })
      },
    }
  }

  pagination = {
    feedPagination: async (currentPage, pageCount) => {
      const paginationContainer = document.querySelector('.feed-pagination');
      paginationContainer.innerHTML = '';

      const createButton = (text, page) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.dataset.page = page;
        button.className = 'pagination-button';
        if(page === currentPage) {
          button.classList.add("current-page");
        }
        button.addEventListener('click', () => {
          this.events.post.displayPosts(page);
        });
        return button;
      };

      const createEllipsis = () => {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = "...";
        return ellipsis;
      }
      
      const previousButton = document.createElement('button')
      const previousButtonIcon = document.createElement("i");
      previousButtonIcon.classList.add("fa-solid", "fa-chevron-left");
      previousButton.appendChild(previousButtonIcon);
      paginationContainer.appendChild(previousButton);
      previousButton.addEventListener("click", () => {
        if (currentPage > 1) {
          this.events.post.displayPosts(currentPage -1);
        }
      })

      if (currentPage === 1) {
        previousButton.disabled = true;
        previousButton.style.cursor = "not-allowed";
      } else {
        previousButton.disabled = false;
      }
      
      if (currentPage < 4) {
        for (let i = 1; i < 4; i++) {
          const pageButton = createButton(i, i);
          paginationContainer.appendChild(pageButton);
        }
        paginationContainer.appendChild(createEllipsis());
        const lastPageButton = createButton(pageCount, pageCount);
        paginationContainer.appendChild(lastPageButton);
      }
      
      if (currentPage >= 4 && currentPage <= pageCount - 3) {
        const firstPageButton = createButton(1, 1);
        paginationContainer.appendChild(firstPageButton);
        
        paginationContainer.appendChild(createEllipsis());

        const startPage = Math.max(3, currentPage -2);
        const endPage = Math.min(pageCount -2, currentPage +2);
        for (let i = startPage; i <= endPage; i++) {
          const pageButton = createButton(i, i);
          paginationContainer.appendChild(pageButton);
        }
        paginationContainer.appendChild(createEllipsis());
        const lastPageButton = createButton(pageCount, pageCount);
        paginationContainer.appendChild(lastPageButton);
      }

      if (currentPage > pageCount -3) {
        const firstPageButton = createButton(1,1);
        paginationContainer.appendChild(firstPageButton)
        paginationContainer.appendChild(createEllipsis());
        for(let i = pageCount -2; i <= pageCount; i++) {
          const pageButton = createButton(i, i);
          paginationContainer.appendChild(pageButton);
        }
      }

      if (pageCount <= 7) {
        for (let i = 1; i < 8; i++) {
          const pageButton = createButton(i, i);
          paginationContainer.appendChild(pageButton);
        }
      }

      const nextButton = document.createElement('button');
      const nextButtonIcon = document.createElement("i");
      nextButtonIcon.classList.add("fa-solid", "fa-chevron-right");
      nextButton.appendChild(nextButtonIcon);
      paginationContainer.appendChild(nextButton);
      nextButton.addEventListener("click", () => {
        if (currentPage < pageCount) {
          this.events.post.displayPosts(currentPage +1);
        }
      })

      if (currentPage === pageCount) {
        nextButton.disabled = true;
        nextButton.style.cursor = "not-allowed";
      } else {
        nextButton.disabled = false;
      }
    },

    singlePostPagination: async () => {
      let postData = await api.posts.getAllPosts();
      let { data, meta } = postData;
      const totalCount = meta.totalCount;
      let currentPage = 1;

      const params = new URLSearchParams(window.location.search);
      const postId = Number(params.get('id'));

      let currentIndex = data.findIndex(post => post.id === postId);

      while (currentIndex === -1 && currentPage * 100 < totalCount) {
        currentPage++;
        let newPostData = await api.posts.getPosts(100, currentPage);
        data = data.concat(newPostData.data);
        currentIndex = data.findIndex(post => post.id === postId);
      }
      
      const previousButton = document.getElementById("previous-post");
      if (previousButton) {
        if (currentIndex > 0) {
          const previousPostId = data[currentIndex -1].id;
          previousButton.addEventListener("click", () => {
            window.location.href = `/post/?id=${previousPostId}`;
          })
        } else {
          previousButton.disabled = true;
          previousButton.style.cursor = "not-allowed";
        }
      }

      const nextButton = document.getElementById("next-post");
      if (nextButton) {
        if (currentIndex < data.length - 1) {
          const nextPostId = data[currentIndex +1]?.id;
          nextButton.addEventListener("click", () => {
            if(nextPostId) {
              window.location.href = `/post/?id=${nextPostId}`;
            }
          })
        } else if (currentPage * 100 < totalCount) {
          currentPage++;
          try {
            let newPostData = await api.posts.getPosts(100, currentPage);
            data = data.concat(newPostData.data);
            currentIndex = data.findIndex(post => post.id === postId);
            const nextPostId = data[currentIndex +1]?.id;
            nextButton.addEventListener("click", () => {
              if(nextPostId) {
                window.location.href = `/post/?id=${nextPostId}`;
              } else {
                nextButton.disabled = true;
                nextButton.style.cursor = "not-allowed";
              }
            })
          } catch (error) {
            alert(error.message)
            nextButton.disabled = true;
            nextButton.style.cursor = "not-allowed";
          }
        } else {
          nextButton.disabled = true;
          nextButton.style.cursor = "not-allowed";
        }
      }
    },

    profilePagination: async (currentPage, pageCount) => {
      this.currentPage = currentPage;
      const paginationContainer = document.querySelector('.feed-pagination');
      paginationContainer.innerHTML = '';

      const createButton = (text, page) => {
        const button = document.createElement('button');
        button.textContent = text;
        button.dataset.page = page;
        button.className = 'pagination-button';
        if(page === this.currentPage) {
          button.classList.add("current-page");
        }
        button.addEventListener('click', () => {
          this.currentPage = page;
          this.events.profile.displayProfilePage(page);
        });
        return button;
      };

      const createEllipsis = () => {
        const ellipsis = document.createElement('span');
        ellipsis.textContent = "...";
        return ellipsis;
      }
      
      const previousButton = document.createElement('button')
      const previousButtonIcon = document.createElement("i");
      previousButtonIcon.classList.add("fa-solid", "fa-chevron-left");
      previousButton.appendChild(previousButtonIcon);
      paginationContainer.appendChild(previousButton);
      previousButton.addEventListener("click", () => {
        if (this.currentPage > 1) {
          this.events.profile.displayProfilePage(this.currentPage -1);
        }
      })

      if (this.currentPage === 1) {
        previousButton.disabled = true;
        previousButton.style.cursor = "not-allowed";
      } else {
        previousButton.disabled = false;
      }
      
      for( let i = 1; i <= pageCount; i++) {
        const pageButton = createButton(i, i);
        paginationContainer.appendChild(pageButton);
      }

      const nextButton = document.createElement('button');
      const nextButtonIcon = document.createElement("i");
      nextButtonIcon.classList.add("fa-solid", "fa-chevron-right");
      nextButton.appendChild(nextButtonIcon);
      paginationContainer.appendChild(nextButton);
      nextButton.addEventListener("click", () => {
        if (this.currentPage < pageCount) {
          this.events.profile.displayProfilePage(this.currentPage +1);
        }
      })

      if (this.currentPage === pageCount) {
        nextButton.disabled = true;
        nextButton.style.cursor = "not-allowed";
      } else {
        nextButton.disabled = false;
      }
    },
  }

  animation = {
    headerPadding: () => {
      const header = document.querySelector(".profile-header");
      const originalPaddingBottom = 18.4;
      const scrollPaddingBottom = 4;
      const minWidth = window.matchMedia('(min-width: 1024px)');

      window.addEventListener("scroll", () => {
        if(minWidth.matches) {
          if (window.scrollY > 0) {
            header.style.paddingBottom = `${scrollPaddingBottom}rem`;
          } else {
            header.style.paddingBottom = `${originalPaddingBottom}rem`;
          }
        } else {
          header.style.paddingBottom = "12.8rem";
        }
      })
    },
  }
}