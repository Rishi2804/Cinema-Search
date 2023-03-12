import axios from "axios";
import { useEffect, useState } from "react";
import ContentView from "../../components/ContentView/ContentView";
import Genres from "../../components/Genres";
import CustomPagination from "../../components/Pagination/CustomPagination";
import useGenres from "../../hooks/useGenres";

const Series = () => {
    
    const [page, setPage] = useState(1);
    const [content, setContent] = useState([]);
    const [numOfPages, setNumOfPages] = useState();
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [genres, setGenres] = useState([]);
    const genreforURL = useGenres(selectedGenres);

    const fetchSeries = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&page=${page}&with_genres=${genreforURL}`
            );

        setContent(data.results);
        setNumOfPages(data.total_pages > 500 ? 500 : data.total_pages);
    }

    useEffect(() => {
        fetchSeries()
        // eslint-disable-next-line
    }, [page, genreforURL]);


    return (
        <div>
            <span className="pageTitle">TV Series</span>
            <Genres 
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <div className="trending">
                {
                    content && content.map((c) => (
                        <ContentView 
                            key={c.id} 
                            id={c.id} 
                            poster={c.poster_path} 
                            title={c.title || c.name} 
                            date={c.first_air_date || c.release_date} 
                            media_type='tv'
                            rating={c.vote_average}
                        />))
                }
            </div>
            {numOfPages > 1 && (
            <CustomPagination setPage={setPage} numOfPages={numOfPages} />
            )}
        </div>
    )
}

export default Series;