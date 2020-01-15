
import ImageAttributes from "../Image/ImageAttributes";

function ImageList({ products, user }) {
  const handleClick = product => {
    const modal = document.getElementById("myModal");

    //Get the image and insert it inside the modal - use its "alt" text as a caption
    const modalImg = document.getElementById("img01");
    modal.style.display = "block";
    modalImg.src = product.mediaUrl;
  };

  const handleSpanClick = () => {
    const modal = document.getElementById("myModal");
    //Get the image and insert it inside the modal - use its "alt" text as a caption
    modal.style.display = "none";
  };

  function mapProductsToItems(products) {
    return products.map(product => (
      <>
        <div className="card" key={product._id}>
          <img
            src={product.mediaUrl}
            className="myImg"
            onClick={() => handleClick(product)}
          />
          {user && <ImageAttributes  key={product._v}  user={user} {...product} />}
        </div>
      </>
    ));
  }

  return (
    <>
      <div className="images">{mapProductsToItems(products)}</div>

      <div id="myModal" className="modal">
        <span className="close" onClick={handleSpanClick}>
          Close
        </span>{" "}
        <img className="modal-content" id="img01" />
      </div>
      <div className="clear"></div>
    </>
  );
}
export default ImageList;
