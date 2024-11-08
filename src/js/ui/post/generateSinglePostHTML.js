import NoroffAPI from "../../api";
import { formatDate } from "../../utilities/formatDate";

export function generateSinglePostHTML(post) {
  const singlePostContainer = document.createElement("div");
  const postContent = document.createElement("div");
  postContent.classList.add(
    "mb-6",
    "pb-6",
    "pb-lg-8",
    "mb-lg-8",
    "border-bottom",
    "border-black",
  );

  const title = document.createElement("h1");
  title.classList.add("text-center", "text-break", "mb-3", "mb-lg-5");
  title.textContent = post.title;
  const figure = document.createElement("figure");
  figure.classList.add("ratio", "ratio-16x9");
  const thumbnail = document.createElement("img");
  thumbnail.classList.add("rounded", "object-fit-fill", "mb-2", "mb-lg-3");
  if (post.media?.url) {
    thumbnail.src = post.media.url;
    thumbnail.alt = post.media.alt;
  } else {
    thumbnail.src = "../../../../images/default-thumbnail.jpg";
    thumbnail.alt = "No Media Available";
  }
  figure.appendChild(thumbnail);
  const postUserDate = document.createElement("div");
  postUserDate.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
  );
  const postUserContainer = document.createElement("div");
  postUserContainer.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "text-break",
    "me-3",
  );
  const postUserIcon = document.createElement("i");
  postUserIcon.classList.add("fa-regular", "fa-user", "user-icon", "me-1");
  const userName = document.createElement("a");
  userName.classList.add("link-underline");
  userName.textContent = post.author.name;
  userName.href = `/profile/?name=${post.author.name}`;
  postUserContainer.append(postUserIcon, userName);

  const postDateContainer = document.createElement("div");
  postDateContainer.classList.add(
    "d-flex",
    "justify-content-between",
    "align-items-center",
  );
  const postDateIcon = document.createElement("i");
  postDateIcon.classList.add("fa-regular", "fa-calendar", "me-1");
  const postDate = document.createElement("p");
  postDate.classList.add("m-0");
  postDate.textContent = formatDate(post.created);
  postDateContainer.append(postDateIcon, postDate);

  postUserDate.append(postUserContainer, postDateContainer);

  const tagList = document.createElement("ul");
  tagList.classList.add(
    "single-post-tag-list",
    "list-unstyled",
    "d-flex",
    "align-items-center",
    "gap-1",
    "mt-3",
    "mb-4",
    "mt-lg-4",
    "mb-lg-5",
    "flex-wrap",
    "fw-medium",
  );
  const tagsArray = post.tags;
  tagsArray
    ?.filter((tag) => tag.trim().length > 0)
    .forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.classList.add("border", "px-2", "py-1", "rounded-pill");
      tagItem.textContent = tag;
      tagList.appendChild(tagItem);
    });

  const contentContainer = document.createElement("div");
  const contentText = document.createElement("p");
  contentText.classList.add(
    "content-text",
    "m-0",
    "font-content",
    "font-size-sm",
  );
  contentText.textContent = post.body;
  contentContainer.appendChild(contentText);

  const commentSection = document.createElement("div");
  commentSection.classList.add("comment-section");
  const sectionTitle = document.createElement("p");
  sectionTitle.classList.add("mb-0");
  sectionTitle.textContent = `Comment ( ${post.comments.length} )`;

  const commentList = document.createElement("ul");
  commentList.classList.add(
    "comment-list",
    "list-unstyled",
    "pt-3",
    "mb-0",
    "py-lg-4",
    "px-lg-3",
  );
  const commentsArray = post.comments;
  const originalCommentsArray = commentsArray.filter(
    (comment) => comment.replyToId === null,
  );
  for (let i = 0; i < originalCommentsArray.length; i++) {
    const commentItem = document.createElement("li");
    commentItem.classList.add("comment-item", "original-comment-item");
    const comment = originalCommentsArray[i];
    commentItem.id = comment.id;
    commentItem.dataset.username = comment.author.name;
    const commentContainer = document.createElement("div");
    commentContainer.classList.add(
      "comment-container",
      "px-3",
      "pt-3",
      "pb-4",
      "px-lg-2",
      "py-lg-4",
    );
    const userInfo = document.createElement("div");
    userInfo.classList.add(
      "user-info",
      "d-flex",
      "align-items-center",
      "font-size-sm",
    );
    const userAvatar = document.createElement("img");
    userAvatar.classList.add("rounded-circle", "me-2");
    userAvatar.src = comment.author.avatar.url;
    const commentUser = document.createElement("a");
    commentUser.classList.add("comment-username", "link-underline");
    commentUser.href = `/profile/?name=${comment.author.name}`;
    commentUser.textContent = comment.author.name;
    userInfo.append(userAvatar, commentUser);
    const commentContent = document.createElement("div");
    commentContent.classList.add(
      "mt-3",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    );
    const commentText = document.createElement("p");
    commentText.classList.add("comment-text", "m-0", "font-content");
    commentText.textContent = comment.body;
    const commentDeleteButton = document.createElement("button");
    commentDeleteButton.classList.add(
      "comment-delete-button",
      "border-0",
      "bg-transparent",
      "px-0",
    );
    const commentDeleteIcon = document.createElement("i");
    commentDeleteIcon.classList.add("fa-solid", "fa-trash-can");
    commentDeleteButton.appendChild(commentDeleteIcon);
    commentContent.append(commentText, commentDeleteButton);
    const replyButton = document.createElement("button");
    replyButton.classList.add(
      "reply-button",
      "border-0",
      "bg-transparent",
      "px-0",
      "mt-3",
      "font-size-sm",
    );
    replyButton.innerHTML = `<i class="fa-solid fa-reply me-1"></i>Reply`;
    commentContainer.append(userInfo, commentContent, replyButton);
    const replyList = document.createElement("ul");
    replyList.classList.add(
      "reply-list",
      "ul-padding-left",
      "ps-4",
      "list-unstyled",
      "d-flex",
      "flex-column",
    );
    commentItem.append(commentContainer, replyList);
    commentList.appendChild(commentItem);
  }

  const replyCommentsArray = commentsArray.filter(
    (comment) => comment.replyToId !== null,
  );
  const commentItemsArray = post.comments;
  for (let i = 0; i < replyCommentsArray.length; i++) {
    const replyCommentItem = document.createElement("li");
    replyCommentItem.classList.add(
      "comment-item",
      "reply-comment-item",
      "border-top",
    );
    const comment = replyCommentsArray[i];
    replyCommentItem.id = comment.id;
    replyCommentItem.dataset.username = comment.author.name;
    const commentContainer = document.createElement("div");
    commentContainer.classList.add(
      "comment-container",
      "px-3",
      "pt-3",
      "pb-2",
      "px-lg-2",
      "py-lg-4",
    );
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info", "font-size-sm");
    const userAvatar = document.createElement("img");
    userAvatar.classList.add("rounded-circle", "me-2");
    userAvatar.src = comment.author.avatar.url;
    const commentUser = document.createElement("a");
    commentUser.classList.add("comment-username", "link-underline");
    commentUser.href = `/profile/?name=${comment.author.name}`;
    commentUser.textContent = comment.author.name;
    userInfo.append(userAvatar, commentUser);
    const commentContent = document.createElement("div");
    commentContent.classList.add(
      "mt-3",
      "d-flex",
      "justify-content-between",
      "align-items-center",
    );
    const commentText = document.createElement("p");
    commentText.classList.add(
      "comment-text",
      "font-size-sm",
      "font-content",
      "m-0",
    );
    commentText.textContent = comment.body;
    const commentDeleteButton = document.createElement("button");
    commentDeleteButton.classList.add(
      "comment-delete-button",
      "border-0",
      "bg-transparent",
      "px-0",
    );
    const commentDeleteIcon = document.createElement("i");
    commentDeleteIcon.classList.add("fa-solid", "fa-trash-can");
    commentDeleteButton.appendChild(commentDeleteIcon);
    commentContent.append(commentText, commentDeleteButton);
    const replyButton = document.createElement("button");
    replyButton.classList.add(
      "reply-button",
      "font-size-sm",
      "border-0",
      "bg-transparent",
      "px-0",
      "mt-3",
    );
    replyButton.innerHTML = `<i class="fa-solid fa-reply me-1"></i>Reply`;
    commentContainer.append(userInfo, commentContent, replyButton);
    const replyList = document.createElement("ul");
    replyList.classList.add("reply-list", "list-unstyled");
    replyCommentItem.append(commentContainer, replyList);
    const parentComment = commentItemsArray.find(
      (commentItem) => Number(commentItem.id) === comment.replyToId,
    );
    if (parentComment) {
      const allCommentItems = Array.from(
        commentList.querySelectorAll("li.comment-item"),
      );
      const allReplyList = Array.from(
        commentList.querySelectorAll("ul.reply-list"),
      );
      allReplyList.forEach((replyList, index) => {});
      const parentReplyItem = allCommentItems.find(
        (commentItem) => Number(commentItem.id) === comment.replyToId,
      );
      if (parentReplyItem) {
        const parentItemReplyList =
          parentReplyItem.querySelector(".reply-list");
        parentItemReplyList.appendChild(replyCommentItem);
      } else {
        console.error("Parent reply item not found");
      }
    }
  }

  const commentForm = document.createElement("form");
  commentForm.classList.add(
    "pt-5",
    "mt-4",
    "border-top",
    "border-black",
    "pt-lg-5",
  );
  commentForm.name = "comment";
  const myUserName = document.createElement("p");
  myUserName.classList.add("mb-0", "fw-semibold", "font-size-sm");
  myUserName.textContent = NoroffAPI.user;
  const replyMessage = document.createElement("p");
  replyMessage.classList.add("reply-message", "mb-0", "mt-2", "font-size-sm");
  const fromGroup = document.createElement("div");
  fromGroup.classList.add("form-group");
  const commentTextAreaLabel = document.createElement("label");
  commentTextAreaLabel.setAttribute("for", "comment");
  commentTextAreaLabel.classList.add("form-label", "col-12", "mt-2");
  fromGroup.appendChild(commentTextAreaLabel);

  const commentTextArea = document.createElement("textarea");
  commentTextArea.classList.add("form-control", "border-primary");
  commentTextArea.placeholder = "Write comment here";
  commentTextArea.name = "comment";
  commentTextArea.id = "comment";
  commentTextAreaLabel.appendChild(commentTextArea);

  const commentButton = document.createElement("button");
  commentButton.classList.add(
    "btn",
    "col-12",
    "mt-2",
    "mt-lg-2",
    "btn-primary",
    "border-2",
  );
  commentButton.type = "submit";
  commentButton.innerText = "Add comment";
  commentForm.append(myUserName, replyMessage, fromGroup, commentButton);
  commentSection.append(sectionTitle, commentList, commentForm);

  postContent.append(title, figure, postUserDate, tagList, contentContainer);
  singlePostContainer.append(postContent, commentSection);
  return singlePostContainer;
}
