export default {
    removeHTML(string) {
        var regex = /(<([^>]+)>)/ig;
        return string.replace(regex, "");
    },
    getImageBlob(imageURL, cb) {
        var oReq = new XMLHttpRequest();
        oReq.open("GET", imageURL, true);
        oReq.responseType = "blob";

        oReq.onreadystatechange = function() {
            if (oReq.readyState === 4) {
                console.log(oReq.response); 
                var file = new File([oReq.response], 'test.png');
                cb(file);
            }
        }
        oReq.send(null);
    },
    
}