const navigationBar = document.createElement('nav');
navigationBar.innerHTML = `
  <ul>
    <li><a href="#home">Home</a></li>
    <li><a href="#about">About</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
`;
document.body.prepend(navigationBar);

const style = document.createElement('style');
style.textContent = `
  nav {
    background-color: #333;
    padding: 1rem;
  }

  nav ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
  }

  nav li {
    margin-right: 1rem;
  }

  nav a {
    color: white;
    text-decoration: none;
  }

  nav a:hover {
    color: #ddd;
  }
`;
document.head.appendChild(style);