import React from 'react'


async function getData() {
      const res = await fetch('https://67d2db9090e0670699bf6786.mockapi.io/questions')
   
    return res.json()
  }


const page = async() => {
    const data = await getData()
  return (
    <>
    <h1>Questions fréquentes</h1>
    {data && data.length>0 && data.map((res,i)=> <div className="p-3 border bg-light" key={i}>
        <div className="card">
        <div  className="card-header"> {res.question}</div> 
    <div  className="card-body"> {res.reponse}</div> 
    </div>
    </div>
    )}
    </>
  )
}


export default page