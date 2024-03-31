<script>
import axios from 'axios';
// import LinkIcon from '../components/icons/IconLink.vue'
export default {
    data() {
        return {
            books: [],
            results: { data: [] },
            searchTerm: "",
            error: null,
        };
    },
    mounted() {
        axios.get('https://api.potterdb.com/v1/books', {
            params: {
                'page[size]': 20,
                'filter[slug_cont]': this.searchTerm,
            }
        })
            .then(response => {
                this.books = response.data.data;
                this.results = response.data;
                console.log("books console log :", this.books);
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
                    this.books = response.data.data;
                })
                .catch(error => {
                    this.error = 'Error fetching data: ' + error.message;
                    console.error(this.error);
                });
        },
    },
    computed: {
        filterBooks() {
            return this.books.filter(book => {
                return book.attributes.slug.toLowerCase().includes(this.searchTerm.toLowerCase());
            });
        }
    },
}
</script>

<template>
    <div class="books">
        <div class="heading">
            <h1>Books</h1>
            <input type="text" placeholder="Search..." v-model="searchTerm">
        </div>
        {{ console.log("blop bleep 1") }}
        <div v-if="error" class="error">{{ console.log("error") }}</div>
        <div v-else class="list">
            <div v-for="book in filterBooks" :key="book.id" class="book-card" :id="(book.attributes.slug)">
                {{ console.log("bleep blop 2") }}
                <img :src="(book.attributes.cover)">
                <div class="book-card-content">
                    <h3>{{ formatSlug(book.attributes.slug) }}</h3>
                    <p>Author : {{ book.attributes.author }}</p>
                    <p>Release Date : {{ book.attributes.release_date }}</p>
                    <a :href="(book.attributes.wiki)" target="_blank">Learn more</a>
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

    .books {
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

    .book-card {
        background-color: var(--color-background-mute);
        transition: 0.3s;
        border-radius: 10px;
        color: var(--vt-c-white);

    }

    .book-card:hover {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear infinite;
        transform: scale(1.1)
    }

    .book-card-content {
        padding: 20px 20px;
    }

    .book-card-content h3 {
        padding: 0;
        margin: 0;
    }

    .book-card img {
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

    .books {
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

    .book-card {
        background-color: var(--color-background-mute);
        transition: 0.3s;
        border-radius: 10px;
        color: var(--vt-c-white);

    }

    .book-card:hover {
        box-shadow: 0 0 10px 1px var(--gold);
        animation: blink 1.5s linear infinite;
        transform: scale(1.1)
    }

    .book-card-content {
        padding: 20px 20px;
    }

    .book-card-content h3 {
        padding: 0;
        margin: 0;
    }

    .book-card img {
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