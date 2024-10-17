import NoroffAPI from "../../api";
import { formatDate } from "../../utilities/formatDate";

export function generateSinglePostHTML(post) {
  const singlePostContainer = document.createElement("div");
  singlePostContainer.classList.add("single-post-container");
  const postContent = document.createElement("div");
  postContent.classList.add("content-upper");

  const title = document.createElement("h1");
  title.textContent = post.title;
  const thumbnail = document.createElement("img");
  thumbnail.classList.add("thumbnail");
  if(post.media?.url) {
    thumbnail.src = post.media.url;
    thumbnail.alt = post.media.alt;
  } else {
    thumbnail.src = "../../../../images/default-thumbnail.jpg";
    thumbnail.alt = "No Media Available";
  }
  const postUserDate = document.createElement('div');
  postUserDate.classList.add("post-user-date");
  const postUserContainer = document.createElement("div");
  postUserContainer.classList.add("user");
  const postUserIcon = document.createElement("i");
  postUserIcon.classList.add("fa-regular", "fa-user", "user-icon");
  const userName = document.createElement("a");
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

  const tagList = document.createElement('ul');
  tagList.classList.add('tag-list', "single-post-tag-list");
  const tagsArray = post.tags;
  tagsArray?.filter(tag => tag.trim().length > 0).forEach(tag => {
    const tagItem = document.createElement('li');
    tagItem.classList.add('tag-item');
    tagItem.textContent = tag;
    tagList.appendChild(tagItem);
  });

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content");
  const contentText = document.createElement("p");
  contentText.textContent = post.body;
  contentContainer.appendChild(contentText);

  const commentSection = document.createElement("div");
  commentSection.classList.add("comment-section")
  const sectionTitle = document.createElement("p")
  sectionTitle.classList.add("section-title");
  sectionTitle.textContent = `Comment (${post.comments.length})`;

  const commentList = document.createElement('ul');
  commentList.classList.add("comment-list");
  const commentsArray = post.comments;
  const originalCommentsArray = commentsArray.filter((comment) => comment.replyToId === null);
  for (let i = 0; i < originalCommentsArray.length; i++) {
    const commentItem = document.createElement('li');
    commentItem.classList.add("comment-item", "original-comment-item");
    const comment = originalCommentsArray[i];
    commentItem.id = comment.id;
    commentItem.dataset.username = comment.author.name;
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    const userAvatar = document.createElement("img");
    userAvatar.src = comment.author.avatar.url;
    const commentUser = document.createElement("a");
    commentUser.classList.add("comment-username");
    commentUser.href = `/profile/?name=${comment.author.name}`;
    commentUser.textContent = comment.author.name;
    userInfo.append(userAvatar, commentUser);
    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");
    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.textContent = comment.body;
    const commentDeleteButton = document.createElement("button");
    commentDeleteButton.classList.add("comment-delete-button");
    const commentDeleteIcon = document.createElement("i");
    commentDeleteIcon.classList.add("fa-solid", "fa-trash-can");
    commentDeleteButton.appendChild(commentDeleteIcon);
    commentContent.append(commentText, commentDeleteButton);
    const replyButton = document.createElement("button");
    replyButton.classList.add("reply-button");
    replyButton.innerHTML = `<i class="fa-solid fa-reply"></i>Reply`;
    commentContainer.append(userInfo, commentContent, replyButton);
    const replyList = document.createElement("ul");
    replyList.classList.add("reply-list", "ul-padding-left");
    commentItem.append(commentContainer, replyList);
    commentList.appendChild(commentItem);
  }

  const replyCommentsArray = commentsArray.filter((comment) => comment.replyToId !== null);
  const commentItemsArray = post.comments;
  for (let i = 0; i < replyCommentsArray.length; i++) {
    const replyCommentItem = document.createElement('li');
    replyCommentItem.classList.add("comment-item", "reply-comment-item");
    const comment = replyCommentsArray[i];
    replyCommentItem.id = comment.id;
    replyCommentItem.dataset.username = comment.author.name;
    const commentContainer = document.createElement("div");
    commentContainer.classList.add("comment-container");
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info");
    const userAvatar = document.createElement("img");
    userAvatar.src = comment.author.avatar.url;
    const commentUser = document.createElement("a");
    commentUser.classList.add("comment-username");
    commentUser.href = `/profile/?name=${comment.author.name}`;
    commentUser.textContent = comment.author.name;
    userInfo.append(userAvatar, commentUser);
    const commentContent = document.createElement("div");
    commentContent.classList.add("comment-content");
    const commentText = document.createElement("p");
    commentText.classList.add("comment-text");
    commentText.textContent = comment.body;
    const commentDeleteButton = document.createElement("button");
    commentDeleteButton.classList.add("comment-delete-button");
    const commentDeleteIcon = document.createElement("i");
    commentDeleteIcon.classList.add("fa-solid", "fa-trash-can");
    commentDeleteButton.appendChild(commentDeleteIcon);
    commentContent.append(commentText, commentDeleteButton);
    const replyButton = document.createElement("button");
    replyButton.classList.add("reply-button");
    replyButton.innerHTML = `<i class="fa-solid fa-reply"></i>Reply`;
    commentContainer.append(userInfo, commentContent, replyButton);
    const replyList = document.createElement("ul");
    replyList.classList.add("reply-list");
    replyCommentItem.append(commentContainer, replyList);
    const parentComment = commentItemsArray.find(commentItem => Number(commentItem.id) === comment.replyToId);
    if (parentComment) {
      const allCommentItems = Array.from(commentList.querySelectorAll('li.comment-item'));
    const allReplyList = Array.from(commentList.querySelectorAll('ul.reply-list'));
    allReplyList.forEach((replyList, index) => {
      
    });
      const parentReplyItem = allCommentItems.find(commentItem => Number(commentItem.id) === comment.replyToId);
      if (parentReplyItem) {
          const parentItemReplyList = parentReplyItem.querySelector(".reply-list");
          parentItemReplyList.appendChild(replyCommentItem);
      } else {
          console.error("Parent reply item not found");
      }
  }
  }

  const commentForm = document.createElement("form");
  commentForm.classList.add("comment-form");
  commentForm.name = "comment";
  const myUserName = document.createElement("p");
  myUserName.classList.add("my-username");
  myUserName.textContent = NoroffAPI.user;
  const replyMessage = document.createElement("p");
  replyMessage.classList.add("reply-message");
  const commentTextAreaLabel = document.createElement("label");
  commentTextAreaLabel.setAttribute('for', 'comment');

  const commentTextArea = document.createElement("textarea");
  commentTextArea.placeholder = "Write comment here";
  commentTextArea.name = "comment";
  commentTextArea.id = "comment";
  commentTextAreaLabel.appendChild(commentTextArea);

  const commentButton = document.createElement("button");
  commentButton.classList.add("submit-type-button", "comment-button");
  commentButton.type = "submit";
  commentButton.innerText = "Add comment";
  commentForm.append(myUserName, replyMessage, commentTextAreaLabel, commentButton)
  commentSection.append(sectionTitle, commentList, commentForm)

  postContent.append(title, thumbnail, postUserDate, tagList, contentContainer);
  singlePostContainer.append(postContent, commentSection);
  return singlePostContainer;
}