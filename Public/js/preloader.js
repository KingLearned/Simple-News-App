const loader = document.querySelector('.pre_loader')

const bodyloader = document.querySelector('.bigwrap')
bodyloader.style.display = 'none'

setTimeout(() => {
    loader.style.display = 'none'
    bodyloader.style.display = 'block'
}, 500);