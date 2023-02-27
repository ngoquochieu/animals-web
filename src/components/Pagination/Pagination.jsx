function Pagination (props) {
    const {pagination, onPageChange} = props
    const {current_page, total_pages} = pagination
    
    function handlePageChange (newPage) {
        if(onPageChange) {
            onPageChange(newPage)
        }
    }

    return(
        <div className='pagination'>
            <div className="page">
                Page {current_page} of {total_pages} Pages
            </div>
            <div className="btn">
                <button 
                    className="btn-prev"
                    disabled={current_page === 1}
                    onClick = {() => handlePageChange(current_page - 1)}
                >
                    PREVIOUS
                </button>
                <button
                    className="btn-next"
                    disabled={current_page >= total_pages}
                    onClick = {() => handlePageChange(current_page + 1)}
                >
                    NEXT
                </button>
            </div>
            
        </div>
    )
}
export default Pagination