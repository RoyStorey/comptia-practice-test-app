<script>
  import { Router, Route } from "svelte-routing";

  import Home from "./pages/Home.svelte";
  import About from "./pages/About.svelte";
  import Contact from "./pages/Contact.svelte";
  import UserStats from "./pages/UserStats.svelte";
  import Header from "./lib/Header.svelte";
</script>

<Router>
  <Route path="/" component={Home} />
  <Route path="/about" component={About} />
  <Route path="/contact" component={Contact} />
  <Route path="/stats" component={UserStats} />
</Router>
