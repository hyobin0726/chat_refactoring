export default function Share({ onClick }: { onClick: () => void }) {
    return (
        <div onClick={onClick} className="mx-3 p-1">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                    d="M8.55286 10.1142C9.59439 11.1557 9.59439 12.8443 8.55286 13.8859C7.51133 14.9274 5.82268 14.9274 4.78115 13.8859C3.73962 12.8443 3.73962 11.1557 4.78115 10.1142C5.82268 9.07263 7.51133 9.07263 8.55286 10.1142"
                    stroke="#869AA9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19.2189 4.78115C20.2604 5.82268 20.2604 7.51133 19.2189 8.55286C18.1773 9.59439 16.4887 9.59439 15.4472 8.55286C14.4056 7.51133 14.4056 5.82268 15.4472 4.78115C16.4887 3.73962 18.1773 3.73962 19.2189 4.78115"
                    stroke="#869AA9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M19.2189 15.4472C20.2604 16.4887 20.2604 18.1773 19.2189 19.2189C18.1773 20.2604 16.4887 20.2604 15.4472 19.2189C14.4056 18.1773 14.4056 16.4887 15.4472 15.4472C16.4887 14.4056 18.1773 14.4056 19.2189 15.4472"
                    stroke="#869AA9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9.04004 10.8101L14.96 7.8501"
                    stroke="#869AA9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
                <path
                    d="M9.04004 13.1899L14.96 16.1499"
                    stroke="#869AA9"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        </div>
    )
}
