const useGenres = (selectedGenres) => {
    if (selectedGenres.length < 1) {
        return ""
    } else {
        const GenreIds = selectedGenres.map((g) => g.id);
        return GenreIds.reduce((acc, curr) => acc + ',' + curr);
    }
}

export default useGenres;