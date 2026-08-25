document.addEventListener('DOMContentLoaded', () => {
    
    /* ==========================================================================
       1. MENU MOBILE (Abrir, fechar e trocar o ícone)
       ========================================================================== */
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    const menuIcon = mobileBtn.querySelector('i');

    // Abre/fecha o menu ao clicar no botão
    mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        // Alterna entre o ícone de hambúrguer (fa-bars) e o de fechar (fa-xmark)
        if (navMenu.classList.contains('active')) {
            menuIcon.classList.remove('fa-bars');
            menuIcon.classList.add('fa-xmark');
        } else {
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        }
    });

    // Fecha o menu automaticamente quando um link for clicado (mobile)
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            menuIcon.classList.remove('fa-xmark');
            menuIcon.classList.add('fa-bars');
        });
    });

   /* ==========================================================================
       2. HEADER DINÂMICO (Efeito Ilha Dinâmica)
       ========================================================================== */
    const header = document.querySelector('.header');
    
    window.addEventListener('scroll', () => {
        // window.innerHeight pega a altura exata da primeira tela.
        // Tiramos 50px só para o efeito acionar um milésimo antes de trocar de seção.
        if (window.scrollY > window.innerHeight - 50) { 
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    /* ==========================================================================
       3. ANIMAÇÃO DE TELEMETRIA (As barras crescem quando aparecem na tela)
       ========================================================================== */
    const bars = document.querySelectorAll('.bar');
    
    // Configura o observador para disparar quando 50% da seção estiver visível
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 
    };

    const barObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                
                // Define as larguras e transições dependendo de qual barra é
                if (bar.classList.contains('bar-stock')) {
                    bar.style.width = '65%';
                    bar.style.transition = 'width 1.2s cubic-bezier(0.25, 1, 0.5, 1)';
                } else if (bar.classList.contains('bar-tuned')) {
                    // Dá um pequeno delay na barra de performance para criar impacto visual
                    setTimeout(() => {
                        bar.style.width = '100%';
                        bar.style.transition = 'width 1.5s cubic-bezier(0.25, 1, 0.5, 1)';
                    }, 400);
                }
                
                // Para de observar a barra depois que ela já foi animada
                observer.unobserve(bar);
            }
        });
    }, observerOptions);

    // Zera a largura das barras no início e manda o observador ficar de olho nelas
    bars.forEach(bar => {
        bar.style.width = '0%';
        barObserver.observe(bar);
    });

        /* ==========================================================================
    CONTROLE DO MODAL DE SERVIÇOS
    ========================================================================== */
    const modal = document.getElementById('servicesModal');
    const openBtn = document.getElementById('openServicesModal');
    const closeBtn = document.getElementById('closeServicesModal');

    if (openBtn && modal && closeBtn) {
        // Abrir modal
        openBtn.addEventListener('click', () => {
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Trava a rolagem do fundo
        });

        // Fechar modal no botão X
        closeBtn.addEventListener('click', () => {
            modal.classList.remove('active');
            document.body.style.overflow = ''; // Libera a rolagem
        });

        // Fechar ao clicar fora da caixa do modal
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });

        // Fechar com a tecla ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                modal.classList.remove('active');
                document.body.style.overflow = '';
            }
        });
    }
     // --- LÓGICA DE ANIMAÇÃO AO SCROLLAR (REVEAL) ---
    const revealElements = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');
    
    const revealOptions = {
        threshold: 0.15, // Dispara quando 15% do elemento estiver visível
        rootMargin: "0px 0px -50px 0px" // Dispara um pouco antes do elemento chegar no limite inferior
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            }
            // Adiciona a classe que faz o elemento aparecer
            entry.target.classList.add('active');
            // Deixa de observar o elemento para a animação ocorrer apenas uma vez
            observer.unobserve(entry.target);
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

});