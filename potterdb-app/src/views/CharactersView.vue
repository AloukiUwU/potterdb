<script>
import axios from 'axios';
// import LinkIcon from '../components/icons/IconLink.vue'
export default {
    data() {
        return {
            characters: [],
            results: { data: [] },
            searchTerm: "",
            error: null,
        };
    },
    mounted() {
        axios.get('https://api.potterdb.com/v1/characters', {
            params: {
                'page[size]': 10,
                'filter[name_cont]': this.searchTerm,
                'filter[name_matches_any]': ['Harry James Potter', 'Ronald Bilius Weasley', 'Hermione Jean Granger', 'Sirius Black III', 'Minerva McGonagall', 'Neville Longbottom', 'Severus Snape', 'Draco Lucius Malfoy', 'Albus Percival Wulfric Brian Dumbledore', 'Tom Marvolo Riddle'],
            }
        })
            .then(response => {
                this.characters = response.data.data;
                this.results = response.data;
                console.log("characters console log :", this.characters);
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
        fetchPage(url) {
            axios.get(url)
                .then(response => {
                    this.results = response.data;
                    this.characters = response.data.data;
                })
                .catch(error => {
                    this.error = 'Error fetching data: ' + error.message;
                    console.error(this.error);
                });
        },
    },
    computed: {
        filterCharacters() {
            return this.characters.filter(character => {
                return character.attributes.name.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
        }
    }
}
</script>

<template>
    <div class="characters">
        <div class="heading">
            <h1>Main Characters</h1>
            <input type="text" placeholder="Search..." v-model="searchTerm">
        </div>
        {{ console.log("blop bleep 1") }}
        <div v-if="error" class="error">{{ console.log("error") }}</div>
        <div v-else class="list">
            <div v-for="character in filterCharacters" :key="character.id" class="character-card"
                :id="(character.attributes.slug)">
                {{ console.log("bleep blop 2") }}
                <img :src="(character.attributes.image)">
                <div class="character-card-content">
                    <h3>{{ formatSlug(character.attributes.slug) }}</h3>
                    <p>House : {{ character.attributes.house }}</p>
                    <a :href="(character.attributes.wiki)" target="_blank">Learn more</a>
                </div>
            </div>
        </div>
    </div>
</template>


<style>
@import '../assets/base.css';
@media (min-width: 1024px) {

    :target {
        -webkit-animation: target-fade 3s 1;
        -moz-animation: target-fade 3s 1;
        animation: target-fade 3s 1;
    }

    @keyframes target-fade {
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

    @-webkit-keyframes target-fade {
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

    @-moz-keyframes target-fade {
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

    .characters {
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

    .character-card {
        background-color: var(--color-background-mute);
        transition: 0.3s;
        border-radius: 10px;
        color: var(--vt-c-white);

    }

    .character-card:target {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear normal;
    }

    .character-card:hover {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear infinite;
        transform: scale(1.1)
    }

    .character-card-content {
        padding: 20px 20px;
    }

    .character-card-content h3 {
        padding: 0;
        margin: 0;
    }

    .character-card img {
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
    :target {
        -webkit-animation: target-fade 3s 1;
        -moz-animation: target-fade 3s 1;
        animation: target-fade 3s 1;
    }

    @keyframes target-fade {
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

    @-webkit-keyframes target-fade {
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

    @-moz-keyframes target-fade {
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

    .characters {
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

    .character-card {
        background-color: var(--color-background-mute);
        transition: 0.3s;
        border-radius: 10px;
        color: var(--vt-c-white);
    }

    .character-card:target {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear normal;
    }

    .character-card:hover {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear infinite;
        transform: scale(1.1)
    }

    .character-card-content {
        padding: 20px 20px;
    }

    .character-card-content h3 {
        padding: 0;
        margin: 0;
    }

    .character-card img {
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