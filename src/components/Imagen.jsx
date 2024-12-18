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



export default function Imagen({ children, img }) {
    return (
        <form id="preview" >
            <img
                id='imgPreview'
                src={img}
                onDrop={dropHandler}
                onDragOver={dragOverHandler}
                style={{
                    display: 'block',
                    aspectRatio: 1,
                    width: '324px',
                    height: '200px',
                    objectFit: 'cover',
                    objectPosition: 'center'
                }} />

            {children}
        </form>

    )
}

