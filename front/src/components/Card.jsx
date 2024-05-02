

function Card({goods, deletable = false}) {
    return (
        <>
            {goods.map((good, goodindex) => (
                <h1 key={goodindex}> {good._id} </h1>
            ))}
        </>
    )
}

export default Card;