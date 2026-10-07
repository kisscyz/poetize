/* 诗语 POETIZE · 交互脚本（无依赖） */
(function () {
  "use strict";

  /* ---------- 移动端汉堡菜单 ---------- */
  var hamburger = document.getElementById("hamburger");
  var mainNav = document.getElementById("mainNav");
  if (hamburger && mainNav) {
    hamburger.addEventListener("click", function () {
      mainNav.classList.toggle("open");
    });
    mainNav.addEventListener("click", function (e) {
      if (e.target.tagName === "A") mainNav.classList.remove("open");
    });
  }

  /* ---------- 导航高亮 ---------- */
  var page = document.body.getAttribute("data-page");
  if (page && mainNav) {
    var links = mainNav.querySelectorAll("a[data-nav]");
    for (var i = 0; i < links.length; i++) {
      if (links[i].getAttribute("data-nav") === page) links[i].classList.add("active");
    }
  }

  /* ---------- 回到顶部 ---------- */
  var toTop = document.getElementById("toTop");
  if (toTop) {
    window.addEventListener("scroll", function () {
      toTop.classList.toggle("show", window.scrollY > 400);
    }, { passive: true });
    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  /* ---------- 站内搜索 ---------- */
  var SEARCH_INDEX = [
    { t: "首页", d: "在山水之间，寻一句诗", u: "index.html" },
    { t: "漫步 · 旅行照片墙", d: "Photo Wall", u: "gallery.html" },
    { t: "时间线 · 时光诗行", d: "纵向时光线", u: "timeline.html" },
    { t: "秋日私语", d: "关于安静的代码与用心的设计", u: "article.html" },
    { t: "春山夜行 · 灯火如星", d: "最新文章", u: "index.html" }
  ];
  var searchBtn = document.getElementById("searchBtn");
  var searchBar = document.getElementById("searchBar");
  var searchInput = document.getElementById("searchInput");
  var searchResults = document.getElementById("searchResults");
  if (searchBtn && searchBar) {
    searchBtn.addEventListener("click", function () {
      searchBar.classList.toggle("open");
      if (searchBar.classList.contains("open") && searchInput) searchInput.focus();
    });
  }
  if (searchInput && searchResults) {
    searchInput.addEventListener("input", function () {
      var q = searchInput.value.trim().toLowerCase();
      searchResults.innerHTML = "";
      if (!q) return;
      var hit = SEARCH_INDEX.filter(function (it) {
        return it.t.toLowerCase().indexOf(q) !== -1 || it.d.toLowerCase().indexOf(q) !== -1;
      });
      if (!hit.length) {
        searchResults.innerHTML = '<div class="search-empty">没有找到相关内容，换个关键词试试～</div>';
        return;
      }
      hit.forEach(function (it) {
        var a = document.createElement("a");
        a.href = it.u;
        a.textContent = it.t + " · " + it.d;
        searchResults.appendChild(a);
      });
    });
  }

  /* ---------- 相册筛选 ---------- */
  var chips = document.querySelectorAll(".chip[data-filter]");
  var photos = document.querySelectorAll(".ph[data-cat]");
  if (chips.length && photos.length) {
    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (c) { c.classList.remove("active"); });
        chip.classList.add("active");
        var f = chip.getAttribute("data-filter");
        photos.forEach(function (p) {
          p.classList.toggle("hide", f !== "all" && p.getAttribute("data-cat") !== f);
        });
      });
    });
  }

  /* ---------- 文章目录滚动高亮 ---------- */
  var tocLinks = document.querySelectorAll(".toc a[href^='#']");
  if (tocLinks.length) {
    var sections = [];
    tocLinks.forEach(function (a) {
      var el = document.querySelector(a.getAttribute("href"));
      if (el) sections.push({ a: a, el: el });
    });
    window.addEventListener("scroll", function () {
      var cur = null;
      sections.forEach(function (s) {
        if (s.el.getBoundingClientRect().top < 180) cur = s;
      });
      tocLinks.forEach(function (a) { a.classList.remove("active"); });
      if (cur) cur.a.classList.add("active");
    }, { passive: true });
  }

  /* ---------- 页脚年份 ---------- */
  var year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
