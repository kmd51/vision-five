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

   예:
   ?card=001 → answers/001.jpg
   ?card=002 → answers/002.jpg
======================================== */

if (cardNumber) {

    answerBox.style.display = "block";


    cardNumberText.textContent =
        "CARD " + cardNumber;


    answerImage.src =
        "answers/" +
        cardNumber +
        ".jpg";


    /* 이미지가 없는 카드 번호일 때 */

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
   갤러리
======================================== */

const gallery =
    document.querySelector(
        ".gallery-grid"
    );


/*
   기존 HTML의 gallery-item들을
   자동으로 3개의 열에 배치한다.
*/

if (gallery) {

    const items =
        Array.from(
            gallery.querySelectorAll(
                ".gallery-item"
            )
        );


    gallery.innerHTML = "";


    const columns = [];


    for (
        let i = 0;
        i < 3;
        i++
    ) {

        const column =
            document.createElement(
                "div"
            );


        column.className =
            "gallery-column";


        columns.push(column);


        gallery.appendChild(
            column
        );

    }


    /*
       사진을 순서대로
       1 → 2 → 3 → 1 → 2 → 3
       형태로 배치
    */

    items.forEach(
        function (item, index) {

            const columnIndex =
                index % 3;


            columns[columnIndex]
                .appendChild(item);

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


/* ========================================
   이미지 클릭
======================================== */

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


/* ========================================
   모달 닫기
======================================== */

function closeModal() {

    imageModal.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* ========================================
   닫기 버튼
======================================== */

modalClose.addEventListener(
    "click",
    function () {

        closeModal();

    }
);


/* ========================================
   배경 클릭
======================================== */

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


/* ========================================
   ESC 키
======================================== */

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