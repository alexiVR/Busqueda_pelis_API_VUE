const app = Vue.createApp({
    data(){
        return{
            title: "Api de peliculas en vue3",
            movieData: {},
            movieTitle: "Guardians of the Galaxy Vol. 2"
        }
    },
    mounted(){
        this.getMovie()
    },
    methods: {
        async getMovie(){
            const search = this.movieTitle.toLowerCase().replace(/ /g,"+");
            
        
            const data = await fetch(`http://www.omdbapi.com/?apikey=3144da03&t=${search}`)
            this.movieData = await data.json();
          
        }
    }
})