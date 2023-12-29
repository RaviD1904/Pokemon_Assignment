import React,{useState} from 'react'
import { Card, Modal } from 'antd'
import PokemonDetails from './PokemonDetails';
const PokemanCard = ({name,image,id,types}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };





  return (

    <div>
           <Card
           onClick={()=>setIsModalOpen(true)}
      title={<span style={{color:"white"}}>{name}</span>}
      style={{ width: 200, margin: '20px',backgroundColor:"blueviolet",color:"white" }}
      cover={<img alt={name} src={image} style={{
        width:"100px",
        height:"100px",
      }}/>}
    >
      <p>ID: {id}</p>
      <p>Types: {types?.join(', ')}</p>
    </Card>
    <Modal title={name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <PokemonDetails id={id}/>
    </Modal>
    </div>
  )
}

export default PokemanCard