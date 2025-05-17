function CategoryPreview({ imgUrl, categoryName, id=""}) {
    return (
        <div className="category_preview">
            <img src={imgUrl}/>
            <div className="category_preview_separator" />
            <span id={id || undefined}>{categoryName}</span>
        </div>
     );
}

export default CategoryPreview;