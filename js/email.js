(function () {
    emailjs.init('TUT2kDWmAnJvQirzr');
})();

document.getElementById('myForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const button = document.getElementById('submitButton'); // Seleciona o botão de envio

    // Define o estado de envio
    button.classList.add('loading');
    button.disabled = true;
    button.innerHTML = 'Enviando... <div class="spinner-border spinner-border-sm" role="status"></div>';

    // Coleta os dados do formulário
    var formData = new FormData(this);
    var data = {};
    formData.forEach(function (value, key) {
        data[key] = value;
    });

    // Envia o e-mail via EmailJS
    emailjs.send('service_syxbvyl', 'template_c6w650e', data)
        .then(function (response) {
            console.log('E-mail enviado com sucesso', response);
            document.getElementById('myForm').reset();
            alert('Mensagem enviada com sucesso!');
        })
        .catch(function (error) {
            console.error('Erro ao enviar o e-mail', error);
            alert('Ocorreu um erro. Tente novamente.');
        })
        .finally(function () {
            // Restaura o estado original do botão em qualquer caso
            button.classList.remove('loading');
            button.disabled = false;
            button.innerHTML = 'Enviar';
        });
});