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
    },

    buildFormData(form,widthID) {
        var formData = new FormData();

        if(widthID) {
            formData.append("id",form.id);
        }
        formData.append("title", form.title);
        formData.append("type", form.type);
        formData.append("category", form.category);
        formData.append("accesibility", form.accessibility);
        formData.append("lat", form.latitude);
        formData.append("lng", form.longitude);
        formData.append("images", JSON.stringify(form.images));
        formData.append("sunny", form.sunny);
        formData.append("cloudy", form.cloudy);
        formData.append("foggy", form.foggy);
        formData.append("rainy", form.rainy);
        formData.append("spring", form.spring);
        formData.append("summer", form.summer);
        formData.append("autumn", form.autumn);
        formData.append("winter", form.winter);
        formData.append("description", form.description);

        return formData;
    },

    buildMediaData(fileInput) {
        var formData = new FormData();
        formData.append("action", "upload-attachment");
        formData.append("async-upload", fileInput);
        formData.append("name", fileInput.name);

        formData.append("_wpnonce", window.SETTINGS.NONCE);

        return formData;
    },

    buildImageObject(imageData) {
        var tmp_obj = {
            id: imageData.id,
            large: imageData.sizes.full.url,
            thumb: imageData.sizes.thumbnail.url
        };
        return tmp_obj;
    },

    getCurrentLocation(cb) {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                cb(position.coords.longitude,position.coords.latitude);
            });
        } else {
            console.log('Geolocation is not supported by this browser.');
        }
    },

    createTranslatedTypeObject(industry, historic, panorama, sunrise, sunset, outdoor, architecture, monument) {

        var type =  [{
            text: "Industry",
            value: "industry",
        },
        {
            text: "Historic",
            value: "historic"
        },
        {
            text: "Panorama",
            value: "panorama"
        },
        {
            text: "Sunrise",
            value: "sunrise"
        },
        {
            text: "Sunset",
            value: "sunset"
        },
        {
            text: "Outdoor",
            value: "outdoor"
        },
        {
            text: "Architecture",
            value: "architecture"
        },
        {
            text: "Monument",
            value: "monument"
        }
    ];

        for (var index = 0; index < type.length; index++) {
            var element = type[index];
            if (element.value === 'industry') {
                element.text = industry;
            }

            if (element.value === 'historic') {
                element.text = historic;
            }

            if (element.value === 'panorama') {
                element.text = panorama;
            }

            if (element.value === 'sunrise') {
                element.text = sunrise;
            }

            if (element.value === 'sunset') {
                element.text = sunset;
            }

            if (element.value === 'outdoor') {
                element.text = outdoor;
            }

            if (element.value === 'architecture') {
                element.text = architecture;
            }

            if (element.value === 'monument') {
                element.text = monument;
            }


        }

        return type;

    },

    createTranslatedCategoryObject(building, landscape, urban, water) {

        var category = [{
                text: "",
                value: "building"
            },
            {
                text: "",
                value: "landscape"
            },
            {
                text: "",
                value: "urban"
            },
            {
                text: "",
                value: "water"
            }
        ]

        for (var index = 0; index < category.length; index++) {
            var element = category[index];


            if (element.value === 'building') {
                element.text = building;
            }

            if (element.value === 'landscape') {
                element.text = landscape;
            }

            if (element.value === 'urban') {
                element.text = urban;
            }

            if (element.value === 'water') {
                element.text = water;
            }


        }

        return category;

    },

    createSuccessMessage(elementRoot,messageText, timeout) {
        elementRoot.$children[0]._data.successTimeout = timeout;
        elementRoot.$children[0]._data.successMessageText = messageText;
        elementRoot.$children[0]._data.successMessage = true;
    },

    createErrorMessage(elementRoot,messageText, timeout) {
        elementRoot.$children[0]._data.errorTimeout = timeout;
        elementRoot.$children[0]._data.errorMessageText = messageText;
        elementRoot.$children[0]._data.errorMessage = true;
    }

}