export default {
    example(cb) {
        axios.get(window.SETTINGS.API_BASE_PATH + 'categories?sort=name&hide_empty=true&per_page=50')
            .then(response => {
                cb(response.data.filter(c => c.name !== "Uncategorized"))
            })
            .catch(e => {
                cb(e)
            })
    },

    toDecimal(number) {
        return (
            number[0].numerator +
            number[1].numerator / (60 * number[1].denominator) +
            number[2].numerator / (3600 * number[2].denominator)
        );
    },

    getIconPaths() {
        return window.SETTINGS.THEMEURL + '/dist/assets/img/marker.svg';
    }
}