export default function Notification({ width, height, fill }) {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 18 21"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path
                d="M7.14603 2.24799C7.29544 1.8787 7.55173 1.56244 7.88205 1.33976C8.21237 1.11707 8.60166 0.998108 9.00003 0.998108C9.3984 0.998108 9.78769 1.11707 10.118 1.33976C10.4483 1.56244 10.7046 1.8787 10.854 2.24799C12.3328 2.65467 13.6371 3.53554 14.5668 4.75532C15.4964 5.9751 16 7.46633 16 8.99998V13.697L17.832 16.445C17.9325 16.5956 17.9902 16.7706 17.999 16.9515C18.0078 17.1323 17.9673 17.3121 17.8819 17.4718C17.7965 17.6314 17.6694 17.7648 17.514 17.8579C17.3587 17.9509 17.1811 18 17 18H12.465C12.3446 18.8331 11.9281 19.5949 11.2917 20.1459C10.6554 20.6969 9.84179 21.0002 9.00003 21.0002C8.15827 21.0002 7.34469 20.6969 6.70833 20.1459C6.07197 19.5949 5.65543 18.8331 5.53503 18H1.00003C0.818985 18 0.641331 17.9509 0.486019 17.8579C0.330707 17.7648 0.203563 17.6314 0.118154 17.4718C0.0327439 17.3121 -0.00772782 17.1323 0.00105578 16.9515C0.00983938 16.7706 0.0675489 16.5956 0.168028 16.445L2.00003 13.697V8.99998C2.00003 5.77598 4.18003 3.05999 7.14603 2.24799ZM7.58603 18C7.68931 18.2926 7.88081 18.546 8.13415 18.7253C8.38749 18.9045 8.69019 19.0008 9.00053 19.0008C9.31087 19.0008 9.61357 18.9045 9.8669 18.7253C10.1202 18.546 10.3117 18.2926 10.415 18H7.58503H7.58603ZM9.00003 3.99999C7.67395 3.99999 6.40218 4.52677 5.46449 5.46445C4.52681 6.40213 4.00003 7.6739 4.00003 8.99998V14C4.00007 14.1975 3.94161 14.3906 3.83203 14.555L2.86903 16H15.13L14.167 14.555C14.0578 14.3905 13.9997 14.1974 14 14V8.99998C14 7.6739 13.4732 6.40213 12.5356 5.46445C11.5979 4.52677 10.3261 3.99999 9.00003 3.99999V3.99999Z"
                fill={fill}
            />
        </svg>
    );
}
