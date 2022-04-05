      //Productos
      const titulo = document.getElementById('inputtitulo');
      const precio = document.getElementById('inputprecio');
      const thumbnail = document.getElementById('inputthumbnail');

      //Chat
      const formchat = document.getElementById('id-form-chat');
      const mail = document.getElementById('id-mail');
      const message = document.getElementById('id-chat-message');

      formchat.addEventListener('submit', e =>{
        e.preventDefault();
        let time = new Date().toUTCString();
        time = time.split(' ').slice(0, 5).join(' ');
        saveMessage(mail.value, message.value, time);
        console.log("desde el boton enviar mensajes")
      })