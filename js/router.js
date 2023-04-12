export class Router {
  routes = {};

  add(routeName, page) {
    this.routes[routeName] = page;
  }

  route(event) {
    event = event || window.event;
    event.preventDefault();
    window.history.pushState({}, "", event.target.href);
    this.handle();
  }

  handle() {
    const pathname = window.location.pathname;
    const route = this.routes[pathname] || this.routes[404];

    //Alterando a imagem de fundo conforme as páginas mudam
    let backgroundImg;

    if (pathname === "/") {
      backgroundImg = "url(./images/mountains-universe-1.png)";
    } else if (pathname === "/universe") {
      console.log("oi");
      backgroundImg = "url(./images/mountains-universe-2.png)";
    } else if (pathname === "/exploration") {
      backgroundImg = "url(./images/mountains-universe-3.png)";
    } else {
      backgroundImg = "url(./images/mountains-universe-1.png)";
    }

    //Aplicando estilo ao elemento da lista referente a pagina que está carregada
    let background = document.querySelector(".background");

    background.style.backgroundImage = backgroundImg;

    let menu = document.querySelectorAll(".menu-item");
    for (let i = 0; i < menu.length; i++) {
      menu[i].classList.remove("active");
    }
    for (let i = 0; i < menu.length; i++) {
      let route = menu[i].getAttribute("href");
      if (route === pathname) {
        menu[i].classList.add("active");
        break;
      }
    }

    fetch(route)
      .then((data) => data.text())
      .then((html) => {
        document.querySelector("#app").innerHTML = html;
      });
  }
}
