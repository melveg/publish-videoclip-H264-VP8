window.addEventListener('load', function() {

  //Start the opentok publisher
  let publisher;

  let videoclipPublisher;

  const session = OT.initSession(window.apiKey, window.sessionId);

  session.connect(window.token, (error) => {
    if (error) {
      console.error('Streamer OT Session Connection Failed');
      console.error(window.apiKey);
      console.error(window.sessionId);
      console.error(window.token);
      console.error(error.message);
      console.error(error);
      return;
    }
    console.log('Streamer OT Session Connected');
  });

  //Get the subscribers and load them in to the subscriber div
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
    }, function(error){
    });
  });

  function publishCamera() {
    publisher = OT.initPublisher('publisher', {
      insertMode: 'append',
      fitMode: 'contain',
    });

    //Transmit the publisher to the Opentok session
    session.publish(publisher, (error) => {
      if (error) {
        console.error('Streamer OT Publish Failed');
        console.error(error.message);
        console.error(error);
        return;
      }
      console.log('Streamer OT Published');
    });

  }

  //Publish videoclip
  function publishVideoClip(videoclipElement) {
    if(videoclipElement) {
      let videoStream;

      if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1)
        videoStream = videoclipElement.mozCaptureStream();
      else 
        videoStream = videoclipElement.captureStream();

      const videoTrack = videoStream.getVideoTracks()[0];
      const audioTrack = videoStream.getAudioTracks()[0];

      videoclipPublisher = OT.initPublisher('publisher', {
        insertMode: 'append',
        fitMode: 'contain',
        videoSource: videoTrack,
        audioSource: audioTrack,
        publishVideo: true,
        publishAudio: true
      });

      session.publish(videoclipPublisher, (error) => {
        if (error) {
          console.error('VideoClip OT Publish Failed');
          console.error(error.message);
          console.error(error);
          return;
        }
        console.log('VideoClip OT Published');
      });
    }
  }

  //UI actions
  const togglePublisher = document.querySelector("input#toggle-publisher");
  togglePublisher.addEventListener('click', function(){
    if(togglePublisher) {
      if(togglePublisher.value == 'Go Live'){
        publishCamera();
        togglePublisher.value = 'To Backstage';
      } else {
        if(publisher) {
          session.unpublish(publisher);
        }
        togglePublisher.value = 'Go Live';
      }
    }
  });
  const video = document.createElement("video");
  video.crossOrigin = "anonymous";
  video.setAttribute('style','width:300px !important;height:250px !important;');
  video.controls = true;
  const videoclipLoader = document.querySelector("div#videoclip-loader");
  const form = document.getElementsByTagName("form")[0];
  const videoclip = document.querySelector("input#videoclip");
  if(videoclipLoader) {
    videoclipLoader.appendChild(video);
  }
  video.onloadedmetadata = function() {
    video.play();
  };
  video.onplay = function() {
    publishVideoClip(video);
  }
  video.onended = function() {
    if(videoclipPublisher) {
      session.unpublish(videoclipPublisher);
    }
  }
  video.onpause = function() {
    if(videoclipPublisher) {
      session.unpublish(videoclipPublisher);
    }
  }

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if(videoclip && videoclip.value) {
      if(videoclipLoader && video) {
        video.src = videoclip.value;
      }
    }
  })

});