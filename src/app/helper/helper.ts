export module Helper {

  export const getLocationArray = function() {
    return {
      shared: false,
      hash: '',
      title: '',
      note: '',
      properties: {
        accesibility : 0,
        category: '',
        adress: '',
        type: '',
        wheater: {
          cloudy: false,
          foggy: false,
          rainy: false,
          sunny: false
        },
        seasons: {
          autumn: false,
          spring: false,
          summer: false,
          winter: false
        },
        images: JSON.stringify([])
      },
      geoLocation: {
        lat: 0,
        lng: 0
      }
    };
  }

  export const buildFormData = function(form, widthID) {
    var formData = new FormData();

    if (widthID) {
        formData.append("id", form.id);
    }
    formData.append("title", form.title);
    formData.append("type", form.properties.type);
    formData.append("category", form.properties.category);
    formData.append("accesibility", form.properties.accesibility);
    formData.append("lat", form.geoLocation.lat);
    formData.append("lng", form.geoLocation.lng);
    if (widthID) {
      formData.append("images", JSON.stringify(form.properties.images));
    } else {
      formData.append("images", form.properties.images);
    }
    formData.append("sunny", form.properties.wheater.sunny);
    formData.append("cloudy", form.properties.wheater.cloudy);
    formData.append("foggy", form.properties.wheater.foggy);
    formData.append("rainy", form.properties.wheater.rainy);
    formData.append("spring", form.properties.seasons.spring);
    formData.append("summer", form.properties.seasons.summer);
    formData.append("autumn", form.properties.seasons.autumn);
    formData.append("winter", form.properties.seasons.winter);
    formData.append("description", form.note);
    formData.append("shared", form.shared);
    formData.append("hash", form.hash);

    return formData;
  }

  export const buildImageObject = function(imageData) {
    var imageID = imageData.id;
    var sourceURL = imageData.source_url;
    var thumbSource;
    if (imageData.media_details.sizes.length > 0) {
        thumbSource = imageData.media_details.sizes.thumbnail.source_url;
    } else {
        thumbSource = sourceURL;
    }
    var tmp_obj = {
        id: imageID,
        large: sourceURL,
        thumb: thumbSource
    };
    return tmp_obj;
  }

  export const toDecimal = function(number) {
    return (
        number[0].numerator +
        number[1].numerator / (60 * number[1].denominator) +
        number[2].numerator / (3600 * number[2].denominator)
    );
}
}
