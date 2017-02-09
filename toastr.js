(function(root, factory) {
  try {
    // commonjs
    if (typeof exports === 'object') {
      module.exports = factory();
    // global
    } else {
      root.VanillaToasts = factory();
    }
  } catch(error) {
    console.log('Isomorphic compatibility is not supported at this time for VanillaToasts.')
  }
})(this, function() {

  // Esperamos a DOM carregar
  if (document.readyState === 'complete') {
    init();
  } else {
    window.addEventListener('DOMContentLoaded', init);
  }

  // Criamos o objeto VanillaToasts
  VanillaToasts = {
    // Caso a criação ocorra antes da DOM estar pronta:
    create: function() {
      console.error([
        'DOM has not finished loading.',
        '\tInvoke create method when DOM\s readyState is complete'
      ].join('\n'))
    }
  };
  var autoincrement = 0;

  // Inicialização
  function init() {
    var container = document.createElement('div');
    container.id = 'vanillatoasts-container';
    document.body.appendChild(container);

    // @Override
    // Substituimos o conteúdo do método create quando a DOM finalizar o load
    VanillaToasts.create = function(options) {
      var toast = document.createElement('div');
      toast.id = ++autoincrement;
      toast.id = 'toast-' + toast.id;
      toast.className = 'vanillatoasts-toast';

      // Título
      if (options.title) {
        var h4 = document.createElement('h4');
        h4.className = 'vanillatoasts-title';
        h4.innerHTML = options.title;
        toast.appendChild(h4);
      }

      // Conteúdo
      if (options.text) {
        var p = document.createElement('p');
        p.className = 'vanillatoasts-text';
        p.innerHTML = options.text;
        toast.appendChild(p);
      }

      // Ícone
      if (options.icon) {
        var img = document.createElement('img');
        img.src = options.icon;
        img.className = 'vanillatoasts-icon';
        toast.appendChild(img);
      }

      // O que acontece ao clicar (callback)
      if (typeof options.callback === 'function') {
        toast.addEventListener('click', options.callback);
      }

      // Toast api
      toast.hide = function() {
        toast.className += ' vanillatoasts-fadeOut';
        toast.addEventListener('animationend', removeToast, false);
      };

      // Autohide
      if (options.timeout) {
        setTimeout(toast.hide, options.timeout);
      }

      if (options.type) {
        toast.className += ' vanillatoasts-' + options.type;
      }

      toast.addEventListener('click', toast.hide);
      toast.setAttribute("role", "alert");

      function removeToast() {
        document.getElementById('vanillatoasts-container').removeChild(toast);
      }

      document.getElementById('vanillatoasts-container').appendChild(toast);
      return toast;

    }
  }

  return VanillaToasts;
  // Você pode ver mais detalhes no repositório do criador, Alex Kvazos: https://github.com/AlexKvazos/VanillaToasts
});
