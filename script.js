/*
========================================
VISION FIVE
QR CARD IMAGE ANSWER SYSTEM
========================================
*/


/* ========================================
   URL에서 카드 번호 확인
======================================== */

const urlParams =
    new URLSearchParams(
        window.location.search
    );


const cardNumber =
    urlParams.get("card");


/* ========================================
   정답 화면 요소
======================================== */

const answerBox =
    document.getElementById(
        "answer-box"
    );


const cardNumberText =
    document.getElementById(
        "card-number"
    );


const answerImage =
    document.getElementById(
        "answer-image"
    );


/* ========================================
   QR 카드 정답 이미지 표시
======================================== */

if (cardNumber) {

    answerBox.style.display = "block";

    cardNumberText.textContent =
        "CARD " + cardNumber;

    answerImage.src =
        "answers/" +
        cardNumber +
        ".jpg";

    answerImage.addEventListener(
        "error",
        function () {

            answerImage.style.display =
                "none";

            const message =
                answerBox.querySelector(
                    ".answer-message"
                );

            if (message) {
                message.textContent =
                    "등록된 정답 이미지가 없습니다.";
            }

        },
        { once: true }
    );

}


/* ========================================
   반응형 갤러리
======================================== */

const gallery =
    document.querySelector(
        ".gallery-grid"
    );


if (gallery) {

    const items =
        Array.from(
            gallery.querySelectorAll(
                ".gallery-item"
            )
        );

    let currentColumnCount = 0;


    function getGalleryColumnCount() {

        if (window.innerWidth <= 380) {
            return 1;
        }

        if (window.innerWidth <= 900) {
            return 2;
        }

        return 3;

    }


    function buildGallery() {

        const columnCount =
            getGalleryColumnCount();

        if (
            columnCount ===
            currentColumnCount
        ) {
            return;
        }

        currentColumnCount =
            columnCount;

        gallery.innerHTML = "";

        const columns = [];

        for (
            let i = 0;
            i < columnCount;
            i++
        ) {

            const column =
                document.createElement(
                    "div"
                );

            column.className =
                "gallery-column";

            columns.push(column);

            gallery.appendChild(column);
        }


        items.forEach(
            function (item, index) {

                const columnIndex =
                    index %
                    columnCount;

                columns[columnIndex]
                    .appendChild(item);

            }
        );

    }

    buildGallery();

    window.addEventListener(
        "resize",
        buildGallery
    );

}


/* ========================================
   갤러리 이미지 확대
======================================== */

const galleryImages =
    document.querySelectorAll(
        ".gallery-item img"
    );


const imageModal =
    document.getElementById(
        "image-modal"
    );


const modalImage =
    document.getElementById(
        "modal-image"
    );


const modalClose =
    document.getElementById(
        "modal-close"
    );


galleryImages.forEach(
    function (image) {

        image.addEventListener(
            "click",
            function () {

                modalImage.src =
                    image.src;

                modalImage.alt =
                    image.alt;

                imageModal.classList.add(
                    "active"
                );

                document.body.style.overflow =
                    "hidden";
            }
        );

    }
);


function closeModal() {

    imageModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";
}


modalClose.addEventListener(
    "click",
    function () {
        closeModal();
    }
);


imageModal.addEventListener(
    "click",
    function (event) {

        if (
            event.target ===
            imageModal
        ) {
            closeModal();
        }

    }
);


document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape"
        ) {
            closeModal();
        }

    }
);
