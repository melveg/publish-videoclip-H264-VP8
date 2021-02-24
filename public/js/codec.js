window.addEventListener('load', function() {

  //Start the opentok publisher
  const publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    fitMode: 'contain',
  });

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
  });

  //Get the subscribers and load them in to the subscriber div
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, function(error){
      console.log(error.message);
    });
  });

  //UI actions
  const video = document.createElement("video");
  const videoclipLoader = document.querySelector("input#videoclip-loader");
  const form = document.getElementsByTagName("form")[0];
  const videoclip = document.querySelector("input#videoclip");
  videoclipLoader.appendChild(video);

  form.addEventListener("submit", function(event) {
    event.preventDefault();
    if(videoclip && videoclip.value) {
      if(videoclipLoader) {
        
      }
    }
  })

});