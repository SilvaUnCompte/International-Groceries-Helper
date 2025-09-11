
function newPopup(text, popup_type) {
    let popup = document.getElementsByClassName("popup")[0];    // Test if popup already exists
    if (popup != undefined) { popup.remove(); }                 // If it does, remove it

    document.body.insertAdjacentHTML("beforeEnd",`
        <div class="popup ${popup_type}">
            <p class=popup-title>${popup_type.toUpperCase()}</p>
            <span class="close">&times;</span>
            <p>${text}</p>
        </div>`);

    popup = document.getElementsByClassName("popup")[0];        // Get the new popup
    let close = document.getElementsByClassName("close")[0];    // Get the close button

    popup_place();                                              // Place the popup at the top of the page
    
    close.onclick = () => delete_popup(popup);
    setTimeout(() => {
        delete_popup(popup);
    }, 5000);
}

function delete_popup(popup) {
    popup.style.animation = "popup-hide 0.6s ease forwards";
    setTimeout(() => {
        popup.remove();
    }, 600);
}

function popup_place() {
    let popup = document.getElementsByClassName("popup")[0];
    if (popup) {
        popup.style.top = `${window.scrollY+10}px`;
    }
}

window.addEventListener('scroll', popup_place);

export {
    newPopup
};