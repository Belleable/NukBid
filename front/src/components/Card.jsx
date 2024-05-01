

function Card({goodsName, goodsID}) {
    console.log("from card:  " + goodsName)
    return (
        
        
            <h3>{goodsName} and {goodsID}</h3>
            
        
    )
}

export default Card;