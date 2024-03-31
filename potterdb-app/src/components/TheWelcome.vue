<script setup>
import WelcomeItem from './WelcomeItem.vue'
import BookIcon from './icons/IconBook.vue'
import CharacterIcon from './icons/IconCharacter.vue'
import SpellIcon from './icons/IconSpell.vue'
import HelloWorld from './HelloWorld.vue'
import PotionIcon from './icons/IconPotion.vue'
</script>

<template>
  <HelloWorld msg="Welcome to PotterDB !" />
  <WelcomeItem>
    <template #icon>
      <CharacterIcon />
    </template>
    <template #heading>Main Characters</template>
    Explore an exhaustive list of the iconic characters from the Harry Potter universe, from
    <a href="http://localhost:5173/characters#harry-potter" target="_blank" rel="noopener">Harry</a>
    himself to
    <a href="http://localhost:5173/characters#albus-dumbledore" target="_blank" rel="noopener">Dumbledore</a>
    ,
    <a href="http://localhost:5173/characters#hermione-granger" target="_blank" rel="noopener">Hermione</a>
    and
    <a href="http://localhost:5173/characters#ronald-weasley" target="_blank" rel="noopener">Ron.</a>
    Discover their stories, roles, and unique personality traits !
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <PotionIcon />
    </template>
    <template #heading>Potions</template>
    Explore a fascinating catalog of magical potions used in the Harry Potter universe. Discover exotic ingredients,
    mysterious incantations, and the enchanting effects of these magical brews !
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <SpellIcon />
    </template>
    <template #heading>Spells</template>
    Discover a magical repertoire of spells and enchantments used in the wizarding world. From Expelliarmus to the
    Patronus, explore their incantations and effects to master the art of magic !
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <BookIcon />
    </template>
    <template #heading>Books</template>
    Explore a virtual library featuring the iconic titles from the Harry Potter universe. Discover the covers,
    summaries,
    and details of the original novels that have captivated millions of readers worldwide !
  </WelcomeItem>
</template>./icons/IconSpell.vue
