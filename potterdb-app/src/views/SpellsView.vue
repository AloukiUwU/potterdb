<script>
import axios from 'axios';
// import LinkIcon from '../components/icons/IconLink.vue'
export default {
    data() {
        return {
            spells: [],
            results: { data: [] },
            searchTerm: "",
            error: null,
        };
    },
    mounted() {
        axios.get('https://api.potterdb.com/v1/spells', {
            params: {
                'page[size]': 20,
                'filter[name_cont]': this.searchTerm,
            }
        })
            .then(response => {
                this.spells = response.data.data;
                this.results = response.data;
                console.log("spells console log :", this.spells);
            })
            .catch(error => {
                this.error = 'Error fetching data: ' + error.message;
                console.error(this.error);
            });
    },
    methods: {
        // Fonction pour formater un slug en une chaîne de caractères lisible
        formatSlug(slug) {
            const words = slug.split('-');
            const formattedWords = words.map(word => {
                return word.charAt(0).toUpperCase() + word.substring(1);
            });
            return formattedWords.join(' ');
        },
        noEffect(effect) {
            return effect ? effect : "No effect data";
        },
        noCategory(effect) {
            return effect ? effect : "No category data";
        },
        noImage(image) {
            return image ? image : "/src/assets/no-spell-image.jpg";
        },
        fetchPage(url) {
            axios.get(url)
                .then(response => {
                    this.results = response.data;
                    this.spells = response.data.data;
                })
                .catch(error => {
                    this.error = 'Error fetching data: ' + error.message;
                    console.error(this.error);
                });
        },
    },
    computed: {
        filterspells() {
            return this.spells.filter(spell => {
                return spell.attributes.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
        }
    },
}
</script>

<template>
    <div class="spells">
        <div class="heading">
            <h1>Les spells</h1>
            <input type="text" placeholder="Rechercher..." v-model="searchTerm">
        </div>
        {{ console.log("blop bleep 1") }}
        <nav class="pagination" v-if="this.results.links">
            <button v-if="this.results.links.prev" @click="fetchPage(this.results.links.prev)">Previous</button>
            <button v-if="this.results.links.next" @click="fetchPage(this.results.links.next)">Next</button>
        </nav>
        <div v-if="error" class="error">{{ console.log("error") }}</div>
        <div v-else class="list">
            <div v-for="spell in filterspells" :key="spell.id" class="spell-card" :id="(spell.attributes.slug)">
                {{ console.log("bleep blop 2") }}
                <img :src="(noImage(spell.attributes.image))">
                <div class="spell-card-content">
                    <h3>{{ formatSlug(spell.attributes.slug) }}</h3>
                    <p>Category : {{ noCategory(spell.attributes.category) }}</p>
                    <p>Effect : {{ noEffect(spell.attributes.effect) }}</p>
                    <a :href="(spell.attributes.wiki)" target="_blank">Learn more</a>
                </div>
            </div>
        </div>

        <nav class="pagination" v-if="this.results.links">
            <button v-if="this.results.links.prev" @click="fetchPage(this.results.links.prev)">Previous</button>
            <button v-if="this.results.links.next" @click="fetchPage(this.results.links.next)">Next</button>
        </nav>
    </div>
</template>


<style>
@import '../assets/base.css';
@media (min-width: 1024px) {
    .pagination {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .pagination button {
        height: 50px;
        font-family: 'Space Grotesk';
        color: var(--gold);
        background-color: var(--color-background-mute);
        font-size: 15px;
        padding: 16px;
        border: none;
        transition: 0.3s;
        border-radius: 5px;
    }

    .pagination button:hover {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear infinite;
        transform: scale(1.1)
    }

    .spells {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 0 auto;
        margin-top: 130px;
        gap: 30px;
    }

    .heading {
        display: flex;
        justify-content: space-between;
        color: var(--vt-c-white);
    }

    .heading input {
        width: 322px;
        height: 50px;
        padding: 16px;
        font-size: 15px;
        font-family: 'Space Grotesk';

        color: var(--vt-c-white-soft);
        background-color: var(--color-background-mute);
        border: none;
    }

    .list {
        display: grid;
        grid-template-columns: repeat(4, 1fr);
        gap: 50px;

    }

    .spell-card {
        background-color: var(--color-background-mute);
        transition: 0.3s;
        border-radius: 10px;
        color: var(--vt-c-white);

    }

    .spell-card:hover {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear infinite;
        transform: scale(1.1)
    }

    .spell-card-content {
        padding: 20px 20px;
    }

    .spell-card-content h3 {
        padding: 0;
        margin: 0;
    }

    .spell-card img {
        width: 100%;
        height: 324px;
        object-fit: cover;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    @keyframes blink {
        0% {
            box-shadow: 0 0 15px var(--gold);
        }

        50% {
            box-shadow: none;
        }

        100% {
            box-shadow: 0 0 15px var(--gold);
        }
    }

    @-webkit-keyframes blink {
        0% {
            box-shadow: 0 0 15px var(--gold);
        }

        50% {
            box-shadow: 0 0 0;
        }

        100% {
            box-shadow: 0 0 15px var(--gold);
        }
    }
}

@media (max-width: 1023px) {
    .pagination {
        display: flex;
        justify-content: center;
        gap: 20px;
    }

    .pagination button {
        height: 50px;
        font-family: 'Space Grotesk';
        color: var(--gold);
        background-color: var(--color-background-mute);
        font-size: 15px;
        padding: 16px;
        border: none;
        transition: 0.3s;
        border-radius: 5px;
    }

    .pagination button:hover {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear infinite;
        transform: scale(1.1)
    }

    .spells {
        min-height: 100vh;
        display: flex;
        flex-direction: column;
        padding: 0 auto;
        margin-top: 130px;
        gap: 30px;
    }

    .heading {
        display: flex;
        justify-content: space-between;
        color: var(--vt-c-white);
    }

    .heading input {
        width: 322px;
        height: 50px;
        padding: 16px;
        font-size: 15px;
        font-family: 'Space Grotesk';

        color: var(--vt-c-white-soft);
        background-color: var(--color-background-mute);
        border: none;
    }

    .list {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 50px;

    }

    .spell-card {
        background-color: var(--color-background-mute);
        transition: 0.3s;
        border-radius: 10px;
        color: var(--vt-c-white);

    }

    .spell-card:hover {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear infinite;
        transform: scale(1.1)
    }

    .spell-card-content {
        padding: 20px 20px;
    }

    .spell-card-content h3 {
        padding: 0;
        margin: 0;
    }

    .spell-card img {
        width: 100%;
        height: 324px;
        object-fit: cover;
        border-top-left-radius: 10px;
        border-top-right-radius: 10px;
    }

    @keyframes blink {
        0% {
            box-shadow: 0 0 15px var(--gold);
        }

        50% {
            box-shadow: none;
        }

        100% {
            box-shadow: 0 0 15px var(--gold);
        }
    }

    @-webkit-keyframes blink {
        0% {
            box-shadow: 0 0 15px var(--gold);
        }

        50% {
            box-shadow: 0 0 0;
        }

        100% {
            box-shadow: 0 0 15px var(--gold);
        }
    }
}
</style>