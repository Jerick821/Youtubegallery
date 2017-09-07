//upload videos to firebase
var Firebase = require('firebase');
var AppActions = require('../actions/AppActions');

module.exports = {
	saveVideo: function(video){
        console.log('API Called..');
        this.firebaseRef = new Firebase("https://ytgallery-f9f12.firebaseio.com/videos");
        this.firebaseRef.push(video);
    },
    
    getVideos: function(){
        this.firebaseRef = new Firebase("https://ytgallery-f9f12.firebaseio.com/videos");
        this.firebaseRef.once("value", function(snapshot){
            var videos = [];
            snapshot.forEach(function(childSnapshot){
                var video = {
                    id: childSnapshot.key(),
                    title: childSnapshot.val().title,
                    video_id: childSnapshot.val().video_id,
                    description: childSnapshot.val().description
                }
                videos.push(video);
                AppActions.receiveVideos(videos);
            });
        });
    },

    removeVideo: function(videoId){
        this.firebaseRef = new Firebase("https://ytgallery-f9f12.firebaseio.com/videos/"+videoId);
        this.firebaseRef.remove();
    }
}


