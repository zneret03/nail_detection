import "./badge.scss"

export default function Badge({children, count}){

    return(
        <div className="badge-wrapper">
            {count?.accuracy !== 0 && Object.keys(count).length && (
                <span>1</span>
            )}
            {children}
        </div>
    )
}