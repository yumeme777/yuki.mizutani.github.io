// ローディングアニメーション
const loadingAreaGrey = document.querySelector("#loading");
const loadingAreaGreen = document.querySelector("#loading-screen");
const loadingText = document.querySelector(".loading_wrapper");

window.addEventListener("load", () => {
  loadingAreaGrey.animate(
    {
      opacity: [1, 0],
      visibility: "hidden",
    },
    {
      duration: 2000,
      delay: 1200,
      easing: "ease",
      fill: "forwards",
    }
  );

  //  ローディング中
  loadingAreaGreen.animate(
    {
      translate: ["0 100vh", "0 0", "0 -100vh"],
    },
    {
      duration: 2000,
      delay: 800,
      easing: "ease",
      fill: "forwards",
    }
  );

  // ローディング中テキスト
  loadingText.animate(
    [
      {
        opacity: 1,
        offset: 0.8,
      },
      {
        opacity: 0,
        offset: 1,
      },
    ],
    {
      duration: 1200,
      easing: "ease",
      fill: "forwards",
    }
  );
});

// セレクタ名（.pagetop）に一致する要素を取得
const pagetop_btn = document.querySelector(".m_pagetop_button");

// .pagetopをクリックしたら
pagetop_btn.addEventListener("click", scroll_top);

// ページ上部へスムーズに移動
function scroll_top() {
  window.scroll({ top: 0, behavior: "smooth" });
}

// スクロールされたら表示
window.addEventListener("scroll", scroll_event);
function scroll_event() {
  if (window.pageYOffset > 100) {
    pagetop_btn.style.opacity = "1";
  } else if (window.pageYOffset < 100) {
    pagetop_btn.style.opacity = "0";
  }
}

// 360以下の画面のときにいい感じに表示できる
!(function () {
  const viewport = document.querySelector('meta[name="viewport"]');
  function switchViewport() {
    const value =
      window.outerWidth > 360
        ? "width=device-width,initial-scale=1"
        : "width=360";
    if (viewport.getAttribute("content") !== value) {
      viewport.setAttribute("content", value);
    }
  }
  addEventListener("resize", switchViewport, false);
  switchViewport();
})();

// スクロールしたらフェードイン
const animateFade = (entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      // console.log(entry.target);
      entry.target.animate(
        {
          opacity: [0, 1],
          translate: ["0 4rem", 0],
        },
        {
          duration: 2000,
          easing: "ease",
          fill: "forwards",
        }
      );
      obs.unobserve(entry.target);
    }
  });
};

const fadeObserver = new IntersectionObserver(animateFade);

const fadeElements = document.querySelectorAll(".js_fadeIn");
fadeElements.forEach((fadeElement) => {
  fadeObserver.observe(fadeElement);
});

// 高さ
window.addEventListener("resize", () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty("--vh", `${vh}px`);
});
