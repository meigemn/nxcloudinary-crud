'use client'


function dragOverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    const imgPreview = ev.target;
    const fileInput = ev.target.nextSibling;
    // console.dir(ev.target)

    if (ev.dataTransfer.items) {
        // Use DataTransferItemList interface to access the file(s)
        // console.log(...ev.dataTransfer.items);
        [...ev.dataTransfer.items].forEach((item, i) => {
            // If dropped items are files ...
            if (item.kind === "file") {
                const file = item.getAsFile();
                fileInput.files = ev.dataTransfer.files;  // IMPORTANTE: Copia imagen al input type='file'

                let reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onloadend = () => imgPreview.src = reader.result
            }
        });
    }
}


// img: Double click
export function dblclickHandler(ev) {
    const fileInput = ev.target.nextSibling;

    fileInput.click();
}


// input: Change
export function changeHandler(ev) {
    const imgPreview = ev.target.previousSibling;
    const fileInput = ev.target;

    if (fileInput.files && fileInput.files[0]) {

        var reader = new FileReader();
        reader.readAsDataURL(fileInput.files[0]);   // elegimos únicamente el primer archivo
        reader.onload = (e) => imgPreview.setAttribute("src", e.target.result);

    }
}


export default function InputImage({ children, img }) {
    return (
        <>
            <img
                id='imgPreview'
                src={img}
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                onDoubleClick={dblclickHandler}
                style={{
                    display: 'block',
                    aspectRatio: 1,
                    width: '324px',
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }} />
            <input
                type='file'
                name='file'
                accept='image/*'
                onChange={changeHandler}
                style={{ display: 'none' }} />

            {children}
        </>

    )
}

