(function() {
    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d'),
        video = document.getElementById('webcam');
    
    navigator.getMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    
    navigator.getMedia({
        video:true,
        audio:false
    }, function(stream){
        video.srcObject = stream;
        video.play();
    }, function(error){
        //error.code
    }
    );
    video.addEventListener('play',function()
                          {
        draw(this, context,640,480);
    },false);
    
    async function draw(video,context, width, height)
    {
        context.drawImage(video,0,0,width,height);
        const model = await blazeface.load();
        const returnTensors = false;
        const predictions = await model.estimateFaces(video, returnTensors);
          if (predictions.length > 0)
          {
           console.log(predictions);
           for (let i = 0; i < predictions.length; i++) {
           const start = predictions[i].topLeft;
           const end = predictions[i].bottomRight;
           var probability = predictions[i].probability;
           const size = [end[0] - start[0], end[0] - start[0]];
           // Render a rectangle over each detected face.
           context.beginPath();
           context.strokeStyle="green";
           context.lineWidth = "6";
           context.rect(start[0], start[1],size[0], size[0]);
           context.stroke();
           var prob = (probability[0]*100).toPrecision(5).toString();
           var text = prob+"%";
           var text = "Orang";
           context.fillStyle = "yellow";
           context.font = "15pt sans-serif";
           context.fillText(text,start[0]-100,start[1]+20);
            }
           }
        setTimeout(draw,250,video,context,width,height);
    }
})();
