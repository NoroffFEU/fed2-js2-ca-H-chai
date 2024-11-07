(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const a of document.querySelectorAll('link[rel="modulepreload"]')) n(a);
  new MutationObserver((a) => {
    for (const o of a)
      if (o.type === "childList")
        for (const s of o.addedNodes)
          s.tagName === "LINK" && s.rel === "modulepreload" && n(s);
  }).observe(document, { childList: !0, subtree: !0 });
  function t(a) {
    const o = {};
    return (
      a.integrity && (o.integrity = a.integrity),
      a.referrerPolicy && (o.referrerPolicy = a.referrerPolicy),
      a.crossOrigin === "use-credentials"
        ? (o.credentials = "include")
        : a.crossOrigin === "anonymous"
          ? (o.credentials = "omit")
          : (o.credentials = "same-origin"),
      o
    );
  }
  function n(a) {
    if (a.ep) return;
    a.ep = !0;
    const o = t(a);
    fetch(a.href, o);
  }
})();
const _ = "c8603e77-83d7-41ba-a742-4494007b8666",
  V = "https://v2.api.noroff.dev";
function L(p) {
  const e = new Headers();
  return (
    e.append("X-Noroff-API-Key", _),
    localStorage.token &&
      e.append("Authorization", `Bearer ${localStorage.token}`),
    p && e.append("Content-Type", "application/json"),
    e
  );
}
class d {
  static get user() {
    try {
      return JSON.parse(localStorage.getItem("user")).name;
    } catch {
      return null;
    }
  }
  static set user(e) {
    localStorage.setItem("user", JSON.stringify(e));
  }
  static set token(e) {
    localStorage.setItem("token", e);
  }
  static apiBase = V;
  static paths = {
    login: `${d.apiBase}/auth/login`,
    register: `${d.apiBase}/auth/register`,
    socialPost: `${d.apiBase}/social/posts`,
    socialProfiles: `${d.apiBase}/social/profiles`,
  };
  auth = {
    login: async ({ email: e, password: t }) => {
      const n = JSON.stringify({ email: e, password: t }),
        a = await fetch(d.paths.login, {
          headers: L(!0),
          method: "POST",
          body: n,
        }),
        { data: o } = await d.util.handleResponse(
          a,
          "Could not login this account"
        ),
        { accessToken: s, ...l } = o;
      return (
        (d.token = s),
        (d.user = l),
        (window.location.href = "/post/feed/?page=1"),
        o
      );
    },
    register: async ({ name: e, email: t, password: n }) => {
      const a = JSON.stringify({ name: e, email: t, password: n }),
        o = await fetch(d.paths.register, {
          headers: L(!0),
          method: "POST",
          body: a,
        });
      return await d.util.handleResponse(o, "Could not register this account");
    },
  };
  static util = {
    handleResponse: async (e, t, n = "json") => {
      if (e.ok) return e.status === 204 ? null : await e[n]();
      const o = (await e[n]()).errors[0]?.message || "Unknown error";
      throw new Error(`${t}: ${o}`);
    },
  };
  post = {
    create: async ({ title: e, body: t, tags: n, media: a }) => {
      const o = JSON.stringify({ title: e, body: t, tags: n, media: a }),
        s = await fetch(d.paths.socialPost, {
          headers: L(!0),
          method: "POST",
          body: o,
        }),
        l = await d.util.handleResponse(s, "Could not create post");
      return (window.location.href = "/post/feed/?page=1"), l;
    },
    delete: async (e) => {
      const t = await fetch(`${d.paths.socialPost}/${e}`, {
          headers: L(),
          method: "DELETE",
        }),
        n = await d.util.handleResponse(t, "Could not delete post.");
      return alert("The post was deleted!"), n;
    },
    readPost: async (e, t = null) => {
      const n = new URL(`${d.paths.socialPost}/${e}`);
      n.searchParams.append("_author", !0),
        n.searchParams.append("_comments", !0),
        t && n.searchParams.append("_tag", t);
      const a = await fetch(n.toString(), { headers: L(), method: "GET" });
      return await d.util.handleResponse(a, "Could not get the post");
    },
    update: async (e, { title: t, body: n, tags: a, media: o }) => {
      const s = JSON.stringify({ title: t, body: n, tags: a, media: o }),
        l = await fetch(`${d.paths.socialPost}/${e}`, {
          headers: L(!0),
          method: "PUT",
          body: s,
        });
      await d.util.handleResponse(l, "Could not update post"),
        (window.location.href = `/post/?id=${e}`);
    },
    comment: async (e, { body: t, replyToId: n }) => {
      const a = { body: t };
      n !== void 0 && (a.replyToId = n);
      const o = JSON.stringify(a),
        s = await fetch(`${d.paths.socialPost}/${e}/comment`, {
          headers: L(!0),
          method: "POST",
          body: o,
        });
      return await d.util.handleResponse(s, "Could not comment on the post");
    },
    deleteComment: async (e, t) => {
      const n = await fetch(`${d.paths.socialPost}/${e}/comment/${t}`, {
          headers: L(),
          method: "DELETE",
        }),
        a = await d.util.handleResponse(n, "Could not delete comment.");
      return alert("The comment was deleted."), a;
    },
  };
  posts = {
    getPosts: async (e = 12, t = 1, n) => {
      const a = new URL(d.paths.socialPost);
      a.searchParams.append("limit", e),
        a.searchParams.append("page", t),
        a.searchParams.append("_author", !0),
        a.searchParams.append("_comments", !0),
        n && a.searchParams.append("_tag", n);
      const o = await fetch(a.toString(), { headers: L(), method: "GET" });
      return await d.util.handleResponse(o, "Could not get posts");
    },
    getAllPosts: async () => {
      const e = await fetch(d.paths.socialPost, {
        headers: L(),
        method: "GET",
      });
      return await d.util.handleResponse(e, "Could not get all posts");
    },
  };
  profile = {
    readUsersPosts: async (e, t = 12, n = 1) => {
      const a = new URL(`${d.paths.socialProfiles}/${e}/posts`);
      a.searchParams.append("_author", !0),
        a.searchParams.append("_comments", !0),
        a.searchParams.append("limit", t),
        a.searchParams.append("page", n);
      const o = await fetch(a.toString(), { headers: L(), method: "GET" });
      return await d.util.handleResponse(o, "Could not get user's post.");
    },
    readProfile: async function (t) {
      const n = await fetch(`${d.paths.socialProfiles}/${t}`, {
        headers: L(),
        method: "GET",
      });
      return await d.util.handleResponse(n, "Could not get profile.");
    },
    update: async (e, { bio: t, avatar: n, banner: a }) => {
      const o = JSON.stringify({ bio: t, avatar: n, banner: a }),
        s = await fetch(`${d.paths.socialProfiles}/${e}`, {
          headers: L(!0),
          method: "PUT",
          body: o,
        });
      await d.util.handleResponse(s, "Could not update profile."),
        (window.location.href = `/profile/?name=${e}`);
    },
    follow: async (e) => {
      const t = await fetch(`${d.paths.socialProfiles}/${e}/follow`, {
        headers: L(),
        method: "PUT",
      });
      return await d.util.handleResponse(t, "Could not follow the user.");
    },
    unfollow: async (e) => {
      const t = await fetch(`${d.paths.socialProfiles}/${e}/unfollow`, {
        headers: L(),
        method: "PUT",
      });
      return await d.util.handleResponse(t, "Could not unfollow the user.");
    },
  };
}
const h = new d(V);
function Y() {
  localStorage.getItem("token") ||
    (alert("You must be logged in to view this page"),
    (window.location.href = "/auth/login/"));
}
function Z(p) {
  const e = new Date(p),
    t = { day: "2-digit", month: "2-digit", year: "numeric" };
  return e.toLocaleDateString("en-GB", t);
}
function Q(p) {
  const e = document.createElement("a");
  e.classList.add("post-container"),
    (e.id = p.id),
    (e.href = `/post/?id=${p.id}`);
  const t = document.createElement("figure");
  t.classList.add("aspect-[4/3]");
  const n = document.createElement("img");
  n.classList.add(
    "thumbnail",
    "rounded-md",
    "object-cover",
    "object-center",
    "aspect-[4/3]",
    "w-full"
  ),
    p.media?.url
      ? ((n.src = p.media.url),
        (n.alt = p.media.alt),
        (n.onerror = () => {
          (n.src = "../../../../images/default-thumbnail.jpg"),
            (n.alt = "Default Thumbnail");
        }))
      : ((n.src = "../../../../images/default-thumbnail.jpg"),
        (n.alt = "No Media Available")),
    t.appendChild(n);
  const a = document.createElement("div");
  a.classList.add("px-4", "pt-4", "pb-6");
  const o = document.createElement("div");
  o.classList.add("flex", "justify-between", "items-center");
  const s = document.createElement("div");
  s.classList.add("user", "flex", "justify-between", "items-center", "mr-4");
  const l = document.createElement("i");
  l.classList.add("fa-regular", "fa-user", "mr-1");
  const i = document.createElement("a");
  i.classList.add("underline"),
    (i.textContent = p.author.name),
    (i.href = `/profile/?name=${p.author.name}`),
    s.append(l, i);
  const m = document.createElement("div");
  m.classList.add("date", "flex", "justify-between", "items-center");
  const r = document.createElement("i");
  r.classList.add("fa-regular", "fa-calendar", "mr-1");
  const c = document.createElement("p");
  (c.textContent = Z(p.created)), m.append(r, c), o.append(s, m);
  const u = document.createElement("div");
  u.classList.add("flex", "justify-between", "items-center", "my-6", "gap-3");
  const v = document.createElement("ul");
  v.classList.add("tag-list", "flex", "items-center", "gap-1", "flex-wrap"),
    p.tags
      ?.filter((B) => B.trim().length > 0)
      .forEach((B) => {
        const T = document.createElement("li");
        T.classList.add("tag-item", "border", "px-4", "py-1", "rounded-full"),
          (T.textContent = B),
          v.appendChild(T);
      });
  const g = document.createElement("div");
  g.classList.add("comment", "flex", "justify-between", "items-center");
  const C = document.createElement("i");
  C.classList.add("fa-regular", "fa-comments", "mr-1");
  const x = document.createElement("p");
  (x.textContent = p.comments.length), g.append(C, x), u.append(v, g);
  const E = document.createElement("p");
  E.classList.add("font-bold", "text-2xl", "break-words"),
    (E.textContent = p.title),
    a.append(o, u, E),
    e.append(t, a);
  const S = document.createElement("div");
  return (
    S.classList.add(
      "h-full",
      "overflow-hidden",
      "border-2",
      "border-green",
      "rounded-md",
      "p-2"
    ),
    S.appendChild(e),
    S
  );
}
function ee(p) {
  const e = document.createElement("div");
  e.classList.add("single-post-container");
  const t = document.createElement("div");
  t.classList.add("pb-10", "mb-10", "border-b", "lg:pb-14", "lg:mb-14");
  const n = document.createElement("h1");
  n.classList.add(
    "text-3xl",
    "font-bold",
    "text-center",
    "mb-4",
    "lg:text-4xl",
    "lg:mb-8"
  ),
    (n.textContent = p.title);
  const a = document.createElement("img");
  a.classList.add(
    "thumbnail",
    "rounded-md",
    "object-cover",
    "object-center",
    "aspect-[16/9]",
    "w-full",
    "mb-4"
  ),
    p.media?.url
      ? ((a.src = p.media.url), (a.alt = p.media.alt))
      : ((a.src = "../../../../images/default-thumbnail.jpg"),
        (a.alt = "No Media Available"));
  const o = document.createElement("div");
  o.classList.add("post-user-date", "flex", "justify-between", "items-center");
  const s = document.createElement("div");
  s.classList.add("user", "flex", "items-center", "mr-2");
  const l = document.createElement("i");
  l.classList.add("fa-regular", "fa-user", "mr-1");
  const i = document.createElement("a");
  i.classList.add("underline"),
    (i.textContent = p.author.name),
    (i.href = `/profile/?name=${p.author.name}`),
    s.append(l, i);
  const m = document.createElement("div");
  m.classList.add("date", "flex", "items-center");
  const r = document.createElement("i");
  r.classList.add("fa-regular", "fa-calendar", "mr-1");
  const c = document.createElement("p");
  (c.textContent = Z(p.created)), m.append(r, c), o.append(s, m);
  const u = document.createElement("ul");
  u.classList.add(
    "tag-list",
    "flex",
    "items-center",
    "gap-1",
    "mt-4",
    "mb-6",
    "lg:mt-6",
    "lg:mb-8"
  ),
    p.tags
      ?.filter((y) => y.trim().length > 0)
      .forEach((y) => {
        const w = document.createElement("li");
        w.classList.add(
          "tag-item",
          "border",
          "rounded-full",
          "px-2",
          "py-1",
          "font-medium"
        ),
          (w.textContent = y),
          u.appendChild(w);
      });
  const f = document.createElement("div");
  f.classList.add("content");
  const g = document.createElement("p");
  g.classList.add("font-body", "text-sm"),
    (g.textContent = p.body),
    f.appendChild(g);
  const C = document.createElement("div");
  C.classList.add("comment-section");
  const x = document.createElement("p");
  x.classList.add("section-title"),
    (x.textContent = `Comment (${p.comments.length})`);
  const E = document.createElement("ul");
  E.classList.add("comment-list", "pt-4", "lg:px-4", "lg:py-6");
  const S = p.comments,
    B = S.filter((y) => y.replyToId === null);
  for (let y = 0; y < B.length; y++) {
    const w = document.createElement("li");
    w.classList.add("comment-item", "original-comment-item");
    const b = B[y];
    (w.id = b.id), (w.dataset.username = b.author.name);
    const k = document.createElement("div");
    k.classList.add(
      "comment-container",
      "px-4",
      "pt-4",
      "py-6",
      "lg:px-2",
      "lg:py-6"
    );
    const R = document.createElement("div");
    R.classList.add("user-info", "flex", "items-center", "text-sm");
    const I = document.createElement("img");
    I.classList.add("w-8", "h-8", "rounded-full", "mr-2"),
      (I.src = b.author.avatar.url);
    const P = document.createElement("a");
    P.classList.add("comment-username", "underline"),
      (P.href = `/profile/?name=${b.author.name}`),
      (P.textContent = b.author.name),
      R.append(I, P);
    const D = document.createElement("div");
    D.classList.add(
      "comment-content",
      "flex",
      "justify-between",
      "items-center",
      "mt-4",
      "font-body"
    );
    const U = document.createElement("p");
    U.classList.add("comment-text", "text-sm"), (U.textContent = b.body);
    const q = document.createElement("button");
    q.classList.add("comment-delete-button");
    const O = document.createElement("i");
    O.classList.add("fa-solid", "fa-trash-can"),
      q.appendChild(O),
      D.append(U, q);
    const M = document.createElement("button");
    M.classList.add("reply-button", "mt-4", "text-sm"),
      (M.innerHTML = '<i class="fa-solid fa-reply mr-1"></i>Reply'),
      k.append(R, D, M);
    const H = document.createElement("ul");
    H.classList.add("reply-list", "pl-6"), w.append(k, H), E.appendChild(w);
  }
  const T = S.filter((y) => y.replyToId !== null),
    N = p.comments;
  for (let y = 0; y < T.length; y++) {
    const w = document.createElement("li");
    w.classList.add("comment-item", "border-t");
    const b = T[y];
    (w.id = b.id), (w.dataset.username = b.author.name);
    const k = document.createElement("div");
    k.classList.add("comment-container", "p-4", "lg:px-2", "lg:py-6");
    const R = document.createElement("div");
    R.classList.add("user-info", "flex", "items-center", "text-sm");
    const I = document.createElement("img");
    I.classList.add("w-8", "h-8", "rounded-full", "mr-2"),
      (I.src = b.author.avatar.url);
    const P = document.createElement("a");
    P.classList.add("comment-username"),
      (P.href = `/profile/?name=${b.author.name}`),
      (P.textContent = b.author.name),
      R.append(I, P);
    const D = document.createElement("div");
    D.classList.add(
      "comment-content",
      "flex",
      "justify-between",
      "items-center",
      "mt-4",
      "font-body"
    );
    const U = document.createElement("p");
    U.classList.add("comment-text", "text-sm"), (U.textContent = b.body);
    const q = document.createElement("button");
    q.classList.add("comment-delete-button");
    const O = document.createElement("i");
    O.classList.add("fa-solid", "fa-trash-can"),
      q.appendChild(O),
      D.append(U, q);
    const M = document.createElement("button");
    M.classList.add("reply-button", "mt-4", "text-sm"),
      (M.innerHTML = '<i class="fa-solid fa-reply mr-1"></i>Reply'),
      k.append(R, D, M);
    const H = document.createElement("ul");
    if (
      (H.classList.add("reply-list"),
      w.append(k, H),
      N.find((z) => Number(z.id) === b.replyToId))
    ) {
      const z = Array.from(E.querySelectorAll("li.comment-item"));
      Array.from(E.querySelectorAll("ul.reply-list")).forEach((W, ae) => {});
      const A = z.find((W) => Number(W.id) === b.replyToId);
      A
        ? A.querySelector(".reply-list").appendChild(w)
        : console.error("Parent reply item not found");
    }
  }
  const F = document.createElement("form");
  F.classList.add("comment-form", "mt-6", "pt-8", "border-t"),
    (F.name = "comment");
  const K = document.createElement("p");
  K.classList.add("font-semibold", "text-sm"), (K.textContent = d.user);
  const X = document.createElement("p");
  X.classList.add("reply-message", "mt-2", "text-sm");
  const J = document.createElement("label");
  J.classList.add("mt-2", "mb-3", "block"), J.setAttribute("for", "comment");
  const j = document.createElement("textarea");
  j.classList.add(
    "w-full",
    "p-3",
    "border",
    "rounded-md",
    "bg-light",
    "font-body"
  ),
    (j.placeholder = "Write comment here"),
    (j.name = "comment"),
    (j.id = "comment"),
    J.appendChild(j);
  const G = document.createElement("button");
  return (
    G.classList.add(
      "submit-type-button",
      "bg-green",
      "text-white",
      "w-full",
      "rounded-md",
      "p-3",
      "font-medium"
    ),
    (G.type = "submit"),
    (G.innerText = "Add comment"),
    F.append(K, X, J, G),
    C.append(x, E, F),
    t.append(n, a, o, u, f),
    e.append(t, C),
    e
  );
}
class $ extends d {
  constructor() {
    super(), this.router(), (this.replyToId = null);
  }
  async router(e = window.location.pathname) {
    switch (e) {
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
    handleSubmit(e) {
      e.preventDefault();
      const t = e.target,
        n = new FormData(t);
      return Object.fromEntries(n.entries());
    },
  };
  setReplyToId(e) {
    const t = document.querySelector(".reply-message"),
      n = document.querySelector(".comment-item[data-replying='true']");
    n &&
      ((n.style.backgroundColor = "transparent"),
      (t.innerHTML = ""),
      (n.dataset.replying = "false"));
    const a = e.target.closest(".comment-item");
    this.replyToId = Number(a.id);
    const o = a.dataset.username;
    (a.style.backgroundColor = "#dedede"),
      (t.innerHTML = `<button class="cancel text-sm" type="button"><i class="fa-solid fa-circle-xmark mr-1"></i></button>Replying to <span class="reply-to">${o}</span>`),
      (a.dataset.replying = "true"),
      document.querySelector(".cancel").addEventListener("click", () => {
        (t.innerHTML = ""),
          (this.replyToId = null),
          (a.style.backgroundColor = "transparent"),
          (a.dataset.replying = "false");
      });
  }
  setupReplyButtons() {
    document.querySelectorAll(".reply-button").forEach((t) => {
      t.addEventListener("click", (n) => this.setReplyToId(n));
    });
  }
  setupReplyButtons() {
    document.querySelectorAll(".reply-button").forEach((t) => {
      t.addEventListener("click", (n) => this.setReplyToId(n));
    });
  }
  views = {
    register: async () => {
      document.forms.register.addEventListener("submit", this.events.register);
    },
    login: async () => {
      document.forms.login.addEventListener("submit", this.events.login);
    },
    feed: async () => {
      this.events.logout(), this.events.myPage();
      const t =
        new URLSearchParams(window.location.search).get("page") ||
        localStorage.getItem("page") ||
        1;
      this.events.post.displayPosts(Number(t));
    },
    postCreate: async () => {
      Y(),
        this.events.logout(),
        this.events.myPage(),
        document.forms.createPost.addEventListener(
          "submit",
          this.events.post.create
        );
    },
    postEdit: async () => {
      Y(),
        this.events.logout(),
        this.events.myPage(),
        this.events.post.update(),
        this.events.post.delete();
    },
    post: async () => {
      this.events.logout(),
        this.events.myPage(),
        this.events.post.displaySinglePost();
    },
    profile: async () => {
      Y(),
        this.events.logout(),
        this.events.myPage(),
        this.animation.headerPadding();
      const t = new URLSearchParams(window.location.search).get("page") || 1;
      this.events.profile.displayProfilePage(Number(t));
    },
    profileUpdate: async () => {
      Y(), this.events.logout(), this.events.profile.updateProfile();
    },
    notFound: async () => {
      alert("Page cannot be found in /src/views");
    },
  };
  currentPage = 1;
  events = {
    login: async (e) => {
      const t = $.form.handleSubmit(e);
      try {
        await h.auth.login(t);
      } catch (n) {
        alert(n.message);
      }
    },
    register: async (e) => {
      const t = $.form.handleSubmit(e),
        { name: n, email: a } = t;
      try {
        await h.auth.register(t),
          alert(`Registration successful!
Username: ${n}
Email: ${a}`),
          (window.location.href = "/auth/login/");
      } catch (o) {
        alert(`${o.message}.
Please try again.`);
      }
    },
    logout: () => {
      document.querySelectorAll(".logout-button").forEach((t) => {
        t.addEventListener("click", (n) => {
          n.preventDefault(),
            localStorage.removeItem("user"),
            localStorage.removeItem("token"),
            localStorage.removeItem("page"),
            alert("You have successfully logged out."),
            (window.location.href = "/");
        });
      });
    },
    myPage: () => {
      document.querySelectorAll(".my-page").forEach((t) => {
        t.href = `/profile/?name=${d.user}`;
      });
    },
    post: {
      create: async (e) => {
        const t = $.form.handleSubmit(e),
          n = { url: t["media[url]"], alt: t["media[alt]"] },
          { title: a, body: o, tags: s } = t,
          l = s
            ? s
                .split(",")
                .map((i) => i.trim())
                .filter((i) => i.length > 0)
            : [];
        try {
          await h.post.create({ title: a, body: o, tags: l, media: n });
        } catch (i) {
          alert(i.message);
        }
      },
      delete: () => {
        document
          .querySelector(".delete-button")
          .addEventListener("click", async () => {
            try {
              const n = new URLSearchParams(window.location.search).get("id");
              window.confirm("Are you sure you want to delete this post?") &&
                (await h.post.delete(n),
                (window.location.href = `/profile/?name=${d.user}`));
            } catch (t) {
              alert(t.message);
            }
          });
      },
      displayPosts: async (e = 1) => {
        try {
          const t = await h.posts.getPosts(12, e),
            { data: n, meta: a } = t,
            { currentPage: o, pageCount: s } = a,
            l = document.querySelector(".feed");
          (l.innerHTML = ""),
            n.forEach((r) => {
              const c = Q(r);
              l.appendChild(c);
            });
          const i = `${window.location.pathname}?page=${e}`;
          window.history.replaceState({}, "", i),
            this.pagination.feedPagination(o, s),
            window.scrollTo({ top: 0, behavior: "smooth" }),
            document.querySelectorAll(".post-container").forEach((r) => {
              r.addEventListener("click", () => {
                const u = new URLSearchParams(window.location.search).get(
                  "page"
                );
                localStorage.setItem("page", u);
              });
            });
        } catch (t) {
          alert(t.message);
        }
      },
      displaySinglePost: async () => {
        try {
          const t = new URLSearchParams(window.location.search).get("id"),
            a = (await h.post.readPost(t)).data,
            o = a.author.name,
            s = document.createElement("button");
          s.classList.add(
            "edit-button",
            "text-green",
            "font-medium",
            "border-2",
            "px-4",
            "py-2",
            "rounded-md",
            "bg-light"
          ),
            (s.textContent = "Edit");
          const l = document.createElement("i");
          l.classList.add(
            "fa-regular",
            "fa-pen-to-square",
            "text-green",
            "mr-1"
          ),
            s.insertBefore(l, s.firstChild),
            (s.dataset.id = t),
            o === d.user
              ? (s.style.display = "block")
              : (s.style.display = "none");
          const i = document.querySelector(".header-nav");
          i.insertBefore(s, i.firstChild),
            s.addEventListener("click", () => {
              window.location.href = `/post/edit/?id=${t}`;
            });
          const m = document.createElement("button");
          m.classList.add("text-green", "font-semibold"),
            (m.textContent = "Edit"),
            (m.dataset.id = t),
            o === d.user
              ? (s.style.display = "block")
              : (s.style.display = "none");
          const r = document.createElement("li");
          r.appendChild(m);
          const c = document.querySelector(".menu");
          c.insertBefore(r, c.firstChild),
            m.addEventListener("click", () => {
              window.location.href = `/post/edit/?id=${t}`;
            });
          const u = document.querySelector(".single-post");
          u.innerHTML = "";
          const v = ee(a);
          u.appendChild(v);
          const f = document.querySelector(".back-to-profile-page");
          (f.href = `/profile/?name=${o}`), (f.textContent = `${o}'s page`);
          const g = document.createElement("i");
          g.classList.add("fa-solid", "fa-chevron-left", "mr-1"),
            f.insertBefore(g, f.firstChild),
            document.forms.comment.addEventListener(
              "submit",
              this.events.post.comment
            );
          const x = document.querySelector(".back-link-on-single-page"),
            E = localStorage.getItem("page");
          (x.href = `/post/feed/?page=${E}`),
            this.events.post.deleteComment(),
            this.setupReplyButtons(),
            this.pagination.singlePostPagination();
        } catch (e) {
          alert(e.message);
        }
      },
      update: async () => {
        try {
          const t = new URLSearchParams(window.location.search).get("id"),
            n = await h.post.readPost(t),
            { data: a } = n,
            { title: o, body: s, tags: l, media: i } = a;
          (document.getElementById("title").value = o),
            (document.getElementById("content").value = s),
            (document.getElementById("tags").value = l.join(",")),
            (document.getElementById("img-url").value = i.url),
            (document.getElementById("img-alt").value = i.alt),
            document.forms.editPost.addEventListener("submit", async (m) => {
              const r = $.form.handleSubmit(m);
              (r.tags = r.tags.split(",").map((c) => c.trim())),
                (r.media = { url: r["media[url]"], alt: r["media[alt]"] }),
                await h.post.update(t, r);
            });
        } catch (e) {
          alert(e.message);
        }
      },
      comment: async (e) => {
        const n = $.form.handleSubmit(e).comment;
        if (!n || n.trim() === "") {
          alert("Comment cannot be empty.");
          return;
        }
        const o = new URLSearchParams(window.location.search).get("id");
        if (this.replyToId)
          try {
            await h.post.comment(o, { body: n, replyToId: this.replyToId }),
              location.reload();
          } catch (s) {
            alert(s.message);
          }
        else
          try {
            await h.post.comment(o, { body: n }), location.reload();
          } catch (s) {
            alert(s.message);
          }
      },
      deleteComment: () => {
        document.querySelectorAll(".comment-delete-button").forEach((t) => {
          t.addEventListener("click", async (n) => {
            try {
              const o = new URLSearchParams(window.location.search).get("id"),
                s = n.target.closest(".comment-item"),
                l = s.id;
              window.confirm("Are you sure you want to delete this comment?") &&
                (await h.post.deleteComment(o, l), s.remove());
              const r = (await h.post.readPost(o)).data.comments.length,
                c = document.querySelector(".section-title");
              c.textContent = `Comment (${r})`;
            } catch (a) {
              alert(a.message);
            }
          });
        });
      },
    },
    profile: {
      displayProfilePage: async (e = 1) => {
        const n = new URLSearchParams(window.location.search).get("name");
        try {
          const a = await h.profile.readUsersPosts(n, 12, e),
            o = await h.profile.readProfile(n),
            s = a.data,
            l = o.data,
            i = document.querySelector(".avatar");
          i.src = l.avatar.url;
          const m = document.querySelector(".username");
          m.textContent = l.name;
          const r = document.querySelector(".bio");
          (r.textContent = l.bio),
            (document.querySelector(".followers").textContent =
              l._count.followers),
            (document.querySelector(".following").textContent =
              l._count.following),
            (document.querySelector(".posts").textContent = l._count.posts);
          const c = document.querySelector(".profile-header"),
            u = l.banner.url;
          c.style.backgroundImage = `url(${u})`;
          const v = document.querySelector(".button-area"),
            f = document.createElement("button");
          f.classList.add(
            "update-button",
            "text-green",
            "font-medium",
            "border-2",
            "px-4",
            "py-2",
            "rounded-md",
            "bg-light",
            "mr-0"
          ),
            (f.textContent = "Update Profile");
          const g = document.createElement("button");
          g.classList.add(
            "follow-button",
            "text-green",
            "font-medium",
            "border-2",
            "px-4",
            "py-2",
            "rounded-md",
            "bg-light",
            "mr-0"
          ),
            (g.id = "toggle-button"),
            (g.textContent = "Follow"),
            v.append(f, g),
            n === d.user
              ? ((f.style.display = "block"), (g.style.display = "none"))
              : ((f.style.display = "none"), (g.style.display = "block")),
            f.addEventListener("click", () => {
              window.location.href = "/profile/update/";
            });
          const C = document.querySelector(".feed");
          (C.innerHTML = ""),
            s.forEach((B) => {
              const T = Q(B);
              C.appendChild(T);
            });
          const x = l._count.posts,
            E = Math.ceil(x / 12),
            S = `${window.location.pathname}?name=${n}&page=${e}`;
          window.history.replaceState({}, "", S),
            (this.currentPage = e),
            this.pagination.profilePagination(this.currentPage, E),
            window.scrollTo({ top: 0, behavior: "smooth" }),
            this.events.profile.follow();
        } catch (a) {
          alert(a.message);
        }
      },
      updateProfile: async () => {
        try {
          const e = d.user,
            t = await h.profile.readProfile(e),
            { data: n } = t,
            { bio: a, avatar: o, banner: s } = n;
          (document.getElementById("bio").value = a || ""),
            (document.getElementById("banner").value = s.url || ""),
            (document.getElementById("banner-alt").value = s.alt || ""),
            (document.getElementById("avatar").value = o.url || ""),
            (document.getElementById("avatar-alt").value = o.alt || ""),
            document.forms.updateProfile.addEventListener(
              "submit",
              async (m) => {
                m.preventDefault();
                const r = $.form.handleSubmit(m);
                (r.banner = { url: r["banner[url]"], alt: r["banner[alt]"] }),
                  (r.avatar = { url: r["avatar[url]"], alt: r["avatar[alt]"] }),
                  await h.profile.update(e, r);
              }
            );
          const l = document.querySelector(".back-to-profile-page");
          (l.href = `/profile/?name=${d.user}`),
            (l.textContent = "My profile page");
          const i = document.createElement("i");
          i.classList.add("fa-solid", "fa-chevron-left", "mr-1"),
            l.insertBefore(i, l.firstChild);
        } catch (e) {
          alert(e.message);
        }
      },
      follow: () => {
        const e = document.getElementById("toggle-button");
        e.addEventListener("click", async () => {
          try {
            const n = new URLSearchParams(window.location.search).get("name");
            (e.disabled = !0),
              e.textContent === "Follow"
                ? (await h.profile.follow(n), (e.textContent = "Following"))
                : (await h.profile.unfollow(n), (e.textContent = "Follow"));
            const s = (await h.profile.readProfile(n)).data._count.followers;
            document.querySelector(".followers").textContent = s;
          } catch (t) {
            alert(t.message);
          }
          e.disabled = !1;
        });
      },
    },
  };
  pagination = {
    feedPagination: async (e, t) => {
      const n = document.querySelector(".feed-pagination");
      n.innerHTML = "";
      const a = (r, c) => {
          const u = document.createElement("button");
          return (
            (u.textContent = r),
            (u.dataset.page = c),
            (u.className =
              "pagination-button w-9 h-9 border-2 border-green rounded-full"),
            c === e && u.classList.add("current-page"),
            u.addEventListener("click", () => {
              this.events.post.displayPosts(c);
            }),
            u
          );
        },
        o = () => {
          const r = document.createElement("span");
          return (r.textContent = "..."), r;
        },
        s = document.createElement("button");
      s.classList.add("w-9", "h-9", "border-2", "border-green", "rounded-full");
      const l = document.createElement("i");
      if (
        (l.classList.add("fa-solid", "fa-chevron-left"),
        s.appendChild(l),
        n.appendChild(s),
        s.addEventListener("click", () => {
          e > 1 && this.events.post.displayPosts(e - 1);
        }),
        e === 1
          ? ((s.disabled = !0), (s.style.cursor = "not-allowed"))
          : (s.disabled = !1),
        e < 4)
      ) {
        for (let c = 1; c < 4; c++) {
          const u = a(c, c);
          n.appendChild(u);
        }
        n.appendChild(o());
        const r = a(t, t);
        n.appendChild(r);
      }
      if (e >= 4 && e <= t - 3) {
        const r = a(1, 1);
        n.appendChild(r), n.appendChild(o());
        const c = Math.max(3, e - 2),
          u = Math.min(t - 2, e + 2);
        for (let f = c; f <= u; f++) {
          const g = a(f, f);
          n.appendChild(g);
        }
        n.appendChild(o());
        const v = a(t, t);
        n.appendChild(v);
      }
      if (e > t - 3) {
        const r = a(1, 1);
        n.appendChild(r), n.appendChild(o());
        for (let c = t - 2; c <= t; c++) {
          const u = a(c, c);
          n.appendChild(u);
        }
      }
      if (t <= 7)
        for (let r = 1; r < 8; r++) {
          const c = a(r, r);
          n.appendChild(c);
        }
      const i = document.createElement("button");
      i.classList.add("w-9", "h-9", "border-2", "border-green", "rounded-full");
      const m = document.createElement("i");
      m.classList.add("fa-solid", "fa-chevron-right"),
        i.appendChild(m),
        n.appendChild(i),
        i.addEventListener("click", () => {
          e < t && this.events.post.displayPosts(e + 1);
        }),
        e === t
          ? ((i.disabled = !0), (i.style.cursor = "not-allowed"))
          : (i.disabled = !1);
    },
    singlePostPagination: async () => {
      let e = await h.posts.getAllPosts(),
        { data: t, meta: n } = e;
      const a = n.totalCount;
      let o = 1;
      const s = new URLSearchParams(window.location.search),
        l = Number(s.get("id"));
      let i = t.findIndex((c) => c.id === l);
      for (; i === -1 && o * 100 < a; ) {
        o++;
        let c = await h.posts.getPosts(100, o);
        (t = t.concat(c.data)), (i = t.findIndex((u) => u.id === l));
      }
      const m = document.getElementById("previous-post");
      if (m)
        if (i > 0) {
          const c = t[i - 1].id;
          m.addEventListener("click", () => {
            window.location.href = `/post/?id=${c}`;
          });
        } else (m.disabled = !0), (m.style.cursor = "not-allowed");
      const r = document.getElementById("next-post");
      if (r)
        if (i < t.length - 1) {
          const c = t[i + 1]?.id;
          r.addEventListener("click", () => {
            c && (window.location.href = `/post/?id=${c}`);
          });
        } else if (o * 100 < a) {
          o++;
          try {
            let c = await h.posts.getPosts(100, o);
            (t = t.concat(c.data)), (i = t.findIndex((v) => v.id === l));
            const u = t[i + 1]?.id;
            r.addEventListener("click", () => {
              u
                ? (window.location.href = `/post/?id=${u}`)
                : ((r.disabled = !0), (r.style.cursor = "not-allowed"));
            });
          } catch (c) {
            alert(c.message),
              (r.disabled = !0),
              (r.style.cursor = "not-allowed");
          }
        } else (r.disabled = !0), (r.style.cursor = "not-allowed");
    },
    profilePagination: async (e, t) => {
      this.currentPage = e;
      const n = document.querySelector(".feed-pagination");
      n.innerHTML = "";
      const a = (m, r) => {
          const c = document.createElement("button");
          return (
            (c.textContent = m),
            (c.dataset.page = r),
            (c.className =
              "pagination-button w-9 h-9 border-2 border-green rounded-full"),
            r === this.currentPage && c.classList.add("current-page"),
            c.addEventListener("click", () => {
              (this.currentPage = r), this.events.profile.displayProfilePage(r);
            }),
            c
          );
        },
        o = document.createElement("button");
      o.classList.add("w-9", "h-9", "border-2", "border-green", "rounded-full");
      const s = document.createElement("i");
      s.classList.add("fa-solid", "fa-chevron-left"),
        o.appendChild(s),
        n.appendChild(o),
        o.addEventListener("click", () => {
          this.currentPage > 1 &&
            this.events.profile.displayProfilePage(this.currentPage - 1);
        }),
        this.currentPage === 1
          ? ((o.disabled = !0), (o.style.cursor = "not-allowed"))
          : (o.disabled = !1);
      for (let m = 1; m <= t; m++) {
        const r = a(m, m);
        n.appendChild(r);
      }
      const l = document.createElement("button");
      l.classList.add("w-9", "h-9", "border-2", "border-green", "rounded-full");
      const i = document.createElement("i");
      i.classList.add("fa-solid", "fa-chevron-right"),
        l.appendChild(i),
        n.appendChild(l),
        l.addEventListener("click", () => {
          this.currentPage < t &&
            this.events.profile.displayProfilePage(this.currentPage + 1);
        }),
        this.currentPage === t
          ? ((l.disabled = !0), (l.style.cursor = "not-allowed"))
          : (l.disabled = !1);
    },
  };
  animation = {
    headerPadding: () => {
      const e = document.querySelector(".profile-header"),
        t = 11,
        n = 2.5;
      window.addEventListener("scroll", () => {
        window.scrollY > 0
          ? (e.style.paddingBottom = `${n}rem`)
          : (e.style.paddingBottom = `${t}rem`);
      });
    },
  };
}
new $();
