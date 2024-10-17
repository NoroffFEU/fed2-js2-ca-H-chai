import { formatDate } from "../../utilities/formatDate";

export function generateFeedHTML(post) {
  const postContainer = document.createElement('a');
  postContainer.classList.add('post-container');
  postContainer.id = post.id;
  postContainer.href = `/post/?id=${post.id}`;

  const figure = document.createElement("figure");
  const thumbnail = document.createElement("img");
  thumbnail.classList.add("thumbnail");
  if(post.media?.url) {
    thumbnail.src = post.media.url;
    thumbnail.alt = post.media.alt;

    thumbnail.onerror = () => {
      thumbnail.src = "../../../../images/default-thumbnail.jpg";
      thumbnail.alt = "Default Thumbnail";
    };
  } else {
    thumbnail.src = "../../../../images/default-thumbnail.jpg";
    thumbnail.alt = "No Media Available";
  }
  figure.appendChild(thumbnail);
  
  const postTextContainer = document.createElement('div');
  postTextContainer.classList.add('post-text-container');

  const postUserDate = document.createElement('div');
  postUserDate.classList.add("post-user-date");
  const postUserContainer = document.createElement("div");
  postUserContainer.classList.add("user");
  const postUserIcon = document.createElement("i");
  postUserIcon.classList.add("fa-regular", "fa-user", "user-icon");
  const userName = document.createElement("a");
  userName.classList.add("post-author");
  userName.textContent = post.author.name;
  userName.href = `/profile/?name=${post.author.name}`;
  postUserContainer.append(postUserIcon, userName);

  const postDateContainer =  document.createElement("div");
  postDateContainer.classList.add("date");
  const postDateIcon = document.createElement("i");
  postDateIcon.classList.add("fa-regular", "fa-calendar");
  const postDate = document.createElement("p");
  postDate.textContent = formatDate(post.created);
  postDateContainer.append(postDateIcon, postDate);

  postUserDate.append(postUserContainer, postDateContainer);

  const postTagComment = document.createElement('div');
  postTagComment.classList.add("post-tag-comment");
  const tagList = document.createElement('ul');
  tagList.classList.add('tag-list');
  const tagsArray = post.tags;
  tagsArray?.filter(tag => tag.trim().length > 0).forEach(tag => {
    const tagItem = document.createElement('li');
    tagItem.classList.add('tag-item');
    tagItem.textContent = tag;
    tagList.appendChild(tagItem);
  });
  const comment = document.createElement("div");
  comment.classList.add("comment");
  const commentIcon = document.createElement("i");
  commentIcon.classList.add("fa-regular", "fa-comments");
  const commentNumber = document.createElement("p");
  commentNumber.textContent = post.comments.length;
  comment.append(commentIcon, commentNumber);

  postTagComment.append(tagList, comment);

  const postTitle = document.createElement("p");
  postTitle.classList.add("post-title");
  postTitle.textContent = post.title;

  postTextContainer.append(postUserDate, postTagComment, postTitle);
  postContainer.append(figure, postTextContainer);

  return postContainer;
}