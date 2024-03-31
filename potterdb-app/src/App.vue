<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <img alt="PotterDB logo" class="logo" src="@/assets/PDB.svg" width="125" height="125" />

    <div class="wrapper">
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/characters">Main Characters</RouterLink>
        <RouterLink to="/potions">Potions</RouterLink>
        <RouterLink to="/spells">Spells</RouterLink>
        <RouterLink to="/books">Books</RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
  <footer>
    <p>Copyright @ 2024 | Developped by Denis Trimolet & Raphaël Rifault</p>
  </footer>
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    justify-content: space-between;
  }

  .logo {
    margin: 0;
    height: 43px;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;

    font-size: 1rem;

    padding: 1rem 0;
  }

  footer {
    margin: 30px 0;
    text-align: center;
  }
}
</style>
