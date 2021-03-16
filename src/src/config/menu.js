module.exports = {
  mainMenu: [
    { name: "Main", icon: "main", link: "/main" },
    { name: "About", icon: "about", link: "/about" },
    { name: "Post", icon: "post", link: "/post/all/0" },
  ],
  subMenu: {
    main: [
      { name: "m1", icon: "", link: "/main/side1" },
      { name: "m2", icon: "", link: "/main/side2" },
      { name: "m3", icon: "", link: "/main/side3" },
    ],
    about: [
      { name: "side1", icon: "twitter", link: "/about/side1" },
      { name: "side2", icon: "qq", link: "/about/side2" },
    ],
  },
  categoryMenu: [
    { name: "전체", icon: "", link: "/post/all/0" },
    { name: "개발", icon: "", link: "/post/develop/0" },
    { name: "생활", icon: "comment", link: "/post/life/0" },
    { name: "뻘글", icon: "comment", link: "/post/wtf/0" },
  ],
};
