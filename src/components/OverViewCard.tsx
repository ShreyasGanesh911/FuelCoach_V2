import { motion } from 'framer-motion'
import React from 'react'
type Props = {name:string,data:string|number}
export default function OverViewCard(props:Props) {
  return (
    <div className=' px-3 py-2 overflow-y-hidden rounded-2 text-black ' style={{width:"15vw",backgroundColor:'white'}}>
            <h5 className="overflow-y-hidden table-font">{props.name}</h5>
            <motion.h2 initial={{x:-200}} transition={{type:'spring',delay:0.5}} viewport={{once:true}}  animate={{x:0}} className="overflow-y-hidden text-warning table-font py-1">{typeof(props.data)==='string'?props.data.charAt(0).toUpperCase()+props.data.slice(1):props.data}</motion.h2>
          </div>
  )
}
