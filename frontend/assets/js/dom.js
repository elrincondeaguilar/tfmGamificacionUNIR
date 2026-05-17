(() => {
  const root = (window.PhysicsChallenger = window.PhysicsChallenger || {});

  root.dom = {
    byId(id) {
      return document.getElementById(id);
    },
    qs(selector, scope = document) {
      return scope.querySelector(selector);
    },
    qsa(selector, scope = document) {
      return Array.from(scope.querySelectorAll(selector));
    },
  };
})();
