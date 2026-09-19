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
   QR 정답 이미지
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


if (
    cardNumber &&
    answerBox &&
    cardNumberText &&
    answerImage
) {

    answerBox.style.display =
        "block";

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

        }
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

                if (
                    !imageModal ||
                    !modalImage
                ) {
                    return;
                }

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


/* ========================================
   모달 닫기
======================================== */

function closeModal() {

    if (!imageModal) {
        return;
    }

    imageModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


if (modalClose) {

    modalClose.addEventListener(
        "click",
        closeModal
    );

}


if (imageModal) {

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

}


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
