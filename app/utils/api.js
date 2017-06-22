import axios from 'axios';
import moment from 'moment';

var api_key = 'eb60f378a978e5e636e47501248e2f0e';

module.exports = {
  fetchMovies: function (filter, sort, page) {
    var curDate = moment(new Date()).format('YYYY-MM-DD');
    var encodedURI = window.encodeURI('https://api.themoviedb.org/3/discover/movie?sort_by=' + filter + '.' + sort + '&language=en-US&api_key=' + api_key + '&page=1&vote_count.gte=50&release_date.lte=' + curDate + '&page=' + page);
    return axios.get(encodedURI)
      .then(function (response) {
        return response.data;
      })
  },

  fetchGenres: function () {
    return axios.get(' https://api.themoviedb.org/3/genre/movie/list?api_key=' + api_key)
      .then(function (response) {
        return response.data.genres;
      })
  },

  fetchMovie: function (movieId) {
    return axios.get('https://api.themoviedb.org/3/movie/' + movieId + '?api_key=' + api_key + '&language=en-US&append_to_response=videos,credits,reviews,recommendations')
      .then(function (response) {
        return response.data;
      })
  },

  fetchProfilePic: function (profileId) {
    return axios.get('https://api.themoviedb.org/3/person/' + profileId + '/images?api_key=' + api_key)
      .then(function (response) {
        return response.data.profiles[0].file_path;
      })
  }
}