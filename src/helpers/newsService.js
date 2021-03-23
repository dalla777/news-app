const newsApiUrl = 'https://newsapi.org/v2/everything'
const apiKey = 'a2d7385492214e739b0bac196fe5fef0'


export default function newsService(params = {}) {

  const queryString = Object.entries(params).reduce((accumulator, [key, value]) => value ? accumulator + `&${key}=${value}` : accumulator + '', '');

  return fetch(`${newsApiUrl}?apiKey=${apiKey}${queryString}`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        return [];
      }
    }).then(data => data);
}
