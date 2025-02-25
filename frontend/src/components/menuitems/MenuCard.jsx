import React from 'react'

function MenuCard({item, refProp}) {
  return (
<div className="card bg-base-100 w-90 shadow-xl border border-gray-100" // max-h-[400px] "
ref={refProp}
>
{/* {item.imageUrl !== "" &&  ( */}

<figure>
    <img className='fit-cover rounded-t-lg max-h-[250px]'
      src={item.imageUrl !== "" ? item.imageUrl : "https://t3.ftcdn.net/jpg/02/68/55/60/360_F_268556012_c1WBaKFN5rjRxR2eyV33znK4qnYeKZjm.jpg"}//"https://archive.org/download/placeholder-image/placeholder-image.jpg"} //"https://placehold.co/550x350"}
      alt={item.name || "Menu Item"} 
      loading='lazy'/>
  </figure>
  
  {/* ) } */}
  <div className="card-body border-2">
    <h2 className="card-title">{item.name}</h2>
    <p>{item.description || ""}</p>
    <p>₹{item.price || "N/A"}</p>
    {/* <div className="card-actions justify-end">
      <button className="btn btn-primary">Buy Now</button>
    </div> */}

      {(item.tags.length !== 0 && (item.tags.length !== 0)) && (
        <div className="badge badge-soft badge-neutral">
          {item.tags.map((tag, index) => (
            <span key={index}>
              {tag}
            </span>
          ))}
        </div>
      )}
    
  </div>
</div>
  )
}

export default MenuCard