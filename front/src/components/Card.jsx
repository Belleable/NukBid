

function Card({goods}) {
    return (
        <>
            {goods.map((good, goodindex) => (
                <h1 key={goodindex}> {good.goodsID} </h1>
            ))}
        </>
    )
}

export default Card;