export function Pagination({totalPages, func}) {
    return (
        <ul class="pagination">
            {totalPages > 0 && Array.from(Array(totalPages), (e, i) => (
                <li 
                    key={`page-${i+1}`}
                    onClick={(e) => func(i+1)}
                >{i+1}</li>
            ))}
        </ul>
    )
}