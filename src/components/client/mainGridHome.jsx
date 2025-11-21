
import Image from 'next/image'


const MainGridHome = () => {
  return (
<div className="container overflow-hidden">
  <div className="row gy-5">
    <div className="col-6">
      <div className="p-3 border bg-light">
        <Image
      src="https://res.cloudinary.com/dyv58oaan/image/upload/v1748002073/bruna-branco-t8hTmte4O_g-unsplash_fwbbjw.jpg"
      width={700}
      height={500}
      alt="Picture"
    />
    </div>
    </div>
    <div className="col-6">
      <div className="p-3 border bg-light">  
      <Image
      src="https://res.cloudinary.com/dyv58oaan/image/upload/v1746628910/cld-sample-4.jpg"
      width={700}
      height={500}
      alt="Picture"
    />
    </div>
    </div>
   </div>
</div>
  )
}


export default MainGridHome