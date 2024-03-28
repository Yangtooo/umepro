// 創造選擇器
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

// 在滾動網頁時觸發的功能
window.onscroll = () => {
    sections.forEach(sec => {
        // 獲取當前視窗的垂直滾動位置
        let top = window.scrollY;
        // 調整元素的偏移量
        let offset = sec.offsetTop - 150;
        // 獲取元素的高度
        let height = sec.offsetHeight;
        
        if (top >= offset && top < offset + height) {
            navLinks.forEach(link => {
                link.classList.remove('active');
            });
            // 獲取 sec 的 ID
            let id = sec.getAttribute('id');
            // 在選擇導航連結時使用 id
            document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
        }
    });
};
// 切換
menuIcon.onclick = () =>{
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
}

