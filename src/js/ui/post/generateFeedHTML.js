import { formatDate } from "../../utilities/formatDate";

export function generateFeedHTML(post) {
  const postContainer = document.createElement("a");
  postContainer.classList.add("post-container", "group");
  postContainer.id = post.id;
  postContainer.href = `/post/?id=${post.id}`;

  const figure = document.createElement("figure");
  figure.classList.add("aspect-[4/3]", "overflow-hidden", "rounded-md");
  const thumbnail = document.createElement("img");
  thumbnail.classList.add(
    "thumbnail",
    "rounded-md",
    "object-cover",
    "object-center",
    "aspect-[4/3]",
    "w-full",
    "transition-scale",
    "duration-scale",
    "ease-scale",
    "transform",
    "group-hover:scale-110"
  );
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
  postTextContainer.classList.add("px-4", "pt-4", "pb-6");

  const postUserDate = document.createElement("div");
  postUserDate.classList.add("flex", "justify-between", "items-center");
  const postUserContainer = document.createElement("div");
  postUserContainer.classList.add(
    "user",
    "flex",
    "justify-between",
    "items-center",
    "mr-4",
    "hover:text-hover-black"
  );
  const postUserIcon = document.createElement("i");
  postUserIcon.classList.add("fa-regular", "fa-user", "mr-1");
  const userName = document.createElement("a");
  userName.classList.add("underline");
  userName.textContent = post.author.name;
  userName.href = `/profile/?name=${post.author.name}`;
  postUserContainer.append(postUserIcon, userName);

  const postDateContainer = document.createElement("div");
  postDateContainer.classList.add(
    "date",
    "flex",
    "justify-between",
    "items-center"
  );
  const postDateIcon = document.createElement("i");
  postDateIcon.classList.add("fa-regular", "fa-calendar", "mr-1");
  const postDate = document.createElement("p");
  postDate.textContent = formatDate(post.created);
  postDateContainer.append(postDateIcon, postDate);

  postUserDate.append(postUserContainer, postDateContainer);

  const postTagComment = document.createElement("div");
  postTagComment.classList.add(
    "flex",
    "justify-between",
    "items-center",
    "my-6",
    "gap-3"
  );
  const tagList = document.createElement("ul");
  tagList.classList.add(
    "tag-list",
    "flex",
    "items-center",
    "gap-1",
    "flex-wrap"
  );
  const tagsArray = post.tags;
  tagsArray
    ?.filter((tag) => tag.trim().length > 0)
    .forEach((tag) => {
      const tagItem = document.createElement("li");
      tagItem.classList.add(
        "tag-item",
        "border",
        "px-4",
        "py-1",
        "rounded-full"
      );
      tagItem.textContent = tag;
      tagList.appendChild(tagItem);
    });
  const comment = document.createElement("div");
  comment.classList.add("comment", "flex", "justify-between", "items-center");
  const commentIcon = document.createElement("i");
  commentIcon.classList.add("fa-regular", "fa-comments", "mr-1");
  const commentNumber = document.createElement("p");
  commentNumber.textContent = post.comments.length;
  comment.append(commentIcon, commentNumber);

  postTagComment.append(tagList, comment);

  const postTitle = document.createElement("p");
  postTitle.classList.add("font-bold", "text-2xl", "break-words");
  postTitle.textContent = post.title;

  postTextContainer.append(postUserDate, postTagComment, postTitle);
  postContainer.append(figure, postTextContainer);

  const postContainerDiv = document.createElement("div");
  postContainerDiv.classList.add(
    "h-full",
    "overflow-hidden",
    "border-2",
    "border-green",
    "rounded-md",
    "p-2"
  );
  postContainerDiv.appendChild(postContainer);

  return postContainerDiv;
}
