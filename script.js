// --- IMAGE LIST FOR ALL ITEMS ---
const itemImages = {
    "Low Tier PC": "https://techmatched.pk/wp-content/uploads/2025/02/Darkflash-DY470-Pink-Front-1.webp",
    "Mid Tier PC": "https://techmatched.pk/wp-content/uploads/2025/02/Darkflash-DY470-Pink-Front-1.webp",
    "High End PC": "https://techmatched.pk/wp-content/uploads/2025/02/Darkflash-DY470-Pink-Front-1.webp",

    "PS4": "https://www.esrb.org/wp-content/uploads/2019/05/ps4.png",
    "PS4 Pro": "https://gmedia.playstation.com/is/image/SIEPDC/ps4-pro-product-thumbnail-01-en-14sep21?$facebook$",
    "PS5": "https://gmedia.playstation.com/is/image/SIEPDC/ps5-product-thumbnail-01-en-14sep21?$facebook$",

    "Xbox 360": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/Xbox_360_S.png/1091px-Xbox_360_S.png",
    "Xbox One": "https://xboxwire.thesourcemediaassets.com/sites/2/xbox_consle_sensr_controllr_f_transbg_rgb_2013.png",
    "Xbox Series X": "https://cms-assets.xboxservices.com/assets/bc/40/bc40fdf3-85a6-4c36-af92-dca2d36fc7e5.png?n=642227_Hero-Gallery-0_A1_857x676.png",

    // Indoor Games
    "Table Tennis": "https://de.cornilleau.com/7441-xlarge_default/540-ittf-table.jpg",
    "Chess": "https://alrakham.com/wp-content/uploads/2023/06/image_50453249-scaled.jpg",
    "Foosball": "https://leah.pk/cdn/shop/files/Hf545822bac344c3e960fcb5c993d0d23f_e2b9e4ef-6c34-48d6-9be2-aac5c6b3edfa.png?v=1758617917",

    "Snooker": "https://www.abcsnooker.co.uk/images/virtuemart/product/star-table-full-sized.jpg",
    "8 Ball": "https://unitedking.co.za/wp-content/uploads/2023/09/header.png",
    "Carrom": "https://www.cosco.in/uploads/products/main_image/carrom_emarald_front_77069256886.png"
};

// --- POPUP OPEN FUNCTION ---
function openPopup(itemName) {
    document.getElementById("popup-title").textContent = itemName;

    // Load the correct image based on item name
    document.getElementById("popup-img").src = itemImages[itemName] || "";

    document.getElementById("popup-desc").textContent = "You selected " + itemName;
    document.getElementById("popup-bg").style.display = "flex";
}

// --- POPUP CLOSE FUNCTION ---
function closePopup() {
    document.getElementById("popup-bg").style.display = "none";
}

// --- BOOK FUNCTION ---
function bookItem() {
    let itemName = document.getElementById("popup-title").textContent;

    // Redirect to booking page where user will complete booking and enter hours
    const params = new URLSearchParams();
    params.set('item', itemName);
    window.location.href = 'booking.html?' + params.toString();
}

// --- BOOKING PAGE HANDLER ---
(function() {
    function getQueryParam(name) {
        const params = new URLSearchParams(window.location.search);
        return params.get(name) || '';
    }

    document.addEventListener('DOMContentLoaded', function() {
        const form = document.getElementById('booking-form');
        if (!form) return; // not on booking page

        const serviceInput = document.getElementById('service');
        const item = getQueryParam('item');
        if (item) serviceInput.value = item;

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            // Clear errors
            document.getElementById('err-name').textContent = '';
            document.getElementById('err-email').textContent = '';
            document.getElementById('err-phone').textContent = '';
            document.getElementById('err-hours').textContent = '';

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const phone = document.getElementById('phone').value.trim();
            const hours = document.getElementById('hours').value.trim();
            const bookingDateStr = document.getElementById('date').value.trim();

            let ok = true;
            if (!name) { 
                document.getElementById('err-name').textContent = 'Please enter your name.'; 
                ok = false; 
            }

            //VALDATING EMAIL
            // Email must contain '@' and '.com'
            if (!(email.includes('@') && email.toLowerCase().includes('.com'))) {
                document.getElementById('err-email').textContent = 'Enter a valid email (must include "@" and ".com").'; ok = false;
            }

            //VALIDATING PHONE
            //Phone must be exactly 11 digits and only digits
            if (!/^\d{11}$/.test(phone)) {
                document.getElementById('err-phone').textContent = 'Phone number must be 11 digits.';
                ok = false;
            }

            //VALIDATING HOURS
            const hrs = Number(hours);
            if (!Number.isInteger(hrs) || hrs < 1 || hrs > 24) {
                document.getElementById('err-hours').textContent = 'Hours must be an integer between 1 and 24.'; ok = false;
            }

            //VALIDATING DATE
            let bookingDate = new Date(bookingDateStr);
            // Get today's date (without time)
            let today = new Date();
            today.setHours(0, 0, 0, 0); // set time to midnight so we only compare dates
            if (bookingDateStr === "") {
                document.getElementById('err-date').textContent = 'Please select a booking date.';
                ok = false;
            } else if (bookingDate < today) {
                document.getElementById('err-date').textContent = 'Booking date cannot be in the past.';
                ok = false;
            } else {
                document.getElementById('err-date').textContent = '';
            }

            if (!ok) return;
            // Simple success flow — show a short summary and disable form
            const svc = (serviceInput && serviceInput.value) || getQueryParam('item') || '';
            const success = document.getElementById('success');
            if (svc) {
                success.textContent = `Booking submitted — ${svc} for ${hrs} hour(s). Thank you!`;
            } else {
                success.textContent = 'Booking submitted — thank you!';
            }
            success.style.display = 'block';
            form.querySelectorAll('input, button').forEach(el => el.disabled = true);
        });
    });
})();
