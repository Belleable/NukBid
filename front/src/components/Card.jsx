

function Card({ goods, deletable = false }) {
    return (
        <>
            {goods.map((good, goodindex) => (
                <div key={goodindex}>
                    <h1>{good._id}</h1>
                    <img src={`data:${good.image.contentType};base64,${good.image.data}`} alt="Product" />
                    <p>{good.image.contentType}</p>
                </div>
            ))}
        </>
    );
}

export default Card;
