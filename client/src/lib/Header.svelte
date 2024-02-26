<script>
  import { Link } from "svelte-routing";
</script>

<header>
  <h4><span>CompTIA</span> Study App</h4>
  <nav>
    <Link to="/">Home</Link>
    <Link to="/about">About</Link>
    <Link to="/contact">Contact</Link>
    <Link to="/stats">User Stats</Link>
  </nav>
</header>

<style>
  a {
    color: rgba(255, 255, 255, 0.87);
  }
  a:hover {
    color: #d82934;
    filter: drop-shadow(0 0 2em #d82934);
  }
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1em;
  }

  nav {
    display: flex;
    gap: 1em;
  }

  nav a {
    text-decoration: none;
  }
</style>
