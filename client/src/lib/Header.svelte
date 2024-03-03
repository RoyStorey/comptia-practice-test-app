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
</style>
