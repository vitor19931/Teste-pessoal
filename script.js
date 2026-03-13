// script.js

document.addEventListener('DOMContentLoaded', function() {
    // Navegação suave
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            targetSection.scrollIntoView({ behavior: 'smooth' });
        });
    });

    // Funcionalidades da galeria
    const selectAllBtn = document.getElementById('select-all');
    const deselectAllBtn = document.getElementById('deselect-all');
    const downloadBtn = document.getElementById('download-selected');
    const checkboxes = document.querySelectorAll('.select-photo');

    if (selectAllBtn) {
        selectAllBtn.addEventListener('click', function() {
            checkboxes.forEach(cb => cb.checked = true);
        });
    }

    if (deselectAllBtn) {
        deselectAllBtn.addEventListener('click', function() {
            checkboxes.forEach(cb => cb.checked = false);
        });
    }

    if (downloadBtn) {
        downloadBtn.addEventListener('click', function() {
            const selected = Array.from(checkboxes).filter(cb => cb.checked);
            if (selected.length === 0) {
                alert('Selecione pelo menos uma foto para baixar.');
                return;
            }

            selected.forEach(cb => {
                const src = cb.dataset.src;
                const name = cb.dataset.name;
                downloadImage(src, name);
            });
        });
    }

    // Função para baixar imagem
    function downloadImage(url, filename) {
        fetch(url)
            .then(response => response.blob())
            .then(blob => {
                const link = document.createElement('a');
                link.href = URL.createObjectURL(blob);
                link.download = filename;
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
                URL.revokeObjectURL(link.href);
            })
            .catch(err => console.error('Erro ao baixar:', err));
    }

    // Proteções de segurança
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        alert('Clique direito desabilitado para proteger as imagens.');
    });

    window.addEventListener('beforeprint', function() {
        alert('Captura de tela detectada. Downloads são permitidos apenas através do botão.');
    });

    document.addEventListener('keydown', function(e) {
        if (e.key === 'PrintScreen' || (e.ctrlKey && e.key === 'p')) {
            e.preventDefault();
            alert('Print screen bloqueado. Use o botão de download.');
        }
    });

    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
    });

    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
    });

    // Formulário de contato (simulado)
    const contactForm = document.querySelector('#contato form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            alert('Mensagem enviada! (Simulado)');
            this.reset();
        });
    }
});