import NoroffAPI from "../../api";
import { formatDate } from "../../utilities/formatDate";

export function generateSinglePostHTML(post) {
  const singlePostContainer = document.createElement("div");
  singlePostContainer.classList.add("single-post-container");
  const postContent = document.createElement("div");
  postContent.classList.add(
    "pb-10",
    "mb-10",
    "border-b",
    "lg:pb-14",
    "lg:mb-14"
  );

  const title = document.createElement("h1");
  title.classList.add(
    "text-3xl",
    "font-bold",
    "text-center",
    "mb-4",
    "lg:text-4xl",
    "lg:mb-8"
  );
  title.textContent = post.title;
  const thumbnail = document.createElement("img");
  thumbnail.classList.add(
    "thumbnail",
    "rounded-md",
    "object-cover",
    "object-center",
    "aspect-[16/9]",
    "w-full",
    "mb-4"
  );
  if (post.media?.url) {
    thumbnail.src = post.media.url;
    thumbnail.alt = post.media.alt;
  } else {
    thumbnail.src = "../../../../images/default-thumbnail.jpg";
    thumbnail.alt = "No Media Available";
  }
  const postUserDate = document.createElement("div");
  postUserDate.classList.add(
    "post-user-date",
    "flex",
    "justify-between",
    "items-center"
  );
  const postUserContainer = document.createElement("div");
  postUserContainer.classList.add("user", "flex", "items-center", "mr-2");
  const postUserIcon = document.createElement("i");
  postUserIcon.classList.add("fa-regular", "fa-user", "mr-1");
  const userName = document.createElement("a");
  userName.classList.add("underline");
  userName.textContent = post.author.name;
  userName.href = `/profile/?name=${post.author.name}`;
  postUserContainer.append(postUserIcon, userName);

  const postDateContainer = document.createElement("div");
  postDateContainer.classList.add("date", "flex", "items-center");
  const postDateIcon = document.createElement("i");
  postDateIcon.classList.add("fa-regular", "fa-calendar", "mr-1");
  const postDate = document.createElement("p");
  postDate.textContent = formatDate(post.created);
  postDateContainer.append(postDateIcon, postDate);

  postUserDate.append(postUserContainer, postDateContainer);

  const tagList = document.createElement("ul");
  tagList.classList.add(
    "tag-list",
    "flex",
    "items-center",
    "gap-1",
    "mt-4",
    "mb-6",
    "lg:mt-6",
    "lg:mb-8"
  );
  const tagsArray = post.tags;
  tagsArray
    ?.filter((tag) => tag.trim().length > 0)
    .forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.classList.add(
        "tag-item",
        "border",
        "rounded-full",
        "px-2",
        "py-1",
        "font-medium"
      );
      tagItem.textContent = tag;
      tagList.appendChild(tagItem);
    });

  const contentContainer = document.createElement("div");
  contentContainer.classList.add("content");
  const contentText = document.createElement("p");
  contentText.classList.add("font-body", "text-sm");
  contentText.textContent = post.body;
  contentContainer.appendChild(contentText);

  const commentSection = document.createElement("div");
  commentSection.classList.add("comment-section");
  const sectionTitle = document.createElement("p");
  sectionTitle.classList.add("section-title");
  sectionTitle.textContent = `Comment (${post.comments.length})`;

  const commentList = document.createElement("ul");
  commentList.classList.add("comment-list", "pt-4", "lg:px-4", "lg:py-6");
  const commentsArray = post.comments;
  const originalCommentsArray = commentsArray.filter(
    (comment) => comment.replyToId === null
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
      "px-4",
      "pt-4",
      "py-6",
      "lg:px-2",
      "lg:py-6"
    );
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info", "flex", "items-center", "text-sm");
    const userAvatar = document.createElement("img");
    userAvatar.classList.add("w-8", "h-8", "rounded-full", "mr-2");
    userAvatar.src = comment.author.avatar.url;
    const commentUser = document.createElement("a");
    commentUser.classList.add("comment-username", "underline");
    commentUser.href = `/profile/?name=${comment.author.name}`;
    commentUser.textContent = comment.author.name;
    userInfo.append(userAvatar, commentUser);
    const commentContent = document.createElement("div");
    commentContent.classList.add(
      "comment-content",
      "flex",
      "justify-between",
      "items-center",
      "mt-4",
      "font-body"
    );
    const commentText = document.createElement("p");
    commentText.classList.add("comment-text", "text-sm");
    commentText.textContent = comment.body;
    const commentDeleteButton = document.createElement("button");
    commentDeleteButton.classList.add("comment-delete-button");
    const commentDeleteIcon = document.createElement("i");
    commentDeleteIcon.classList.add("fa-solid", "fa-trash-can");
    commentDeleteButton.appendChild(commentDeleteIcon);
    commentContent.append(commentText, commentDeleteButton);
    const replyButton = document.createElement("button");
    replyButton.classList.add("reply-button", "mt-4", "text-sm");
    replyButton.innerHTML = `<i class="fa-solid fa-reply mr-1"></i>Reply`;
    commentContainer.append(userInfo, commentContent, replyButton);
    const replyList = document.createElement("ul");
    replyList.classList.add("reply-list", "pl-6");
    commentItem.append(commentContainer, replyList);
    commentList.appendChild(commentItem);
  }

  const replyCommentsArray = commentsArray.filter(
    (comment) => comment.replyToId !== null
  );
  const commentItemsArray = post.comments;
  for (let i = 0; i < replyCommentsArray.length; i++) {
    const replyCommentItem = document.createElement("li");
    replyCommentItem.classList.add("comment-item", "border-t");
    const comment = replyCommentsArray[i];
    replyCommentItem.id = comment.id;
    replyCommentItem.dataset.username = comment.author.name;
    const commentContainer = document.createElement("div");
    commentContainer.classList.add(
      "comment-container",
      "p-4",
      "lg:px-2",
      "lg:py-6"
    );
    const userInfo = document.createElement("div");
    userInfo.classList.add("user-info", "flex", "items-center", "text-sm");
    const userAvatar = document.createElement("img");
    userAvatar.classList.add("w-8", "h-8", "rounded-full", "mr-2");
    userAvatar.src = comment.author.avatar.url;
    const commentUser = document.createElement("a");
    commentUser.classList.add("comment-username");
    commentUser.href = `/profile/?name=${comment.author.name}`;
    commentUser.textContent = comment.author.name;
    userInfo.append(userAvatar, commentUser);
    const commentContent = document.createElement("div");
    commentContent.classList.add(
      "comment-content",
      "flex",
      "justify-between",
      "items-center",
      "mt-4",
      "font-body"
    );
    const commentText = document.createElement("p");
    commentText.classList.add("comment-text", "text-sm");
    commentText.textContent = comment.body;
    const commentDeleteButton = document.createElement("button");
    commentDeleteButton.classList.add("comment-delete-button");
    const commentDeleteIcon = document.createElement("i");
    commentDeleteIcon.classList.add("fa-solid", "fa-trash-can");
    commentDeleteButton.appendChild(commentDeleteIcon);
    commentContent.append(commentText, commentDeleteButton);
    const replyButton = document.createElement("button");
    replyButton.classList.add("reply-button", "mt-4", "text-sm");
    replyButton.innerHTML = `<i class="fa-solid fa-reply mr-1"></i>Reply`;
    commentContainer.append(userInfo, commentContent, replyButton);
    const replyList = document.createElement("ul");
    replyList.classList.add("reply-list");
    replyCommentItem.append(commentContainer, replyList);
    const parentComment = commentItemsArray.find(
      (commentItem) => Number(commentItem.id) === comment.replyToId
    );
    if (parentComment) {
      const allCommentItems = Array.from(
        commentList.querySelectorAll("li.comment-item")
      );
      const allReplyList = Array.from(
        commentList.querySelectorAll("ul.reply-list")
      );
      allReplyList.forEach((replyList, index) => {});
      const parentReplyItem = allCommentItems.find(
        (commentItem) => Number(commentItem.id) === comment.replyToId
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
  commentForm.classList.add("comment-form", "mt-6", "pt-8", "border-t");
  commentForm.name = "comment";
  const myUserName = document.createElement("p");
  myUserName.classList.add("font-semibold", "text-sm");
  myUserName.textContent = NoroffAPI.user;
  const replyMessage = document.createElement("p");
  replyMessage.classList.add("reply-message", "mt-2", "text-sm");
  const commentTextAreaLabel = document.createElement("label");
  commentTextAreaLabel.classList.add("mt-2", "mb-3", "block");
  commentTextAreaLabel.setAttribute("for", "comment");

  const commentTextArea = document.createElement("textarea");
  commentTextArea.classList.add(
    "w-full",
    "p-3",
    "border",
    "rounded-md",
    "bg-light",
    "font-body"
  );
  commentTextArea.placeholder = "Write comment here";
  commentTextArea.name = "comment";
  commentTextArea.id = "comment";
  commentTextAreaLabel.appendChild(commentTextArea);

  const commentButton = document.createElement("button");
  commentButton.classList.add(
    "submit-type-button",
    "bg-green",
    "text-white",
    "w-full",
    "border-2",
    "rounded-md",
    "px-3",
    "py-4",
    "font-medium",
    "duration-pb",
    "hover:bg-light",
    "hover:text-green"
  );
  commentButton.type = "submit";
  commentButton.innerText = "Add comment";
  commentForm.append(
    myUserName,
    replyMessage,
    commentTextAreaLabel,
    commentButton
  );
  commentSection.append(sectionTitle, commentList, commentForm);

  postContent.append(title, thumbnail, postUserDate, tagList, contentContainer);
  singlePostContainer.append(postContent, commentSection);
  return singlePostContainer;
}
