document.addEventListener('DOMContentLoaded', () => {
    // Selecciona todos los enlaces
    document.querySelectorAll('a').forEach(link => {
        //link.target = '_blank';
        link.rel = 'noreferrer';
    });
    
    // Para los enlaces que se generen dinámicamente en el preview
    const observer = new MutationObserver(() => {
        document.querySelectorAll('#preview a').forEach(link => {
            //link.target = '_blank';
            link.rel = 'noreferrer';
        });
    });
    
    // Observa cambios en el preview
    observer.observe(document.querySelector('#preview'), {
        childList: true,
        subtree: true
    });
});