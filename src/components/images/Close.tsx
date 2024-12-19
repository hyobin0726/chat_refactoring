interface CloseProps {
    className?: string
    onClick?: () => void
}

export default function Close({ className, onClick }: CloseProps) {
    return (
        <div onClick={onClick} className={className}>
            <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M17.1371 18.0088C17.0226 18.009 16.9092 17.9865 16.8035 17.9427C16.6977 17.8989 16.6016 17.8345 16.5208 17.7534L1.26613 2.49869C1.18288 2.41828 1.11648 2.3221 1.07079 2.21575C1.02511 2.1094 1.00104 1.99503 1.00003 1.87929C0.999027 1.76354 1.02109 1.64878 1.06492 1.54165C1.10875 1.43452 1.17349 1.33715 1.25533 1.25531C1.33718 1.17346 1.4345 1.10877 1.54162 1.06494C1.64875 1.02111 1.76354 0.999027 1.87929 1.00003C1.99503 1.00104 2.10942 1.02511 2.21578 1.07079C2.32213 1.11648 2.4183 1.1829 2.49871 1.26616L17.7534 16.5209C17.8751 16.6428 17.958 16.798 17.9915 16.967C18.0251 17.136 18.0078 17.3112 17.9418 17.4703C17.8759 17.6295 17.7642 17.7655 17.621 17.8613C17.4778 17.9571 17.3094 18.0086 17.1371 18.0088Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="0.5"
                />
                <path
                    d="M1.88187 18.0092C1.70949 18.0092 1.541 17.9581 1.39769 17.8623C1.25437 17.7665 1.14267 17.6304 1.07671 17.4711C1.01075 17.3119 0.993501 17.1367 1.02712 16.9676C1.06074 16.7985 1.14374 16.6432 1.26561 16.5213L16.5203 1.26662C16.6847 1.10784 16.9049 1.0199 17.1335 1.02188C17.362 1.02387 17.5806 1.11554 17.7423 1.27716C17.9039 1.43878 17.9956 1.65747 17.9976 1.88603C17.9995 2.11458 17.9117 2.33475 17.7529 2.49915L2.49816 17.7539C2.41737 17.835 2.32131 17.8993 2.21554 17.9432C2.10977 17.987 1.99637 18.0094 1.88187 18.0092Z"
                    fill="black"
                    stroke="black"
                    strokeWidth="0.5"
                />
            </svg>
        </div>
    )
}