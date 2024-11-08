import { formatDate } from "../../utilities/formatDate";

export function generateFeedHTML(post) {
  const postContainer = document.createElement("a");
  postContainer.classList.add(
    "post-container",
    "overflow-hidden",
    "col",
    "hover-scale-img",
  );
  postContainer.id = post.id;
  postContainer.href = `/post/?id=${post.id}`;

  const figure = document.createElement("figure");
  figure.classList.add(
    "ratio",
    "ratio-4x3",
    "m-0",
    "overflow-hidden",
    "rounded",
  );
  const thumbnail = document.createElement("img");
  thumbnail.classList.add("thumbnail", "rounded", "object-fit-fill");
  if (post.media?.url) {
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

  const postTextContainer = document.createElement("div");
  postTextContainer.classList.add(
    "post-text-container",
    "px-2",
    "pt-2",
    "pb-4",
  );

  const postUserDate = document.createElement("div");
  postUserDate.classList.add(
    "post-user-date",
    "d-flex",
    "justify-content-between",
  );
  const postUserContainer = document.createElement("div");
  postUserContainer.classList.add(
    "user",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "text-break",
    "me-3",
    "font-size-sm",
    "hover-color-opacity",
  );
  const postUserIcon = document.createElement("i");
  postUserIcon.classList.add("fa-regular", "fa-user", "user-icon", "me-1");
  const userName = document.createElement("a");
  userName.classList.add("post-author", "link-underline");
  userName.textContent = post.author.name;
  userName.href = `/profile/?name=${post.author.name}`;
  postUserContainer.append(postUserIcon, userName);

  const postDateContainer = document.createElement("div");
  postDateContainer.classList.add(
    "date",
    "d-flex",
    "justify-content-between",
    "align-items-center",
    "font-size-sm",
  );
  const postDateIcon = document.createElement("i");
  postDateIcon.classList.add("fa-regular", "fa-calendar", "me-1");
  const postDate = document.createElement("p");
  postDate.classList.add("mb-0");
  postDate.textContent = formatDate(post.created);
  postDateContainer.append(postDateIcon, postDate);

  postUserDate.append(postUserContainer, postDateContainer);

  const postTagComment = document.createElement("div");
  postTagComment.classList.add(
    "post-tag-comment",
    "d-flex",
    "justify-content-between",
    "align-items-start",
    "my-4",
    "gap-3",
  );
  const tagList = document.createElement("ul");
  tagList.classList.add(
    "tag-list",
    "list-unstyled",
    "d-flex",
    "align-items-center",
    "gap-1",
    "mb-0",
    "flex-wrap",
  );
  const tagsArray = post.tags;
  tagsArray
    ?.filter((tag) => tag.trim().length > 0)
    .forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.classList.add(
        "tag-item",
        "bg-light",
        "border",
        "border-black",
        "px-3",
        "py-1",
        "rounded-pill",
      );
      tagItem.textContent = tag;
      tagList.appendChild(tagItem);
    });
  const comment = document.createElement("div");
  comment.classList.add(
    "comment",
    "d-flex",
    "justify-content-between",
    "align-items-center",
  );
  const commentIcon = document.createElement("i");
  commentIcon.classList.add("fa-regular", "fa-comments", "me-1");
  const commentNumber = document.createElement("p");
  commentNumber.classList.add("mb-0");
  commentNumber.textContent = post.comments.length;
  comment.append(commentIcon, commentNumber);

  postTagComment.append(tagList, comment);

  const postTitle = document.createElement("p");
  postTitle.classList.add("post-title", "h3", "mb-0");
  postTitle.textContent = post.title;

  postTextContainer.append(postUserDate, postTagComment, postTitle);
  const bootstrapFlexBox = document.createElement("div");
  bootstrapFlexBox.classList.add(
    "p-2",
    "border",
    "border-2",
    "rounded",
    "h-100",
  );
  bootstrapFlexBox.append(figure, postTextContainer);
  postContainer.appendChild(bootstrapFlexBox);

  return postContainer;
}
