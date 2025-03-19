document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.copy-btn').forEach((btn) => {
        btn.addEventListener('click', () => {
            const text = btn.closest('div').querySelector('h5').innerText === 'Telefone' ? '123456789' : 'example@gmail.com';
            navigator.clipboard.writeText(text);
            alert('Copiado para a área de transferência!');
        });
    });
});