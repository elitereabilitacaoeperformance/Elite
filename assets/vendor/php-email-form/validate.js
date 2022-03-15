/**
* PHP Email Form Validation - v3.1
* URL: https://bootstrapmade.com/php-email-form/
* Author: BootstrapMade.com
*/
(function () {
  "use strict";

  let forms = document.querySelectorAll('.php-email-form');

  forms.forEach(function (e) {
    e.addEventListener('submit', function (event) {
      event.preventDefault();

      let thisForm = this;

      thisForm.querySelector('.loading').classList.add('d-block');
      thisForm.querySelector('.error-message').classList.remove('d-block');
      thisForm.querySelector('.sent-message').classList.remove('d-block');

      var obj = {};
      var formData = new FormData(thisForm);
      for (var key of formData.keys()) {
        const content = formData.get(key);
        obj[key] = formData.get(key);
        if (!content)
          return
      }
      console.log(obj)
      sendMessage(thisForm, obj);
    });
  });

  function sendMessage(thisForm, obj) {
    const subject = obj.name + " - " + obj.subject;
    const message = `
    <span><b>Email:</b> ${obj.email} </span>
    <br> 
    <span><b>Nome:</b> ${obj.name}</span>
    <br> 
    <span style="white-space: pre-wrap">Mensagem:\n\t ${obj.message}</span>
    <br> 
    <a href="mailto:${obj.email}">Responder</a>
    `
    thisForm.querySelector('.loading').classList.add('d-block');
    Email.send({
      SecureToken: "895b2332-0b6e-4ba4-8681-7085b5d446c6",
      From: 'geral@elitereabilitacaoeperformance.com',
      To: 'elitereabilitacaoeperformance@gmail.com',
      Subject: subject,
      Body: message
    })
      .then(response => {
        console.log(response)
        if (response == 'OK') {
          thisForm.querySelector('.loading').classList.remove('d-block');
          thisForm.querySelector('.sent-message').classList.add('d-block');
          thisForm.reset();
        } else {
          throw new Error(`${response}`);
        }
      })
      .catch((error) => {
        displayError(thisForm, error);
      });
  }

  function displayError(thisForm) {
    thisForm.querySelector('.loading').classList.remove('d-block');
    thisForm.querySelector('.error-message').classList.add('d-block');
  }

})();
