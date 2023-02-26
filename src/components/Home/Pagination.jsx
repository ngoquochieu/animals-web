function Pagination (props) {
    const {pagination, onPageChange} = props
    const {current_page, count_per_page, total_pages} = pagination
    function handlePageChange (newPage) {
        if(onPageChange) {
            onPageChange(newPage)
        }
    }
    return(
        <div>
            <button
                disabled={current_page === 1}
                onClick = {() => handlePageChange(current_page - 1)}
            >
                Prev
            </button>
            <button
                disabled={current_page >= total_pages}
                onClick = {() => handlePageChange(current_page + 1)}
            >
                Next
            </button>
        </div>
    )
}
export default Pagination